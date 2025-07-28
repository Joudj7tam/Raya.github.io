import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
    // Do not render if hideInChat is true
    if (chat.hideInChat) return null;

    // Determine message classes:
    // - 'bot-message' if role is 'model', otherwise 'user-message'
    // - add 'error' class if isError is true
    const messageClass = `message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`;

    return (
        <div className={messageClass}>
            {/* Show chatbot icon only for bot messages */}
            {chat.role === "model" && <ChatbotIcon />}
            <p className="message-text">{chat.text}</p>
        </div>
    );
};

export default ChatMessage;
