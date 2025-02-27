import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const StockMarketInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Replace with your API (Example: Finnhub API)
        const response = await axios.get(
          `https://finnhub.io/api/v1/news?category=general&token=cuumi61r01qk88s9oeagcuumi61r01qk88s9oeb0`
        );
        setInsights(response.data.slice(0, 5)); // Get top 5 insights
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock insights:", error);
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, textAlign: "center", backgroundColor: "#fff", width: "80%" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Stock Market Insights
        </Typography>
        <Typography variant="body1" gutterBottom>
          Here you can analyze stock trends, get real-time data, and AI-powered predictions.
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {insights.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={item.headline} secondary={item.summary} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default StockMarketInsights;
