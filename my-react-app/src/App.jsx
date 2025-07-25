import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HeroContainer from './components/HeroContainer';
import Header from './components/Header';
import FeaturesSection from './components/FeaturesSection';

function App() {
  return (
    <div>    
    <Header />
    <HeroContainer />
    <FeaturesSection />
    </div>

  );
}


export default App;
