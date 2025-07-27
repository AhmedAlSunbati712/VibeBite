import React from 'react';

function SubmitButton(props) {

    return (
        <button
        onClick={props.handleSubmit}
        disabled={props.loading}
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
        {props.loading ? "Loading..." : "Generate Playlist"}
      </button>
    )
}

export default SubmitButton;