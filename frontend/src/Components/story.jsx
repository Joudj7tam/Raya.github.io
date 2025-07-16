import React, { useEffect, useState, useRef } from 'react';
import '../CSS/story.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Story = ({ gazwa, audioRef, isPlaying, setIsPlaying, playbackSpeed, handleSpeedChange }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
                animationRef.current = requestAnimationFrame(updateTime);
            }
        };

        if (isPlaying) {
            animationRef.current = requestAnimationFrame(updateTime);
        } else {
            cancelAnimationFrame(animationRef.current);
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying, audioRef]);

    if (!gazwa || !gazwa.story || !gazwa.timings) return null;

    return (
        <div className="story-container" data-aos="fade-right">
            <h3 className="the-story">
                {gazwa.timings.map((wordObj, index) => {
                    const isActive =
                        isPlaying && currentTime >= wordObj.start && currentTime <= wordObj.end;

                    return (
                        <span
                            key={index}
                            onClick={() => {
                                if (audioRef.current) {
                                    audioRef.current.currentTime = wordObj.start;
                                    audioRef.current.play();
                                    setIsPlaying(true);
                                }
                            }}
                            style={{
                                color: isActive ? '#cda400ff' : 'inherit',
                                transition: 'color 0.15s ease',
                                cursor: 'pointer',
                            }}
                        >
                            {wordObj.word + ' '}
                        </span>
                    );
                })}
                {/* ✅ Playback Speed Button inside the story container */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                    {/* <label htmlFor="speed" style={{ }}>السرعة:</label> */}
                    <button
                        id="speed"
                        onClick={handleSpeedChange}
                        style={{
                            fontColor: '#654b42a0',
                            padding: '5px 10px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            border: '0px',
                            cursor: 'pointer',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {playbackSpeed}x
                    </button>
                </div>
            </h3>
        </div>
    );
};

export default Story;
