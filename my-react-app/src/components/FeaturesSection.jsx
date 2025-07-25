import React from 'react';
import FeatureCard from './FeatureCard';
import '../App.css';

function FeaturesSection() {
  return (
    <section id="features">
      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 fw-bold border-bottom text-center">
          <span style={{ color: '#33CC99' }}>Vibe</span>
          <span style={{ color: '#FF9F80' }}>Bite</span>
        </h2>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <FeatureCard
            bgImage="../src/assets/feature-1.jpg"
            heading="Hungry and vibing? Find the perfect dish to match your mood"
            circles={[
              { color: 'peach', className: 'circle-one' },
              { color: 'teal', className: 'circle-two' },
              { color: 'peach', className: 'circle-three' },
              { color: 'peach', className: 'circle-four' },
              { color: 'teal', className: 'circle-five' },
            ]}
          />

          <FeatureCard
            bgImage="../src/assets/feature-2.jpg"
            heading="Customize suggestions with your top genres, artists, and diet."
            circles={[
              {
                color: 'teal',
                className: 'circle-one',
                style: { left: '70%', width: '120px' },
              },
              { color: 'peach', className: 'circle-two', style: { top: '25%' } },
              { color: 'teal', className: 'circle-three' },
              { color: 'teal', className: 'circle-four' },
              { color: 'peach', className: 'circle-five' },
            ]}
          />

          <FeatureCard
            bgImage="../src/assets/feature-3.jpg"
            heading="Smart food and music matching based on your vibe"
            circles={[
              {
                color: 'teal',
                className: 'circle-two',
                style: { width: '140px', top: '90%', left: '90%' },
              },
              { color: 'peach', className: 'circle-three' },
              { color: 'peach', className: 'circle-four' },
              { color: 'teal', className: 'circle-five' },
            ]}
          />
        </div>
      </div>

      <div className="container d-flex justify-content-center align-items-center mb-4">
        <a href="http://localhost:3000/login">
          <button type="button" className="btn btn-primary btn-lg spotify-login">
            Log in with spotify
          </button>
        </a>
      </div>
    </section>
  );
}

export default FeaturesSection;
