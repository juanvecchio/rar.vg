import React, { useState, useRef, useEffect } from 'react';
import './aichat.component.css';
import EditableProfile from './editableprofile.component';

const AIChatComponent = ({ isVisible, onClose, user }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatType, setChatType] = useState('chat'); // 'chat', 'design', 'suggestion'
    const messagesEndRef = useRef(null);
    const previewDialogRef = useRef(null);
    const [parsedAlternatives, setParsedAlternatives] = useState(null); // {a1, a2, a3}
    const [previewProfile, setPreviewProfile] = useState(null); // {components, profileDesign}

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:1300/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    context: messages.slice(-5), // Last 5 messages for context
                    type: 'chat'
                })
            });

            const data = await response.json();

            if (data.success) {
                const aiMessage = {
                    id: Date.now() + 1,
                    text: data.response || data.suggestion || 'Generated content',
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                    type: data.type,
                    image: data.image, // For design generation
                    prompt: data.prompt
                };

                setMessages(prev => [...prev, aiMessage]);

                // Try to parse structured JSON with three alternatives
                try {
                    const raw = aiMessage.text.trim();
                    const sanitized = raw.startsWith('{') ? raw : raw.slice(raw.indexOf('{'));
                    const json = JSON.parse(sanitized);
                    const a1 = json.a1 || json.alt1 || json.option1 || json[0] || null;
                    const a2 = json.a2 || json.alt2 || json.option2 || json[1] || null;
                    const a3 = json.a3 || json.alt3 || json.option3 || json[2] || null;
                    if (a1 && a2 && a3) {
                        setParsedAlternatives({ a1, a2, a3 });
                    } else {
                        setParsedAlternatives(null);
                    }
                } catch (_) {
                    setParsedAlternatives(null);
                }
            } else {
                const errorMessage = {
                    id: Date.now() + 1,
                    text: data.error || 'Sorry, I encountered an error. Please try again.',
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                    type: 'error'
                };

                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString(),
                type: 'error'
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const generateDesign = async (prompt) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:1300/ai/design', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();

            if (data.success) {
                const designMessage = {
                    id: Date.now(),
                    text: `Generated design for: "${prompt}"`,
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                    type: 'design',
                    image: data.image,
                    prompt: prompt
                };

                setMessages(prev => [...prev, designMessage]);
            } else {
                const errorMessage = {
                    id: Date.now() + 1,
                    text: data.error || 'Failed to generate design',
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                    type: 'error'
                };

                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('Error generating design:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: 'Failed to generate design',
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString(),
                type: 'error'
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    const acceptSuggestion = async (selectedDesign) => {
        try {
            console.log('User object:', user);
            console.log('Selected design:', selectedDesign);
            
            // Get tokens from localStorage
            const token = localStorage.getItem('__rvst');
            const clientToken = localStorage.getItem('__rarvg_client');
            
            console.log('Tokens from localStorage:', { token: token ? 'present' : 'missing', clientToken: clientToken ? 'present' : 'missing' });
            
            if (!token || !clientToken) {
                throw new Error('No active session found. Please log in again.');
            }

            // Update the user's profile with the selected design
            const requestBody = {
                token: token,
                clientToken: clientToken,
                displayName: user?.displayName || 'User',
                components: selectedDesign.components || [],
                sociallinks: user?.sociallinks || [],
                profileDesign: selectedDesign.profileDesign || { design: 1, colour: 0 }
            };
            
            // Ensure all required fields are present and not empty
            if (!requestBody.displayName || requestBody.displayName.trim() === '') {
                requestBody.displayName = 'User';
            }
            if (!Array.isArray(requestBody.components)) {
                requestBody.components = [];
            }
            if (!Array.isArray(requestBody.sociallinks)) {
                requestBody.sociallinks = [];
            }
            if (!requestBody.profileDesign || typeof requestBody.profileDesign !== 'object') {
                requestBody.profileDesign = { design: 1, colour: 0 };
            }
            if (!requestBody.profileDesign.design || !requestBody.profileDesign.colour) {
                requestBody.profileDesign = { design: 1, colour: 0 };
            }
            
            console.log('Sending update request:', requestBody);
            
            const response = await fetch('http://localhost:1300/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.success) {
                // Add success message to chat
                const successMessage = {
                    id: Date.now() + 1,
                    text: 'Design accepted successfully! Your profile has been updated with the new design.',
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                    type: 'success'
                };
                setMessages(prev => [...prev, successMessage]);

                // Clear the alternatives since one was accepted
                setParsedAlternatives(null);

                // Close the chat after a short delay
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                // Add error message to chat
                const errorMessage = {
                    id: Date.now() + 1,
                    text: `Failed to accept design: ${data.content || 'Unknown error'}. Status: ${response.status}. Please try again.`,
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                    type: 'error'
                };
                setMessages(prev => [...prev, errorMessage]);
                console.error('Update failed:', data);
            }
        } catch (error) {
            console.error('Error accepting suggestion:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: 'An error occurred while accepting the design. Please try again.',
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString(),
                type: 'error'
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="ai-chat-overlay">
            <div className="ai-chat-container">
                <div className="ai-chat-header">
                    <h3 className="m">AI Design Assistant</h3>
                    <div className="ai-chat-controls">
                        <button onClick={clearChat} className="clear-chat-btn">
                            <span className="s">Clear</span>
                        </button>
                        <button onClick={onClose} className="close-chat-btn">
                            <span className="mm">×</span>
                        </button>
                    </div>
                </div>

                <div className="ai-chat-messages">
                    {messages.length === 0 && (
                        <div className="welcome-message">
                            <h4 className="mm">Welcome to AI Design Assistant!</h4>
                            <p className="s">I can help you create profile designs with different components and layouts.</p>
                            <p className="s">Try asking me to "create a portfolio for a graphic designer" or "design a profile for a tech professional"</p>
                        </div>
                    )}
                    
                    {messages.map((message) => (
                        <div key={message.id} className={`message ${message.sender}`}>
                            <div className="message-content">
                                {message.image && (
                                    <div className="design-image">
                                        <img src={message.image} alt="Generated design" />
                                        <p className="design-prompt s">{message.prompt}</p>
                                    </div>
                                )}
                                {message.sender === 'ai' && message.type === 'chat' ? (
                                    <p className="s">I've generated 3 different profile design options for you. Choose one below. You can edit the design with your own links and content after accepting:</p>
                                ) : (
                                    <p className="s">{message.text}</p>
                                )}
                                <span className="message-time ss">{message.timestamp}</span>
                            </div>
                        </div>
                    ))}

                    {parsedAlternatives && (
                        <div className="ai-chat-alternatives">
                            <div className="alternatives-header">
                                <h4 className="mm">Choose Your Design:</h4>
                            </div>
                            <div className="alternatives-buttons">
                                <div className="option-container">
                                    <button className="entry" onClick={() => {
                                        setPreviewProfile(parsedAlternatives.a1);
                                        previewDialogRef.current?.showModal();
                                    }}><span className="s">Preview Option 1</span></button>
                                    <button className="accept-btn-small" onClick={() => {
                                        acceptSuggestion(parsedAlternatives.a1);
                                    }}>
                                        <span className="s">Accept</span>
                                    </button>
                                </div>
                                <div className="option-container">
                                    <button className="entry" onClick={() => {
                                        setPreviewProfile(parsedAlternatives.a2);
                                        previewDialogRef.current?.showModal();
                                    }}><span className="s">Preview Option 2</span></button>
                                    <button className="accept-btn-small" onClick={() => {
                                        acceptSuggestion(parsedAlternatives.a2);
                                    }}>
                                        <span className="s">Accept</span>
                                    </button>
                                </div>
                                <div className="option-container">
                                    <button className="entry" onClick={() => {
                                        setPreviewProfile(parsedAlternatives.a3);
                                        previewDialogRef.current?.showModal();
                                    }}><span className="s">Preview Option 3</span></button>
                                    <button className="accept-btn-small" onClick={() => {
                                        acceptSuggestion(parsedAlternatives.a3);
                                    }}>
                                        <span className="s">Accept</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {isLoading && (
                        <div className="message ai">
                            <div className="message-content">
                                <div className="loading-indicator">
                                    <span className="s">Loading…</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                <div className="ai-chat-input">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe the profile design you want me to create..."
                        disabled={isLoading}
                    />
                    <button 
                        onClick={sendMessage} 
                        disabled={!inputMessage.trim() || isLoading}
                        className="send-btn"
                    >
                        <span className="s">{isLoading ? 'Sending...' : 'Send'}</span>
                    </button>
                </div>
            </div>
            {/* Preview dialog */}
            <dialog className="ai-chat-preview-dialog" ref={previewDialogRef} onClick={(e) => {
                if (e.target === e.currentTarget) e.currentTarget.close();
            }}>
                <div className="ai-chat-preview-inner">
                    <div className="ai-chat-preview-header">
                        <span className="mm">Preview</span>
                        <button className="close-chat-btn" onClick={() => previewDialogRef.current?.close()}><span className="mm">×</span></button>
                    </div>
                    {previewProfile && user && (
                        <EditableProfile
                            user={{
                                ...user,
                                components: previewProfile.components || [],
                                profileDesign: previewProfile.profileDesign || user.profileDesign,
                            }}
                            reordering={false}
                            selectComponent={() => {}}
                            toggleModal={() => {}}
                            updateComponentOrder={() => {}}
                        />
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default AIChatComponent; 