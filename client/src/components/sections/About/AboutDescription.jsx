import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutDescription() {
    return (
        <div className="col-12 col-lg-4">
            <h1 className="display-4 text-center" id="about-heading">How does it work?</h1>
            <p className="lead" id="about-paragraph">VibeBite pairs your music taste with your cravings. It starts by syncing with your 
                Spotify to get a feel for your vibe, then uses your mood and food input to recommend 
                playlists and dishes that match. Whether you're feeling mellow or hype, it serves you 
                sound and flavor in perfect harmony.</p>
        </div>
    )
}

export default AboutDescription;