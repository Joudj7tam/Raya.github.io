import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import eventImage from '../assets/card.jpeg';
import '../CSS/eventcard.css';

const EventCard = ({ title, era }) => {

    useEffect(() => {
            AOS.init({ duration: 1000 });
        }, []);

    return (
        <div className="event-card" data-aos="fade-up">
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

