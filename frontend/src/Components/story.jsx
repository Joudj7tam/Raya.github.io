import React, { useState, useEffect } from 'react';
import '../CSS/story.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Story = ({gazwa}) => {
    if (!gazwa) return null;

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="story-container" data-aos="fade-right">
            <h3 className='the-story'>{gazwa.story}</h3>
        </div>
    );
}

export default Story;