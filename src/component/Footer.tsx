'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaComment, FaPaperPlane } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const Footer: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

  
    const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    const recipientNumber = '+923356155446'; 
    setMessages((prevMessages) => [...prevMessages, { from: 'User', text: message }]);
    setIsSending(true);

    try {
        const response = await sendMessageToWhatsApp(message, recipientNumber); // Pass the recipient number
        setMessages((prevMessages) => [...prevMessages, { from: 'Support', text: response }]);
    } catch (error) {
        console.error('Failed to send message to WhatsApp:', error);
        setMessages((prevMessages) => [...prevMessages, { from: 'Support', text: 'Failed to send message' }]);
    } finally {
        setIsSending(false);
        setMessage(''); 
    }
};

const sendMessageToWhatsApp = async (message: string, to: string): Promise<string> => {
    try {
        const response = await fetch('/api/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, to }), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData.error}`);
        }

        const data = await response.json();
        return data.success ? 'Message sent successfully!' : 'Failed to send message.';
    } catch (error) {
        console.error('Failed to send message to WhatsApp:', error);
        throw new Error('Failed to send message to WhatsApp');
    }
};



    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <footer className="bg-green-800 text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* Company Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-600 pb-2">Company</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">About Us</a></li>
                             <li className="mb-2">
                                <Link href="/contact">
                                    <span className="hover:text-gray-400 transition cursor-pointer">Contact Us</span>
                                </Link>
                            </li>
                            {/* <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">Careers</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">Blog</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Responsibility</a></li> */}
                        </ul>
                    </div>

                    {/* Help Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-600 pb-2">Help</h3>
                        <ul>
                             <li className="mb-2">
                                <Link href="/contact">
                                    <span className="hover:text-gray-400 transition cursor-pointer">Contact Us</span>
                                </Link>
                            </li>
                           
                            {/* <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">Reward Points</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">Product Subscriptions</a></li> */}
                            <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">Delivery & Returns</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">Shipping Countries</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-gray-400 transition">FAQs</a></li>
                            {/* <li><a href="#" className="hover:text-gray-400 transition">Ad Validation</a></li> */}
                        </ul>
                    </div>

                    {/* Shop Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-600 pb-2">Shop</h3>
                        <ul>
                            <li className="mb-2">
                      <Link href="/women" passHref>
                        <span className="hover:text-gray-400 transition cursor-pointer">Women</span>
                       </Link>
                        </li>
                     <li className="mb-2">
                      <Link href="/men" passHref>
                       <span className="hover:text-gray-400 transition cursor-pointer">Men</span>
                      </Link>
                       </li>
                       <li className="mb-2">
                        <Link href="/kids" passHref>
                        <span className="hover:text-gray-400 transition cursor-pointer">Children & Teens</span>
                           </Link>
                           </li>
                            {/* <li><a href="#" className="hover:text-gray-400 transition">All</a></li> */}
                        </ul>
                    </div>
                </div>
                

                <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                    <div className="flex items-center w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 border border-gray-300 rounded-l-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition mb-2 md:mb-0"
                        />
                        <button className="bg-green-900 text-white p-3 rounded-r-md hover:bg-gray-700 mb-2 md:mb-0 transition duration-200 h-12 w-full md:h-auto md:w-auto">
                            Join Now
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4">
            <a href="https://www.facebook.com/meditour.global1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                <FaFacebookF size={24} />
            </a>
            <a href="https://www.instagram.com/meditour.global/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                <FaInstagram size={24} />
            </a>
            <a href="https://www.youtube.com/channel/@meditour.global" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                <FaYoutube size={24} />
            </a>
            <a href="https://www.linkedin.com/company/themeditourglobal/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
                <FaLinkedinIn size={24} />
            </a>
        </div>

                </div>
                
                {/* Divider Line and Copyright */}
                <div className="my-8 border-t border-gray-600"></div>
                <p className="text-center text-sm">
                    &copy; {new Date().getFullYear()} Kurative Green. All rights reserved.
                </p>
            </div>

            {/* Chat Feature */}
            {!isChatOpen && (
                <div className="fixed bottom-5 right-5 z-50">
                    <button
                        onClick={toggleChat}
                        className="bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition duration-200 flex items-center"
                    >
                        <FaComment className="mr-2" /> Chat Now
                    </button>
                </div>
            )}

            {/* Chat Box */}
            {isChatOpen && (
                <div className="fixed bottom-5 right-5 z-50 bg-white shadow-lg rounded-lg p-4 w-80">
                    <div className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2">
                        <h3 className="font-bold text-green-700 text-lg">Chat with Us</h3>
                        <button onClick={toggleChat} className="text-green-700 hover:text-red-600 text-xl">
                            &times;
                        </button>
                    </div>
                    <div className="h-60 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 flex flex-col ${msg.from === 'User' ? 'items-start' : 'items-end'}`}>
                                <div className={`rounded-lg p-2 text-black`}>
                                    <div className={`font-bold text-sm text-green-700 rounded-t-lg`}>
                                        {msg.from}
                                    </div>
                                    <div className={`rounded-lg p-2 text-xs bg-white`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="border border-gray-300 rounded-l-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500 transition h-12"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-green-700 text-white p-2 rounded-r-md hover:bg-green-500 transition duration-200 flex items-center h-12"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
