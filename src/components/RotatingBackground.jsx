import "../styles/RotatingBackground.less";
import { useState, useEffect } from 'react';

function RotatingBackground() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [currentBackgrounds, setCurrentBackgrounds] = useState(["",""]);
    const [activeBackground, setActiveBackground] = useState(1);

    useEffect(() => {
        const backgrounds = Object.keys(import.meta.glob("/public/assets/backgrounds_optimized/*"));
        setBackgrounds(backgrounds);
    }, []);

    useEffect(() => {
        updateBackground();
    }, [backgrounds]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateBackground();
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, [backgrounds, activeBackground]);

    function updateBackground() {
        if (backgrounds.length) {
            let nextBackground;
            if (activeBackground > 0) {
                nextBackground = 0;
            } else {
                nextBackground = 1;
            }
            setActiveBackground(nextBackground);
    
            let backgroundString = backgrounds[Math.floor(Math.random() * backgrounds.length)].replace("/public", "");
    
            const updatedBackgrounds = currentBackgrounds.map((element, index) => {
                if (nextBackground === index) {
                    return backgroundString;
                }
    
                return element;
            });
    
            setCurrentBackgrounds(updatedBackgrounds);
        }
    }

    return (
        <div className="rotating-background">
            <div className={"background" + (activeBackground === 0 ? " active" : "")} style={{ backgroundImage: "url(" + currentBackgrounds[0] + ")"}}></div>
            <div className={"background" + (activeBackground === 1 ? " active" : "")} style={{ backgroundImage: "url(" + currentBackgrounds[1] + ")"}}></div>
        </div>
    );
}

export default RotatingBackground;