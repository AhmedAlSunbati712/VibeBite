
import React, { useState } from "react";
import axios from "axios";

function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/moodify", { prompt }); // call Express
      console.log("Tracks:", res.data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Moodify</h1>
      <textarea
        rows="4"
        placeholder="What's your mood or vibe today?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: "#1DB954", // Spotify green
          color: "white",
          padding: "0.75rem 2rem",
          fontSize: "1.2rem",
          border: "none",
          borderRadius: "8px",
          marginTop: "1rem",
          cursor: "pointer"
        }}
      >
        {loading ? "Loading..." : "Generate Playlist"}
      </button>
    </div>
  );
};

export default PromptForm;
