import "../styles/campaign.less";
import CountdownTimer from "../components/CountdownTimer";
import RotatingBackground from "../components/RotatingBackground";
import ComponentToggle from "../components/ComponentToggle";
import StatsLeaderboard from "../components/StatsLeaderboard";
import { useEffect } from "react";

function CampaignPage({ onPageLoad, campaignName }) {
    useEffect(() => {
        onPageLoad();
      }, []);

      const components = [
        { name: 'Countdown', component: <CountdownTimer docId={campaignName} />},
        { name: 'Player Stats', component: <StatsLeaderboard docId={campaignName} />}
      ]

    return (
        <div className="page-campaign">
            <div className="page-section">
                <RotatingBackground />
                <ComponentToggle components={components} />
            </div>
        </div>
    );
}

export default CampaignPage;