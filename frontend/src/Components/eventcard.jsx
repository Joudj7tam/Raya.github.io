import eventImage from '../assets/card.jpeg';
import '../CSS/eventcard.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventCard = ({ title, era, id, enableAnimation = true }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/story/${id}`);
    };

      useEffect(() => {
        if (enableAnimation) {
            AOS.init({ duration: 1000 });
        }
    }, [enableAnimation]);

    return (
        <div className="event-card" {...(enableAnimation ? { "data-aos": "fade-up" } : {})}> 
            <img src={eventImage} alt={title} className="event-image" />
            <div className="event-content">
                <div className="event-header">
                    <h2 className="event-title">{title}</h2>
                    <span className="era-tag">{era}</span>
                </div>
                <button className="details-button" onClick={handleClick} >اطلع على القصة</button>
            </div>
        </div>
    );
};

export default EventCard;

