'use client'
import React, {useEffect, useState} from 'react';
import {CarouselProps} from "@/app/pages/task1/models/CarousalModels";


const Carousel = (props: CarouselProps) => {

    const [linkIndex, setLinkIndex] = useState(0);
    const [link, setLink] = useState("");
    const [isPaused, setIsPaused] = useState(false);

    const advanceCarousel = () => {
        const newIndex = linkIndex === props.selectedProducts.length - 1 ? 0 : linkIndex + 1;
        const newLink = props.selectedProducts[newIndex]?.other_settings?.video_url;
        setLinkIndex(newIndex);
        setLink(newLink);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                advanceCarousel();
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [linkIndex, isPaused]);

    const pauseCarousel = () => {
        setIsPaused(true);
    };

    const resumeCarousel = () => {
        setIsPaused(false);
    };

    return (
        <div>
            {/*<video src={link} controls />*/}
            <p>{link}</p>
            <button onClick={pauseCarousel}>Pause</button>
            <button onClick={resumeCarousel}>Resume</button>
        </div>
    );
};

export default Carousel;