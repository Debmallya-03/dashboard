import React, { useState } from "react";

const Chatbot = () => {
  const [query, setQuery] = useState(""); // Store user input
  const [response, setResponse] = useState(""); // Store AI response

  const handleSendMessage = async () => {
    if (!query.trim()) {
      alert("Please enter a question!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }), // Send user input to backend
      });

      const data = await response.json();
      setResponse(data.answer || "No response from AI."); // Update UI with response
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error connecting to AI.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>AI Chatbot</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask AI about stocks..."
        style={{
          width: "80%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      />
      <br />
      <button onClick={handleSendMessage} style={{ padding: "10px 20px" }}>
        SEND
      </button>
      <h3>AI Response: {response}</h3>
    </div>
  );
};

export default Chatbot;
