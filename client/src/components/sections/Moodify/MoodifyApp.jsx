import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing react components
import CardCarousel from './CardCarousel';
import PromptInput from './PromptInput';
import Recipe from "./Recipe";

function MoodifyApp() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [recipe, setRecipes] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://vibebite.onrender.com/moodify", { prompt }, { withCredentials: true });
            setTracks(response.data);
        } catch (error) {
            console.error("Error fetching tracks: ", error);
        }
        try {
            const response = await axios.post("https://vibebite.onrender.com/getRecipe", { prompt }, { withCredentials: true });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error Fetching recipes: ", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
      
        if (code && !localStorage.getItem('spotify_logged_in')) {
          axios.get(`https://vibebite.onrender.com/callback?code=${code}`, {
            withCredentials: true,
          })
            .then(() => {
              localStorage.setItem('spotify_logged_in', 'true');
              window.history.replaceState({}, document.title, "/");
              window.location.reload(); // or navigate if using react-router
            })
            .catch((err) => {
              console.error("Spotify callback error:", err);
            });
        }
      }, []);
      

    const handleLogout = () => {
      localStorage.removeItem('spotify_logged_in');
      window.location.reload();

    };

    return (
        <div className="container mt-5 text-center">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="display-3 ">Moodify</h2>
                <button className="btn log-out-btn" onClick={handleLogout}>
                    Log out
                </button>
            </div>

            <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                handleSubmit={handleSubmit}
                loading={loading}
            />

            {tracks.length > 0 && <CardCarousel cards={tracks} />}
            {recipe && <Recipe recipe={recipe} />}
        </div>
    );
}

export default MoodifyApp;
