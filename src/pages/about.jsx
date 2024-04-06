import "../styles/about.less";
import { useEffect } from "react";
import reactImg from "/assets/react.svg";
import diceImg from "/assets/d20.png";

function AboutPage({ onPageLoad }) {
    useEffect(() => {
        onPageLoad();
    }, []);

    return (
        <div className="page-about">
            <div className="page-section">
                <div className="page-title">
                    <h1>About</h1>
                </div>
                <div className="content">
                    <div className="description">
                        <p>
                            This site is a development project by a solo developer and part time dungeon master. Here you will find information and details pertaining to Dungeons & Dragons 
                            5th edition games that are ran by the site's developer.
                        </p>
                        <div className="images-wrapper">
                            <img src={diceImg}/>
                            <img src={reactImg}/>
                        </div>
                        <p>
                            The main purpose of this site is as a conduit to learn React JS while also being able to provide an interactive experience for players to view information about 
                            the games they are involved with.
                        </p>
                        <div>
                            <h2>Planned Features:</h2>
                            <ul>
                                <li>Session Countdowns</li>
                                <li>D20 Rolls Stats</li>
                                <li>Character Bios</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
