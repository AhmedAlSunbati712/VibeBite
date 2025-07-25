import {  useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MusicColumn from './MusicColumn';
import FoodColumn from './FoodColumn';
import '../App.css'



function HeroContainer() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100); // slight delay for smooth animation
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`container-fluid hero-container fade-slide-up ${show ? 'show' : ''}`}>
            <div className="row">
            <MusicColumn />
            <FoodColumn />
            </div>
        </div>
    )
}

export default HeroContainer;
