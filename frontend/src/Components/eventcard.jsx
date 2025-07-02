import React from "react";
import eventImage from '../assets/card.png';
import '../CSS/eventcard.css';

const EventCard = ({ title, era }) => {
    return (
        <div className="event-card">
            <div className="image-container">
                <img src={eventImage} alt="غزوة بدر" className="event-image" />
            </div>
            <div className="event-content">
                <div className="event-header">
                    <span className="era-tag">ﷺ عهد النبي محمد</span>
                    <h2 className="event-title">غزوة بدر</h2>
                </div>
                <button className="details-button">الاطلاع على التفاصيل</button>
            </div>
        </div>
    );
}

export default EventCard;

