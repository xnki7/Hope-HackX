import React, { useState, useRef, useEffect } from 'react';
import img from "../../assets/msg.svg"
import cross from "../../../public/cross.svg"

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'incoming',
            message:
                'Hello👋, I am Chat AI. I will assist you with recent disasters.',
        },
        { type: 'queryHeader', message: 'Popular Queries:' },
        { type: 'suggested', message: 'What is Earthquake ?' },
        {
            type: 'suggested',
            message:
                'What types of damage have been reported due to the floods?',
        },
    ]);
    const [userMessage, setUserMessage] = useState('');
    const chatboxRef = useRef(null);

    const A_KEY =  import.meta.env.VITE_CHAT_BOT_KEY

    const createChatMessage = (message, type) => {
        return { message, type };
    };

    const generateResponse = async () => {
        const API_URL = 'https://api.openai.com/v1/chat/completions';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${A_KEY}`,
            },
            body: JSON.stringify({
                model: 'ft:gpt-3.5-turbo-1106:personal::A4NqgVG8',
                messages: [
                    {
                        role: 'system',
                        content:
                            "You are a 'Chat AI'. You are an AI assistant which can answer questions related to trained data and natural disasters professionally and precisely.",
                    },
                    { role: 'user', content: userMessage },
                ],
                temperature: 0.4,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0.1,
                presence_penalty: 0,
            }),
        };

        try {
            const res = await fetch(API_URL, options);
            const data = await res.json();
            const botMessage = data.choices[0].message.content.trim();
            setMessages((prev) => [
                ...prev,
                createChatMessage(botMessage, 'incoming'),
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                createChatMessage('Oops! Something went wrong.', 'incoming'),
            ]);
        }
    };

    const handleSendMessage = () => {
        if (!userMessage) return;

        setMessages((prev) => [
            ...prev,
            createChatMessage(userMessage, 'outgoing'),
        ]);
        setUserMessage('');
        setTimeout(generateResponse, 600);
    };

    const handleQueryClick = (query) => {
        setUserMessage(query);
    };

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="fixed bottom-5 right-5">
            {/* Chatbot Toggler */}
            <button
                className="h-12 w-12 bg-blue-600 text-white rounded-full flex justify-center items-center shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <span className="material-symbols-outlined"><img src={cross} className='h-5 w-5' alt="" /></span>
                ) : (
                    <span className="material-symbols-rounded">
                        <img src={img} className='h-5 w-5' alt="" />
                    </span>
                )}
            </button>

            {/* Chatbot UI */}
            {isOpen && (
                <div className="fixed right-5 bottom-20 w-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                    {/* Chatbot Header */}
                    <header className="bg-blue-600 text-white p-4 text-center relative">
                        <h2>Chat AI</h2>
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="material-symbols-outlined">
                            <img src={cross} className='h-5 w-5 mt-[0.7rem]' alt="" />
                            </span>
                        </button>
                    </header>

                    {/* Chatbox */}
                    <ul
                        className="overflow-y-auto p-4 space-y-3 flex-1"
                        ref={chatboxRef}
                        style={{ maxHeight: '400px' }}
                    >
                        {messages.map((msg, index) =>
                            msg.type === 'queryHeader' ? (
                                <p
                                    key={index}
                                    className="text-sm font-semibold text-gray-600"
                                >
                                    {msg.message}
                                </p>
                            ) : msg.type === 'suggested' ? (
                                <li
                                    key={index}
                                    className="cursor-pointer text-blue-600"
                                    onClick={() =>
                                        handleQueryClick(msg.message)
                                    }
                                >
                                    {msg.message}
                                </li>
                            ) : (
                                <li
                                    key={index}
                                    className={`flex ${
                                        msg.type === 'outgoing'
                                            ? 'justify-end'
                                            : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`p-3 rounded-lg ${
                                            msg.type === 'outgoing'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-black'
                                        }`}
                                    >
                                        {msg.message}
                                    </div>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Chat Input */}
                    <div className="p-3 border-t border-gray-300 flex items-center space-x-2">
                        <textarea
                            className="flex-1 border-none resize-none focus:outline-none p-2"
                            rows="1"
                            placeholder="Enter a message..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button
                            className="text-blue-600"
                            onClick={handleSendMessage}
                            disabled={!userMessage}
                        >
                            <span className="material-symbols-rounded">
                                send
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
