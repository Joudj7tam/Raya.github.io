import playButton from '../assets/playButton.png';
import storyHeaderPic from '../assets/storyHeaderPic.png';
import '../CSS/storyHeaderBanner.css'

const HeaderBanner = ({ title, navigationTitle, showPlayButton, onPlayClick }) =>{
  return (
    <div className="header-banner">
      
      <h1 className="banner-title">{title}</h1>
      <h3 className="navigation-title">{navigationTitle}</h3>

      {showPlayButton && (
        <button className="play-button" onClick={onPlayClick}>
          <img src={playButton} alt="Play" className="play-icon" />
        </button>
      )}
    </div>
  );
};

export default HeaderBanner;