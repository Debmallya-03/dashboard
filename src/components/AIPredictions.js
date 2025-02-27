import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress, Paper } from "@mui/material";

const AIPredictions = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAIPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + process.env.REACT_APP_GEMINI_API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Give me AI-powered predictions for the stock market today." }] }]
        }),
      });

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No prediction available.";
      setPrediction(aiResponse);
    } catch (error) {
      console.error("Error fetching AI predictions:", error);
      setPrediction("Failed to fetch predictions.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, textAlign: "center", backgroundColor: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          AI-Powered Stock Predictions 📈
        </Typography>
        <Typography variant="body1" gutterBottom>
          Click the button below to generate real-time AI predictions for the stock market.
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#333", color: "#fff", marginTop: 2, "&:hover": { backgroundColor: "#444" } }}
          onClick={fetchAIPrediction}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Get AI Predictions"}
        </Button>

        {prediction && (
          <Typography
            variant="body1"
            sx={{
              marginTop: 3,
              padding: 2,
              backgroundColor: "#eee",
              borderRadius: 2,
              textAlign: "left",
              whiteSpace: "pre-line",
            }}
          >
            {prediction}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AIPredictions;
