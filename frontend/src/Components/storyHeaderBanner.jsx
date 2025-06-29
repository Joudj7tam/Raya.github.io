import React from 'react';
import playButton from '../assets/playButton.png';
import storyHeaderPic from '../assets/storyHeaderPic.png';

const HeaderBanner = ({ title, navigationTitle, showPlayButton, onPlayClick }) =>{
  return (
    <div className="header-banner">
      <img src={storyHeaderPic} alt="Banner" className="banner-image" />
      
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