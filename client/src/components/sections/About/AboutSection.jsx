import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutDescription from "./AboutDescription";
import SongCard from "../Moodify/SongCard.jsx";

function AboutSection() {
  const trackInfo = {
    artists: [{ name: ["Beach House"] }],
    album: {
      images: [{
        url: "https://i.scdn.co/image/ab67616d0000b2739b7190e673e46271b2754aab"
      }]
    },
    name: "Space Song",
    external_urls: {
      spotify: "https://open.spotify.com/track/7H0ya83CMmgFcOhw0UB6ow?si=4d88ee003dd74a85"
    }
  };

  return (
    <section id="about-section" className="py-5">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-12 col-md-4 mb-4">
            <AboutDescription />
          </div>

          <div className="col-12 col-md-4 mb-4">
            <SongCard trackInfo={trackInfo} />
          </div>

          <div className="col-12 col-md-4 mb-4 d-flex flex-column align-items-center">
            <img
              className="recipe-img mb-2 img-fluid"
              src="https://img.spoonacular.com/recipes/642281-556x370.jpg"
              alt="Eggplant Caprese Stack Appetizers"
            />
            <h3 className="recipe-title text-center">Eggplant Caprese Stack Appetizers</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
