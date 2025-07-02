import React from 'react';
import StoryHeaderBanner from '../Components/storyHeaderBanner.jsx';
import DetailsBox from '../Components/detailbox.jsx';
import sword_icon from '../assets/swords.png';
import Navbar from '../Components/navbar.jsx'
import '../CSS/detailspage.css';

const details = () => {
    return (
        <div className='body'>
            <Navbar/>
            <StoryHeaderBanner
                title="غزوة بدر"
                showPlayButton={false}
                showToggleButton={true}
            />
            <div className='page-content-container'>
                <DetailsBox
                icon= {sword_icon}
                title= "نوع الغزوة"
                text= "هجومية"
                />
                <DetailsBox
                icon= {sword_icon}
                title= "التاريخ"
                text= "2هـ 17 رمضان "
                />
                <DetailsBox
                icon= {sword_icon}
                title= "التاريخ"
                text= "2هـ 17 رمضان "
                />
                <DetailsBox
                icon= {sword_icon}
                title= "التاريخ"
                text= "2هـ 17 رمضان "
                />
                <DetailsBox
                icon= {sword_icon}
                title= "التاريخ"
                text= "2هـ 17 رمضان "
                />
                <DetailsBox
                icon= {sword_icon}
                title= "التاريخ"
                text= "2هـ 17 رمضان "
                />
                <DetailsBox
                icon= {sword_icon}
                title= "التاريخ"
                text= "2هـ 17 رمضان "
                />

            </div>
            
        </div>
    );
}

export default details;