import "../styles/RotatingBackground.less";
import { useState, useEffect } from 'react';

function RotatingBackground() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [currentBackground, setCurrentBackground] = useState('');

    useEffect(() => {
        const backgrounds = Object.keys(import.meta.glob("/public/assets/backgrounds/*"));
        console.log(backgrounds);
        setBackgrounds(backgrounds);

        let backgroundString = backgrounds[Math.floor(Math.random() * backgrounds.length)]
        setCurrentBackground(backgroundString.replace("/public", ""));

        const interval = setInterval(() => {
            setCurrentBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ backgroundImage: "url(" + currentBackground + ")", backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }}></div>
    );
}

export default RotatingBackground;