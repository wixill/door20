import CountdownTimer from "../components/CountdownTimer";
import RotatingBackground from "../components/RotatingBackground";
import { useState, useEffect } from "react";

function SkwadPage({ onPageLoad }) {
    useEffect(() => {
        onPageLoad();
      }, []);

    return (
        <div className="page-skwad">
            <div className="top-banner">
                <RotatingBackground />
                <CountdownTimer docId="Skwad" />
            </div>
        </div>
    );
}

export default SkwadPage;
