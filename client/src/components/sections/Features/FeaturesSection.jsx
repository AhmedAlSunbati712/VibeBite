import React from 'react';
import FeatureCard from './FeatureCard';
// import '../App.css';

function FeaturesSection() {
  return (
    <section id="features-section">
      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 fw-bold border-bottom text-center">
          <span style={{ color: '#33CC99' }}>Vibe</span>
          <span style={{ color: '#FF9F80' }}>Bite</span>
        </h2>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <FeatureCard
            bgImage="/assets/feature-1.jpg"
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
            bgImage="/assets/feature-2.jpg"
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
            bgImage="/assets/feature-3.jpg"
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
      </div>
      <svg
        id="wave"
        className="section-divider-bottom"
        style={{ transform: "rotate(0deg)", transition: "0.3s" }}
        viewBox="0 0 1440 220"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(51, 204, 153, 1)" offset="0%" />
            <stop stopColor="rgba(51, 162.532, 204, 1)" offset="100%" />
          </linearGradient>
        </defs>
        <path
          style={{ transform: "translate(0, 0px)", opacity: 1 }}
          fill="url(#sw-gradient-0)"
          d="M0,88L17.1,91.7C34.3,95,69,103,103,95.3C137.1,88,171,66,206,66C240,66,274,88,309,80.7C342.9,73,377,37,411,47.7C445.7,59,480,117,514,135.7C548.6,154,583,132,617,110C651.4,88,686,66,720,77C754.3,88,789,132,823,157.7C857.1,183,891,191,926,179.7C960,169,994,139,1029,121C1062.9,103,1097,95,1131,99C1165.7,103,1200,117,1234,113.7C1268.6,110,1303,88,1337,73.3C1371.4,59,1406,51,1440,73.3C1474.3,95,1509,147,1543,168.7C1577.1,191,1611,183,1646,168.7C1680,154,1714,132,1749,121C1782.9,110,1817,110,1851,91.7C1885.7,73,1920,37,1954,47.7C1988.6,59,2023,117,2057,121C2091.4,125,2126,73,2160,77C2194.3,81,2229,139,2263,146.7C2297.1,154,2331,110,2366,110C2400,110,2434,154,2451,176L2468.6,198L2468.6,220L2451.4,220C2434.3,220,2400,220,2366,220C2331.4,220,2297,220,2263,220C2228.6,220,2194,220,2160,220C2125.7,220,2091,220,2057,220C2022.9,220,1989,220,1954,220C1920,220,1886,220,1851,220C1817.1,220,1783,220,1749,220C1714.3,220,1680,220,1646,220C1611.4,220,1577,220,1543,220C1508.6,220,1474,220,1440,220C1405.7,220,1371,220,1337,220C1302.9,220,1269,220,1234,220C1200,220,1166,220,1131,220C1097.1,220,1063,220,1029,220C994.3,220,960,220,926,220C891.4,220,857,220,823,220C788.6,220,754,220,720,220C685.7,220,651,220,617,220C582.9,220,549,220,514,220C480,220,446,220,411,220C377.1,220,343,220,309,220C274.3,220,240,220,206,220C171.4,220,137,220,103,220C68.6,220,34,220,17,220L0,220Z"
        />
      </svg>
    </section>
  );
}

export default FeaturesSection;
