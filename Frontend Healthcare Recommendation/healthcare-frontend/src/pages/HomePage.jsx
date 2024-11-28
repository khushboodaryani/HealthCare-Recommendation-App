import React from 'react';
import SymptomForm from '../components/SymptomForm';
import { Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

// Background image path when stored in public folder
const backgroundImage = '/image.png';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="homepage-container"
      style={{
        position: 'relative',
        minHeight: '100vh', // Ensure the container takes up full height
        width: '100%', // Full width
        overflow: 'hidden', // Prevents scrollbars from appearing
      }}
    >
      {/* Background Image with Blur Effect */}
      <div
        className="background-image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // Ensures image covers the whole page
          backgroundPosition: 'center', // Center the image
          filter: 'blur(8px)', // Apply blur effect
          zIndex: -1, // Keeps the background behind the content
        }}
      />

      {/* Content Section */}
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={3}
          className="welcome-card"
          style={{
            padding: '30px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.8)', // Slightly transparent to blend with background
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
            marginBottom: '40px',
          }}
        >
          <Typography variant="h4" className="heading" style={{ color: '#6200ea' }}>
            Welcome to the Healthcare Recommendation App
          </Typography>
          <Typography variant="body1" className="subheading" style={{ color: '#333' }}>
            Enter your symptoms to receive personalized healthcare suggestions.
          </Typography>
        </Paper>

        <SymptomForm />
      </div>
    </motion.div>
  );
};

export default HomePage;
