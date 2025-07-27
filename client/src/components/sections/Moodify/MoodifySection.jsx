import React, { useState, useEffect } from 'react';

// Importing react components
import MoodifyApp from './MoodifyApp.jsx';

function MoodifySection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Detect login via URL param (after redirect from backend)
    const params = new URLSearchParams(window.location.search);
    if (params.get("spotify") === "true") {
      localStorage.setItem('spotify_logged_in', 'true');
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, window.location.pathname); // clean URL
    } else {
      const alreadyLoggedIn = localStorage.getItem('spotify_logged_in');
      if (alreadyLoggedIn === 'true') setIsLoggedIn(true);
    }
  }, []);

  return (
    <section id="moodify-section" className="text-center bg-light">
          <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    id="wave"
    className='section-divider-top'
    style={{ transform: "rotate(180deg)", transition: "0.3s" }}
    viewBox="0 0 1440 290"
    version="1.1"
  >
    <defs>
      <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
        <stop stopColor="rgba(167, 42, 120.557, 1)" offset="0%" />
        <stop stopColor="rgba(255, 159, 128, 1)" offset="100%" />
      </linearGradient>
    </defs>
    <path
      style={{ transform: "translate(0, 0px)", opacity: 1 }}
      fill="url(#sw-gradient-0)"
      d="M0,203L20,183.7C40,164,80,126,120,116C160,106,200,126,240,149.8C280,174,320,203,360,198.2C400,193,440,155,480,120.8C520,87,560,58,600,72.5C640,87,680,145,720,169.2C760,193,800,184,840,174C880,164,920,155,960,169.2C1000,184,1040,222,1080,236.8C1120,251,1160,242,1200,212.7C1240,184,1280,135,1320,96.7C1360,58,1400,29,1440,14.5C1480,0,1520,0,1560,29C1600,58,1640,116,1680,135.3C1720,155,1760,135,1800,120.8C1840,106,1880,97,1920,101.5C1960,106,2000,126,2040,149.8C2080,174,2120,203,2160,222.3C2200,242,2240,251,2280,232C2320,213,2360,164,2400,135.3C2440,106,2480,97,2520,120.8C2560,145,2600,203,2640,212.7C2680,222,2720,184,2760,159.5C2800,135,2840,126,2860,120.8L2880,116L2880,290L0,290Z"
    />
    <defs>
      <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
        <stop stopColor="rgba(51, 204, 153, 1)" offset="0%" />
        <stop stopColor="rgba(51, 204, 153, 1)" offset="100%" />
      </linearGradient>
    </defs>
    <path
      style={{ transform: "translate(0, 50px)", opacity: 0.9 }}
      fill="url(#sw-gradient-1)"
      d="M0,87L20,101.5C40,116,80,145,120,130.5C160,116,200,58,240,38.7C280,19,320,39,360,67.7C400,97,440,135,480,145C520,155,560,135,600,140.2C640,145,680,174,720,178.8C760,184,800,164,840,164.3C880,164,920,184,960,183.7C1000,184,1040,164,1080,174C1120,184,1160,222,1200,232C1240,242,1280,222,1320,178.8C1360,135,1400,68,1440,67.7C1480,68,1520,135,1560,169.2C1600,203,1640,203,1680,198.2C1720,193,1760,184,1800,154.7C1840,126,1880,77,1920,77.3C1960,77,2000,126,2040,140.2C2080,155,2120,135,2160,120.8C2200,106,2240,97,2280,111.2C2320,126,2360,164,2400,154.7C2440,145,2480,87,2520,82.2C2560,77,2600,126,2640,159.5C2680,193,2720,213,2760,183.7C2800,155,2840,77,2860,38.7L2880,0L2880,290L0,290Z"
    />
  </svg>
      {!isLoggedIn ? (
        <div className='container pb-5'>
          <h2 className="display-4 mb-4">Ready to Vibe?</h2>
          <p className="lead mb-4">Connect your Spotify to get personalized music and meal matches.</p>
          <a href="http://127.0.0.1:3000/login">
            <button type="button" className="btn btn-primary btn-lg spotify-login">
              Log in with Spotify
            </button>
          </a>
        </div>
      ) : (

        <MoodifyApp />
        
      )}
    </section>
  );
}

export default MoodifySection;
