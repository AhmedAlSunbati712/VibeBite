import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Header() {
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const sectionIds = ['hero-section', 'features-section', 'about-section', 'moodify-section'];

    const handleScroll = () => {
      let current = 'home';
      for (let id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom > 0) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeIn"}}
      >
    <div className="container-fluid fixed-header d-none d-md-block bg-transparent shadow-sm">
      <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
  <li className="nav-item">
    <a href="#hero-section"
       className={`nav-link py-1 ${activeSection === 'hero-section' ? 'active' : ''}`}>
      Home
    </a>
  </li>
  <li className="nav-item">
    <a href="#features-section"
       className={`nav-link py-1 ${activeSection === 'features-section' ? 'active' : ''}`}>
      Features
    </a>
  </li>
  <li className="nav-item">
    <a href="#about-section"
       className={`nav-link py-1 ${activeSection === 'about-section' ? 'active' : ''}`}>
      About
    </a>
  </li>
  <li className="nav-item">
    <a href="#moodify-section"
       className={`nav-link py-1 ${activeSection === 'moodify-section' ? 'active' : ''}`}>
      Moodify Me
    </a>
  </li>
</ul>
      </header>
    </div>
    </motion.div>
    </AnimatePresence>
  );
}

export default Header;
