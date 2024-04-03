import CountdownTimer from "../components/CountdownTimer";
import RotatingBackground from "../components/RotatingBackground";
import { useState, useEffect } from "react";

function MoonseekersPage({ onPageLoad }) {
    useEffect(() => {
        onPageLoad();
      }, []);

    return (
        <div className="page-moonseekers">
            <div className="top-banner">
                <RotatingBackground />
                <CountdownTimer docId="Moonseekers" />
            </div>
        </div>
    );
}

export default MoonseekersPage;
