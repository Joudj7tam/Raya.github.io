import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoryHeaderBanner from '../Components/storyHeaderBanner.jsx';
import Navbar from '../Components/navbar.jsx';
import DetailsContent from '../Components/details.jsx';
import StoryContent from '../Components/story.jsx';
import '../CSS/storypage.css';

const StoryPage = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [gazwa, setGazwa] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGazwa = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/gazwa/${id}`);
        const data = await res.json();
        if (data.success) {
          console.log("Fetched gazwa:", data.data); // 👈 Logs the data
          setGazwa(data.data);
        } else {
          console.error("Error fetching gazwa:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchGazwa();
  }, [id]);

  if (!gazwa) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <StoryHeaderBanner
        title={gazwa.name}
        showPlayButton={activeTab === 'story'}
        onPlayClick={() => console.log('Play clicked')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="slide-container">
        <div className={`slide-content ${activeTab === 'story' ? 'show' : 'hide-left'}`}>
          <StoryContent gazwa={gazwa} />
        </div>
        <div className={`slide-content ${activeTab === 'details' ? 'show' : 'hide-right'}`}>
          <DetailsContent gazwa={gazwa} />
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
