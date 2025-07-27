import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import "../CSS/chatbot.css";

const Chatbot = () => {
    // Reference to the chat messages container to control scrolling
    const chatBodyRef = useRef();

    // State to toggle the visibility of the chatbot window
    const [showChatbot, setShowChatbot] = useState(false);

    // State to store chat messages, starting with a greeting from the bot
    const [chatHistory, setChatHistory] = useState([
        {
            role: "model",
            text: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
        },
    ]);

    // Scroll to the bottom of chat messages whenever chatHistory updates
    useEffect(() => {
        chatBodyRef.current?.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [chatHistory]);

    return (
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
            {/* Button to toggle chatbot open/close */}
            <button
                onClick={() => setShowChatbot((prev) => !prev)}
                id="chatbot-toggler"
            >
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-rounded">close</span>
            </button>

            {/* Chatbot popup window */}
            <div className="chatbot-popup">
                {/* Header with icon, title, and minimize button */}
                <div className="chat-header">
                    <div className="header-info">
                        <ChatbotIcon />
                        <h2 className="logo-text">Chatbot</h2>
                    </div>
                    <button
                        onClick={() => setShowChatbot((prev) => !prev)}
                        className="material-symbols-rounded"
                    >
                        keyboard_arrow_down
                    </button>
                </div>

                {/* Chat messages container */}
                <div ref={chatBodyRef} className="chat-body">
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>

                {/* Footer with input form for user to send messages */}
                <div className="chat-footer">
                    <ChatForm
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
