import React from 'react';
import playButton from '../assets/playButton.png';
import '../CSS/storyHeaderBanner.css';
import { useLocation, Link } from 'react-router-dom';

const HeaderBanner = ({ title, showPlayButton, onPlayClick }) => {
  const location = useLocation();
  
  return (
    <div className="header-banner">
      <div className="segmented-control">
        <Link 
          to="/story" 
          className={`segment ${location.pathname === '/story' ? 'active' : ''}`}
        >
          القصة
        </Link>
        <Link 
          to="/details" 
          className={`segment ${location.pathname === '/details' ? 'active' : ''}`}
        >
          تفاصيل القصة
        </Link>
      </div>

      <h1 className="banner-title">{title}</h1>
      
      {showPlayButton && (
        <button className="play-button" onClick={onPlayClick}>
          <img src={playButton} alt="Play" className="play-icon" />
        </button>
      )}

    </div>
  );
};

export default HeaderBanner;