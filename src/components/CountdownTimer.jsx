import "../styles/CountdownTimer.less";
import { useState, useEffect } from "react";

function CountdownTimer({ fileName }) {
    const [targetTime, setTargetTime] = useState(null);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const filePath = '/config/' + fileName;
        fetch(filePath)
            .then(response => response.json())
            .then(data => {
                setTargetTime(new Date(data.nextSession))
            })
            .catch(error => console.error(`Error fetching target time from ${filePath}:`, error));
    }, [fileName]);

    useEffect(() => {
        if (targetTime) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const difference = targetTime - currentTime;

                if (difference <= 0) {
                    clearInterval(interval);
                    
                    const newTargetTime = new Date();
                    newTargetTime.setDate(newTargetTime.getDate() + 14);
                    setTargetTime(newTargetTime);
                } else {
                    const minutes = Math.floor((difference / 1000 / 60) % 60);
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

                    const countdownMessage = `${days} Days, ${hours} Hours, ${minutes} Minutes`;
                    setCountdown(countdownMessage);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [targetTime]);

    return (
        <div className="countdown-timer">
            <h2>Countdown Timer</h2>
            <p>{countdown}</p>
        </div>
    )
}

export default CountdownTimer;
