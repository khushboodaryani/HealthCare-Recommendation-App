from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the trained ML model
svc_model = pickle.load(open('svc.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive input data from the frontend
        data = request.get_json()
        symptoms = np.array(data['symptoms']).reshape(1, -1)  # Ensure it's 2D

        # Predict using the loaded ML model
        prediction = svc_model.predict(symptoms)
        response = {
            'prediction': int(prediction[0])  # Convert numpy.int64 to int
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
