import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import { motion, AnimatePresence } from "framer-motion";
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Importing react components
import SaveButton from "./SaveButton";
import SongCard from './SongCard';



const CardCarousel = (props) => {
    if (!props.cards || !Array.isArray(props.cards)) {
        return null; // or a fallback UI like <p>No cards to show</p>
    }

    function createCard(trackInfo) {
        return (
            <SongCard trackInfo={trackInfo} />
        )
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut"}}
            >
                      <div className="container d-flex flex-column justify-content-center align-items-center">

        <div className="carousel-container">
            <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                }}
                className="mySwiper"
            >
                {props.cards.map((trackInfo, index) => (
                    <SwiperSlide key={index}>
                        {createCard(trackInfo)}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <SaveButton playlistName="testing name"/>

        </div>
        </motion.div>
        </AnimatePresence>
        
    )
}

export default CardCarousel
