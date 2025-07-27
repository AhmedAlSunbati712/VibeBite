import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from "framer-motion";

// Importing react components
import MusicColumn from './MusicColumn';
import FoodColumn from './FoodColumn';

function HeroSection() {
    return (
        <AnimatePresence>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut"}}
            >
        <section id="hero-section">
        <div className="container-fluid hero-container">
            <div className="row">
            <MusicColumn />
            <FoodColumn />
            </div>
        </div>
        </section>
        </motion.div>
        </AnimatePresence>
    )
}

export default HeroSection;
