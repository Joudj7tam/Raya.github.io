import "../CSS/chatbot.css";
import eventImage from '../assets/bot.png';

const Chatbot = () => {
    return (
        <div className="chatbot-container"> 
            <button className="chat-button">
                <img src={eventImage} alt="Chatbot" className="chat-image" />
            </button>
        </div>
    );
};

export default Chatbot;
