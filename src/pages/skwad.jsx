import CountdownTimer from "../components/CountdownTimer";
import RotatingBackground from "../components/RotatingBackground";

function SkwadPage() {
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
