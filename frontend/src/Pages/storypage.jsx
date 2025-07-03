import React, { useState } from 'react';
import StoryHeaderBanner from '../Components/storyHeaderBanner.jsx';
import Navbar from '../Components/navbar.jsx';
import DetailsContent from '../Components/details.jsx';
import StoryContent from '../Components/story.jsx';
import '../CSS/storypage.css';

const StoryPage = () => {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div>
      <Navbar />
      <StoryHeaderBanner
        title="غزوة بدر"
        showPlayButton={activeTab === 'story'}
        onPlayClick={() => console.log('Play clicked')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="slide-container">
        <div className={`slide-content ${activeTab === 'story' ? 'show' : 'hide-left'}`}>
          <StoryContent onlyContent />
        </div>
        <div className={`slide-content ${activeTab === 'details' ? 'show' : 'hide-right'}`}>
          <DetailsContent onlyContent />
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
