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
  const [loading, setLoading] = useState(true); // ✅ new loading state
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null); // <== to control the audio element
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  const handlePlayClick = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // ✅ Reset play icon when audio finishes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [gazwa]);

  // ✅ Fetch gazwa data
  useEffect(() => {
    const fetchGazwa = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/gazwa/${id}`);
        const data = await res.json();
        if (data.success) {
          console.log("Fetched gazwa:", data.data);
          setGazwa(data.data);
        } else {
          console.error("Error fetching gazwa:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // ✅ ensure loading state is updated
      }
    };

    fetchGazwa();
  }, [id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleSpeedChange = () => {
    const currentIndex = speedOptions.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    setPlaybackSpeed(speedOptions[nextIndex]);
  };

  return (
    <div>
      <Navbar />
      {gazwa?.audioUrl && (
        <audio ref={audioRef} src={`http://localhost:4000${gazwa.audioUrl}`} />
      )}
      <StoryHeaderBanner
        title={gazwa ? gazwa.name : '...'}
        showPlayButton={activeTab === 'story'}
        onPlayClick={handlePlayClick}
        isPlaying={isPlaying} // <== pass state
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="slide-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className={`slide-content ${activeTab === 'story' ? 'show' : 'hide-left'}`}>
              <StoryContent
                gazwa={gazwa}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                playbackSpeed={playbackSpeed}
                handleSpeedChange={handleSpeedChange}
              />
            </div>
            <div className={`slide-content ${activeTab === 'details' ? 'show' : 'hide-right'}`}>
              <DetailsContent gazwa={gazwa} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
