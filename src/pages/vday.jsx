import '../styles/vday.css';
import happyvday from '../assets/valentines-love.gif'; 
import catsad from '../assets/crycat-crying-cat.gif';
import lovebun from '../assets/lovebun.gif';
import { useState } from 'react';

function VdayPage() {
    const [visibleSection, setVisibleSection] = useState('one');
    const [hover, setHover] = useState(false);
    const [yesSize, setYesSize] = useState(2.0);

    const buttonText = hover ? 'No' : 'Yes';

    const yesStyle = {
        fontSize: `${yesSize}rem`
    };

    function makeBigger() {
        setYesSize(yesSize => yesSize + 1);
    }

    function showSection(section) {
        setVisibleSection(section);

        if (section === 'three') {
            setTimeout(() => {
                showSection('four');
            }, 2000);
        }
    }

    return (
        <div className='maincontent' data-section={visibleSection}>
            {visibleSection === 'one' && <div className="start"><img src={happyvday} /><button onClick={() => showSection('two')}>Jane?</button></div>}
            {visibleSection === 'two' && <div><span>Will You Be My Valentine?</span><div><button onClick={() => showSection('three')} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='yes'>{buttonText}</button><button onClick={() => showSection('three')} className='no'>No</button></div></div>}
            {visibleSection === 'three' && <div className="start"><img src={catsad} /></div>}
            {visibleSection === 'four' && <div><span>But For Real, Will You Be My Valentine?</span><div><button style={yesStyle} onClick={() => showSection('five')} className='yes'>Yes</button><button onClick={() => makeBigger()} className='no'>No</button></div></div>}
            {visibleSection === 'five' && <div className="start"><img src={lovebun} /></div>}

        </div>
    );
}

export default VdayPage;