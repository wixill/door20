import '../styles/home.css';
import skwadTile from '../assets/skwaddnd_tile.png';
import moonTile from '../assets/moonseekers_tile.png';
import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <div className="homepage-background page-section">
        <div className='page-title'>
          <h1>Door<br/>20</h1>
        </div>
      </div>
      <div className='party-selection page-section'>
        <h2>Choose Your Party</h2>
        <div className='party-blocks'>
          <Link className='linkBlock' to="/skwad"><img src={skwadTile}/></Link>
          <Link className='linkBlock' to="/moonseekers"><img src={moonTile}/></Link>
      </div>
      </div>
    </div>
  );
}

export default HomePage;