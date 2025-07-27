import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutDescription from "./AboutDescription";
import AboutDisplay from "./AboutDisplay";

function AboutSection() {
  return (
    <section id="about-section">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <AboutDescription />
          <AboutDisplay />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
