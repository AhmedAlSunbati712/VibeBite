import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Header() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200); // slight delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`container-fluid fixed-header d-none d-md-block bg-transparent shadow-sm ${animate ? 'fade-slide-in' : 'invisible'}`}>
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link active rounded-4 py-1" aria-current="page">Home</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link py-1">Features</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link py-1">About</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link py-1">Moodify Me</a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
