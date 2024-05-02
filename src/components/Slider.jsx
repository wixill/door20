import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "../styles/Slider.less";

function Slider({ slides, desktopSlides, mobileSlides }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(desktopSlides);

    useEffect(() => {
        const updateSlidesToShow = () => {
            setSlidesToShow(window.innerWidth > 768 ? desktopSlides : mobileSlides);
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    function goToPrevious() {
        const newIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    function goToNext() {
        const newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious()
    });

    return (
        <div className="slider-container" {...swipeHandlers}>
            <div className="slider-wrapper" style={{ transform: `translateX(-${(currentIndex / slidesToShow) * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div className="slide" key={index} style={{width: `${100 / slidesToShow}%` }}>
                        {slide}
                    </div>
                ))}
            </div>
            {slides.length > desktopSlides && <button className="left-arrow" onClick={goToPrevious}>&lt;</button>}
            {slides.length > desktopSlides && <button className="right-arrow" onClick={goToNext}>&gt;</button>}
        </div>
    );
};

export default Slider;