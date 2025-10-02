const ChatModal = ({ paper, onClose }) => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [streamingMessage, setStreamingMessage] = React.useState('');
    const [remainingMessages, setRemainingMessages] = React.useState(null);
    const [messageCount, setMessageCount] = React.useState(0);
    const messagesEndRef = React.useRef(null);

    // Auto-scroll to bottom when messages change
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingMessage]);

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            // Send DELETE request to clear conversation
            fetch(`/api/papers/${paper.id}/chat`, {
                method: 'DELETE'
            }).catch(err => console.error('Failed to clear chat:', err));
        };
    }, [paper.id]);

    const renderMarkdown = (text) => {
        if (!text) return '';

        const markedOptions = {
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        };

        // Parse markdown then sanitize HTML
        const rawHtml = marked.parse(text, markedOptions);
        return DOMPurify.sanitize(rawHtml);
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setError(null);

        // Add user message to UI
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        setLoading(true);
        setStreamingMessage('');

        try {
            const response = await fetch(`/api/papers/${paper.id}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            // Handle SSE stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = JSON.parse(line.substring(6));

                        if (data.type === 'chat_chunk') {
                            setStreamingMessage(prev => prev + data.content);
                        } else if (data.type === 'chat_complete') {
                            // Add complete assistant message - capture streamingMessage in closure
                            setStreamingMessage(currentStreaming => {
                                setMessages(prev => [...prev, {
                                    role: 'assistant',
                                    content: currentStreaming
                                }]);
                                return ''; // Clear streaming message
                            });
                            setRemainingMessages(data.remaining_messages);
                            setMessageCount(data.message_count);
                        } else if (data.type === 'error') {
                            throw new Error(data.message);
                        }
                    }
                }
            }

            // Handle any remaining streaming message
            if (streamingMessage) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: streamingMessage
                }]);
                setStreamingMessage('');
            }

        } catch (err) {
            console.error('Chat error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClearChat = async () => {
        try {
            await fetch(`/api/papers/${paper.id}/chat`, {
                method: 'DELETE'
            });
            setMessages([]);
            setStreamingMessage('');
            setError(null);
            setRemainingMessages(null);
            setMessageCount(0);
        } catch (err) {
            console.error('Failed to clear chat:', err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content chat-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="chat-header">
                    <div>
                        <h2>Chat with Paper</h2>
                        <p className="chat-paper-title">{paper.title}</p>
                    </div>
                    <button className="btn-close" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                {/* Status bar */}
                <div className="chat-status-bar">
                    <span>
                        {messageCount > 0 && `${messageCount}/${10} messages`}
                        {remainingMessages !== null && ` • ${remainingMessages} remaining this hour`}
                    </span>
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleClearChat}
                        disabled={messages.length === 0 && !streamingMessage}
                    >
                        Clear
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.length === 0 && !streamingMessage && (
                        <div className="chat-empty-state">
                            <p>Ask questions about this paper</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message chat-message-${msg.role}`}>
                            <div className="chat-message-icon">
                                {msg.role === 'user' ? 'You' : 'AI'}
                            </div>
                            <div
                                className="chat-message-content"
                                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                            />
                        </div>
                    ))}

                    {streamingMessage && (
                        <div className="chat-message chat-message-assistant">
                            <div className="chat-message-icon">
                                AI
                            </div>
                            <div
                                className="chat-message-content"
                                dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingMessage) }}
                            />
                        </div>
                    )}

                    {loading && !streamingMessage && (
                        <div className="chat-message chat-message-assistant">
                            <div className="chat-message-icon">
                                AI
                            </div>
                            <div className="chat-message-content">
                                <div className="chat-typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Error display */}
                {error && (
                    <div className="chat-error">
                        ⚠ {error}
                    </div>
                )}

                {/* Input */}
                <div className="chat-input-container">
                    <textarea
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question about this paper..."
                        rows="2"
                        disabled={loading}
                    />
                    <button
                        className="btn btn-primary chat-send-btn"
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
