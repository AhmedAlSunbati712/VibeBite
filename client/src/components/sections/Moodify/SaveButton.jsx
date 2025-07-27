import React from 'react';
import axios from "axios";

function SaveButton(props) {
    const handleSavePlaylist = async () => {
        try {
          const res = await axios.post("https://vibebite.onrender.com/savePlaylist", {
            name: props.playlistName,
          }, {
            withCredentials: true
          });
          alert("Playlist saved!");
        } catch (err) {
          console.error("Failed to save playlist", err);
        }
      };

    return (
        <div>
            <button
                onClick={handleSavePlaylist}

                style={{
                    backgroundColor: "#1DB954",
                    color: "white",
                    padding: "0.75rem 2rem",
                    fontSize: "1.2rem",
                    border: "none",
                    borderRadius: "8px",
                    marginTop: "1rem",
                    cursor: "pointer"
                }}
            >
                Save Playlist
            </button>
        </div>
    )
}

export default SaveButton;