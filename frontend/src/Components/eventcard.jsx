import React from "react";
import eventImage from '../assets/card.jpeg';
import '../CSS/eventcard.css';

const EventCard = ({ title, era }) => {
    return (
        <div className="event-card">
            <img src={eventImage} alt="غزوة بدر" className="event-image" />
            <div className="event-content">
                <div className="event-header">
                    <h2 className="event-title">غزوة بدر</h2>
                    <span className="era-tag">ﷺ عهد النبي محمد</span>
                </div>
                <button className="details-button">الاطلاع على التفاصيل</button>
            </div>
        </div>
    );
}

export default EventCard;

