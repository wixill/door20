import "../styles/CountdownTimer.less";
import {updateDoc, getDoc, doc, Timestamp} from "firebase/firestore";
import {db} from '../firebase';
import { useState, useEffect } from "react";

function CountdownTimer({ docId }) {
    const [targetTime, setTargetTime] = useState(null);
    const [countdownMinutes, setCountdownMinutes] = useState('');
    const [countdownHours, setCountdownHours] = useState('');
    const [countdownDays, setCountdownDays] = useState('');

    async function updateTime(time) {
        try {
            const docRef = doc(db, "campaigns", docId);
            await updateDoc(docRef, {
                next_session: Timestamp.fromDate(time)
            });
        } catch (error) {
            console.log("Error updating Target time: ", error);
        }
    }

    useEffect(() => {
        const fetchTargetTime = async() => {
            try {
                const docRef = doc(db, "campaigns", docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    let time = docSnap.get("next_session").toDate();
                    const currentTime = new Date();
                    const difference = time - currentTime;

                    if (difference <= 0) {
                        time.setDate(time.getDate() + 14);
                        updateTime(time);
                    }

                    setTargetTime(time);
                } else {
                    console.log("Target Time Not Found.");
                }
            } catch (error) {
                console.log("Error fetching Target time: ", error);
            }
        };

        fetchTargetTime();
    }, [docId]);

    useEffect(() => {
        if (targetTime) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const difference = targetTime - currentTime;

                if (difference > 0) {
                    let minutes = Math.ceil((difference / 1000 / 60) % 60);
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
        <div className="countdown-wrapper">
            <div className={"countdown-timer" + (countdownDays ? " loaded" : "")}>
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
        </div>
        
    )
}

export default CountdownTimer;
