import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Card, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations || 'No recommendations found.');
    } catch (error) {
      console.error('Error:', error);
      setRecommendations('Failed to fetch recommendations.');
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '20px', maxWidth: '600px', margin: 'auto' }}
    >
      <Card
        style={{
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', color: '#6200ea' }}>
          Enter Your Symptoms
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label="Symptoms"
            multiline
            rows={4}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ fontWeight: 'bold' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Get Recommendations'}
          </Button>
        </form>

        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: '20px' }}
          >
            <Card
              style={{
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" style={{ color: '#1976d2' }}>
                Recommendations:
              </Typography>
              <Typography variant="body1">{recommendations}</Typography>
            </Card>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default SymptomForm;
