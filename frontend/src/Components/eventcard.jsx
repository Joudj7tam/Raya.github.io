import React from "react";
import "../CSS/events.css";

const EventCard = ({ imageSrc, alt }) => {
    return (
        <div className="event-card">
            <img className="event-image" src={imageSrc} alt={alt || "حدث"} />
            <button className="event-button">اكتشف الحدث</button>
        </div>
    );
};

export default EventCard;