import {getDoc, doc} from "firebase/firestore";
import {db} from '../firebase';
import { useState, useEffect } from 'react';

export default function StatsLeaderboard({ docId }) {
    const [playerStats, setPlayerStats] = useState(null);
    const [totalCrits, setTotalCrits] = useState(null);
    const [totalFails, setTotalFails] = useState(null);
    const [rollRatios, setRollRatios] = useState(null);

    useEffect(() => {
        const fetchPlayerStats = async() => {
            try {
                const docRef = doc(db, "campaigns", docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPlayerStats(docSnap.get("players"));
                } else {
                    console.log("Player Stats Not Found.");
                }
            } catch (error) {
                console.log("Error Fetching Player Stats: ", error);
            }
        }

        fetchPlayerStats();
    }, [docId]);

    useEffect(() => {
        if (playerStats) {
            const crits = [];
            const fails = [];
            const ratios = [];

            Object.keys(playerStats).forEach(playerIndex => {
                crits.push([playerIndex, playerStats[playerIndex].crits]);
                fails.push([playerIndex, playerStats[playerIndex].fails]);
                ratios.push([playerIndex, (playerStats[playerIndex].crits / playerStats[playerIndex].fails).toFixed(2)]);
            });

            setTotalCrits(crits.sort((a,b) => b[1] - a[1]));
            setTotalFails(fails.sort((a,b) => b[1] - a[1]));
            setRollRatios(ratios.sort((a,b) => b[1] - a[1]));
        }
    }, [playerStats]);

    function StatsCard({ stats, label }) {

        const getPlayerListing = () => {
            let listing = [];

            if (stats) { 
                let rankVal = 1;
                stats.forEach((value, i) => {
                    const index = value[0];
                    if (index !== 'gamemaster') {
                        const rank = <span className="rank">#{rankVal}</span>;
                        const playerImage = <img className="player-pic" src={`/assets/${docId}/players/${index}.jpg`} />;
                        const playerName = <span className="name">{index}</span>;
                        const stat = <span className="stat">{value[1]}</span>;
                        const element = <div key={`${index}-${label.replace(/\s+/g, '')}`} className="player-stat">{rank}{playerImage}{playerName}{stat}</div>;
                        listing.push(element);
                        rankVal++;
                    }
                });
            }
            
            return listing;
        }
    
        return (
            <div className="statscard">
                <h2>{label}</h2>
                <div className="player-listing">
                    {getPlayerListing()}
                </div>
            </div>
        )
    };

    return (
        <div>
            <StatsCard stats={totalCrits} label="Total Crits" />
            <StatsCard stats={totalFails} label="Total Fails" />
            <StatsCard stats={rollRatios} label="Crit/Fail Ratio" />
        </div>
    )
};