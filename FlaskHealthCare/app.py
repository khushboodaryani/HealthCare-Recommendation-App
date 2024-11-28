from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enables CORS for frontend-backend communication

# Load the trained model
model = pickle.load(open('svc.pkl', 'rb'))

# Symptom dictionary (ensure this matches your training data)
symptoms_dict = { ... }  # Copy your symptoms dictionary here
diseases_list = { ... }  # Copy your diseases list here

def predict_disease(symptoms):
    # Create an input vector with all zeros
    input_vector = np.zeros(len(symptoms_dict))
    for symptom in symptoms:
        if symptom in symptoms_dict:
            input_vector[symptoms_dict[symptom]] = 1
        else:
            print(f"Warning: '{symptom}' is not a recognized symptom.")
    prediction = model.predict([input_vector])[0]
    return diseases_list.get(prediction, "Unknown Disease")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the JSON request
        data = request.json
        symptoms = data.get('symptoms', [])
        if not symptoms:
            return jsonify({'error': 'No symptoms provided.'}), 400

        # Predict disease
        predicted_disease = predict_disease(symptoms)

        # Return the prediction
        return jsonify({
            'predicted_disease': predicted_disease,
            'message': f"Based on the symptoms provided, the predicted disease is {predicted_disease}."
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
