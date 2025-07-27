import React, { useState } from "react";
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
            const response = await axios.post("http://127.0.0.1:3000/moodify", { prompt }, { withCredentials: true });
            setTracks(response.data);
        } catch (error) {
            console.error("Error fetching tracks: ", error);
        }
        try {
            const response = await axios.post("http://127.0.0.1:3000/getRecipe", { prompt }, { withCredentials: true });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error Fetching recipes: ", error);
        }
        setLoading(false);
    };

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
