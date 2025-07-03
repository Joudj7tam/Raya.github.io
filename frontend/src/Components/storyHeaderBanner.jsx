import React from 'react';
import playButton from '../assets/playButton.png';
import '../CSS/storyHeaderBanner.css';

const HeaderBanner = ({ title, showPlayButton, onPlayClick, activeTab, setActiveTab }) => {
  return (
    <div className="header-banner">
      <div className="segmented-control" data-active={activeTab}>
        <button
          className={`segment ${activeTab === 'story' ? 'active' : ''}`}
          onClick={() => setActiveTab('story')}
        >
          اكتشف القصة
        </button>
        <button
          className={`segment ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          تفاصيل القصة
        </button>
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
