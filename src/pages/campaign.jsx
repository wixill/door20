import "../styles/campaign.less";
import CountdownTimer from "../components/CountdownTimer";
import RotatingBackground from "../components/RotatingBackground";
import StatsLeaderboard from "../components/StatsLeaderboard";
import { useEffect } from "react";

function CampaignPage({ onPageLoad, campaignName }) {
    useEffect(() => {
        onPageLoad();
      }, []);

    return (
        <div className="page-campaign">
            <div className="top-banner page-section">
                <RotatingBackground />
                <CountdownTimer docId={campaignName} />
            </div>
            <div className="page-section">
                <StatsLeaderboard docId={campaignName} />
            </div>
        </div>
    );
}

export default CampaignPage;