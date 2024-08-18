import React, { useState, useEffect } from "react";
import { getGreeting } from './greeting';
import './chatbot.css';
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
    //initialising the input and conversations
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Set initial greeting message when the page loads
        setMessages([
            { text: `${getGreeting()}`, isUser: false }
        ]);
    }, []);

    const navigate= useNavigate();
    
    const handleCreateNewCertificate = () => {
        navigate('/certificate');
    };
    const handleViewLastCertificate = () => {
        navigate('/');
    };
    

    const handleSend = () => {
        //checks for a hi and then prints and then gives 2 options
        if (input.trim() === 'hi' || input.trim()==='HI' || input.trim()==='Hi'|| input.trim()==='hI') {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: input, isUser: true },
                //checks if the message is written by the user using isUser
                { text: "Welcome to the Certificate Generator Bot! How can I assist you today?", isUser: false },
                { text: "1. Create New Certificate", isUser: false, button: true },
                { text: "2. View Last Certificate", isUser: false, button: true },
            ]);
        } else if (input.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: input, isUser: true },
                { text: "How else can I help you?", isUser: false },
            ]);
        }
        setInput('');
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                        {msg.text}
                        {msg.button && msg.text.includes("Create New Certificate") &&(
                            <button className="chatbot-button" onClick={handleCreateNewCertificate}>
                                Create New Certificate
                            </button>
                                )}
                        {msg.button && msg.text.includes("View Last Certificate") &&(
                            <button className="chatbot-button" onClick={handleViewLastCertificate}>
                                View Last Certificate
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message CertificateGPT..."
                />
                <button className="send-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;