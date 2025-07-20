import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import "../CSS/chatbot.css";

const Chatbot = () => {
    const chatBodyRef = useRef();
    const [showChatbot, setShowChatbot] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        {
            role: "model",
            text: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
        },
    ]);

    useEffect(() => {
        chatBodyRef.current?.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [chatHistory]);

    return (
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
            <button
                onClick={() => setShowChatbot((prev) => !prev)}
                id="chatbot-toggler"
            >
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-rounded">close</span>
            </button>

            <div className="chatbot-popup">
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

                <div ref={chatBodyRef} className="chat-body">
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>

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
