import "../styles/CountdownTimer.less";
import { useState, useEffect } from "react";

function CountdownTimer({ fileName }) {
    const [targetTime, setTargetTime] = useState(null);
    const [countdownMinutes, setCountdownMinutes] = useState('');
    const [countdownHours, setCountdownHours] = useState('');
    const [countdownDays, setCountdownDays] = useState('');

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
                    let minutes = Math.floor((difference / 1000 / 60) % 60);
                    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }

                    if (hours < 10) {
                        hours = '0' + hours;
                    }

                    if (days < 10) {
                        days = '0' + days;
                    }

                    setCountdownMinutes(minutes);
                    setCountdownHours(hours);
                    setCountdownDays(days);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [targetTime]);

    return (
        <div className="countdown-timer">
            <h2>Next Session In:</h2>
            <div className="countdown">
                <div className="countdown-segment">
                    <div className="countdown-value">
                        <span>{countdownDays}</span>
                    </div>
                    <span className="segment-label">Days</span>
                </div>
                
                <div className="countdown-segment">
                    <div className="countdown-value">
                        <span>{countdownHours}</span>
                    </div>
                    <span className="segment-label">Hours</span>
                </div>
        
                <div className="countdown-segment">
                    <div className="countdown-value">
                        <span>{countdownMinutes}</span>
                    </div>
                    <span className="segment-label">Minutes</span>
                </div>
            
            </div>
        </div>
    )
}

export default CountdownTimer;
