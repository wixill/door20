import CountdownTimer from "../components/CountdownTimer";
import RotatingBackground from "../components/RotatingBackground";

function MoonseekersPage() {
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
