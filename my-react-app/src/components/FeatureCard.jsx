import React from 'react';
import '../App.css'; // assuming circle classes are defined here

function FeatureCard({ bgImage, heading, circles = [] }) {
  return (
    <div className="col">
      <div className="card card-cover h-100 text-white bg-light rounded-5 shadow-lg fade-in-element">
        {circles.map((circle, index) => (
          <div
            key={index}
            className={`${circle.color}-circle ${circle.className}`}
            style={circle.style}
          />
        ))}

        <div
          className="feature d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 rounded-5 shadow-lg"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
          }}
        >
          <h3 className="pt-5 mt-5 mb-4 display-7 lh-0 fw-bold">{heading}</h3>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
