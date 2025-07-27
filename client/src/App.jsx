import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HeroSection from './components/sections/Hero/HeroSection';
import FeaturesSection from './components/sections/Features/FeaturesSection';
import AboutSection from './components/sections/About/AboutSection';
import MoodifySection from "./components/sections/Moodify/MoodifySection"
import Header from './components/Header';


function App() {
  return (
    <div>    
    <Header />
    <HeroSection />
    <FeaturesSection />
    <AboutSection />
    <MoodifySection />
    </div>

  );
}


export default App;
