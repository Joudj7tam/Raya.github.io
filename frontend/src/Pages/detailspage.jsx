import React from 'react';
import StoryHeaderBanner from '../Components/storyHeaderBanner.jsx';
//import {Navbar} from '../Components/navbar.jsx'
import '../CSS/detailspage.css';

const details = () => {
    return (
        <div>
            <StoryHeaderBanner
                title="غزوة بدر"
                showPlayButton={false}
                showToggleButton={true}
            />


        </div>
    );
}

export default details;