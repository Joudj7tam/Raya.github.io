import React from 'react';
import playButton from '../assets/playButton.png';
import pauseButton from '../assets/pauseButton.png';
import islamic_war_video from '../assets/islamic-war.mp4'
import { FaArrowRight } from "react-icons/fa6"
import '../CSS/storyHeaderBanner.css';

const HeaderBanner = ({ title, showPlayButton, onPlayClick, isPlaying, activeTab, setActiveTab }) => {
  return (
    <div className="header-banner">
      {/*
      <video 
        className="header-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src={islamic_war_video} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video> 
         */}
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

      <button className="back-button" onClick={() => window.history.back()}>
        <span className="arrow-icon"><FaArrowRight /></span>
      </button>

      <h2 className="banner-title">{title}</h2>

      {showPlayButton && (
        <button className="play-button" onClick={onPlayClick}>
          <img className="play-icon"
            src={isPlaying ? pauseButton : playButton}
            alt={isPlaying ? "Pause" : "Play"}
          />
        </button>
      )}
    </div>
  );
};

export default HeaderBanner;
