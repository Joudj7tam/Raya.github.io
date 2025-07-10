import eventImage from '../assets/card.jpeg';
import '../CSS/eventcard.css';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ title, era, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/story/${id}`);
    };

    return (
        <div className="event-card">
            <img src={eventImage} alt={title} className="event-image" />
            <div className="event-content">
                <div className="event-header">
                    <h2 className="event-title">{title}</h2>
                    <span className="era-tag">{era}</span>
                </div>
                <button className="details-button" onClick={handleClick} >الاطلاع على التفاصيل</button>
            </div>
        </div>
    );
};

export default EventCard;

