import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongCard from "../Moodify/SongCard.jsx"

function AboutDisplay() {
    var trackInfo = {
        artists: [
            {name: ["Beach House"]}
        ],
        album: {
            images: [{
                url: "https://i.scdn.co/image/ab67616d0000b2739b7190e673e46271b2754aab"
            }]
        },
        name: "Space Song",
        external_urls: {
            spotify: "https://open.spotify.com/track/7H0ya83CMmgFcOhw0UB6ow?si=4d88ee003dd74a85"
        }
    }
    return (
        <div className="container col-12 col-lg-6 d-flex justify-content-center align-items-center">
            <div className="col-md-8">
            <SongCard trackInfo={trackInfo}/>
            </div>
            <div className="container d-flex flex-column jusityf-content-center align-items-center">
                <img className="recipe-img col-12 col-md-4 mb-2" src="https://img.spoonacular.com/recipes/642281-556x370.jpg" alt="" />
                <h3 className="recipte-title text-center">Eggplant Caprese Stack Appetizers</h3>

            </div>
        </div>
    )
}

export default AboutDisplay;