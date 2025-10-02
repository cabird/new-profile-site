# Chat with Paper System - Implementation Guide

## Overview

The "Chat with Paper" system allows users to have a conversational interface with individual research papers using Azure OpenAI. The system loads the full paper content into context and streams responses in real-time using Server-Sent Events (SSE).

## System Architecture

```
┌─────────────┐      POST /api/papers/{id}/chat      ┌──────────────┐
│   Frontend  │────────────────────────────────────>│   Backend    │
│ (React)     │                                      │   (Flask)    │
│             │<────────────SSE Stream──────────────│              │
└─────────────┘                                      └──────────────┘
                                                             │
                                                             ▼
                                                     ┌──────────────┐
                                                     │ Azure OpenAI │
                                                     │   Streaming  │
                                                     └──────────────┘
```

---

## Backend Implementation

### 1. Required Dependencies

```python
from flask import Flask, request, Response, stream_with_context
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from openai import AzureOpenAI
import json
```

### 2. Azure OpenAI Client Initialization

The chat client is initialized on application startup using RBAC (Role-Based Access Control) authentication:

```python
# Global variable
chat_client = None

# Initialize in your startup function
def initialize_system():
    global chat_client

    # Load Azure OpenAI configuration
    azure_config = config_data.get("azure_openai", {})

    try:
        # Use RBAC authentication with DefaultAzureCredential
        credential = DefaultAzureCredential()
        token_provider = get_bearer_token_provider(
            credential,
            azure_config.get("scope", "https://cognitiveservices.azure.com/.default")
        )

        chat_client = AzureOpenAI(
            azure_endpoint=azure_config.get("endpoint"),
            azure_deployment=azure_config.get("llm_deployment"),
            azure_ad_token_provider=token_provider,
            api_version=azure_config.get("api_version", "2025-04-01-preview")
        )
        logger.info("Azure OpenAI chat client initialized with RBAC")
    except Exception as e:
        logger.error(f"Failed to initialize Azure OpenAI chat client: {e}")
        chat_client = None
```

### 3. Conversation Storage

Conversations are stored in-memory (not persistent):

```python
# Global conversation storage
# Structure: {paper_id: [{role: "system/user/assistant", content: "..."}]}
chat_conversations = {}
```

### 4. Chat Endpoint - POST `/api/papers/<int:paper_id>/chat`

This endpoint handles chat messages and streams responses using SSE:

```python
@app.route('/api/papers/<int:paper_id>/chat', methods=['POST'])
def chat_with_paper(paper_id):
    """Chat with a specific paper using Azure OpenAI."""
    global chat_conversations

    # Validate chat client is initialized
    if not chat_client:
        return jsonify({'error': 'Chat client not initialized'}), 500

    if not chunk_mapper:
        return jsonify({'error': 'ChunkMapper not initialized'}), 500

    # Get user message from request
    data = request.get_json()
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'error': 'Message is required'}), 400

    # Initialize conversation for this paper if it doesn't exist
    if paper_id not in chat_conversations:
        # Get the full paper content
        paper = chunk_mapper.get_paper(paper_id)
        if not paper:
            return jsonify({'error': f'Paper {paper_id} not found'}), 404

        # Get all chunks for the paper
        chunk_ids = chunk_mapper.get_paper_chunks(paper_id)
        chunks = chunk_mapper.get_chunks_by_ids(chunk_ids)

        # Combine chunks into full paper text
        full_paper_text = f"Title: {paper['title']}\n\n"
        for chunk in chunks:
            full_paper_text += chunk['text'] + "\n\n"

        # Initialize conversation with system message containing the paper
        chat_conversations[paper_id] = [
            {
                "role": "system",
                "content": f"You are an AI assistant helping to analyze and discuss the following paper. Answer questions about it concisely and accurately.\n\nPaper content:\n{full_paper_text}"
            }
        ]

    # Add user message to conversation history
    chat_conversations[paper_id].append({"role": "user", "content": user_message})

    def generate_sse_response():
        """Generate SSE response for streaming chat."""
        try:
            # Create chat completion with streaming enabled
            stream = chat_client.chat.completions.create(
                model=chat_client._azure_deployment,  # Use the deployment name
                messages=chat_conversations[paper_id],
                temperature=0.7,
                stream=True
            )

            # Collect the full response for storing in conversation history
            full_response = ""

            # Stream each chunk to the client
            for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    # Send SSE event for each chunk
                    yield f"data: {json.dumps({'type': 'chat_chunk', 'content': content})}\n\n"

            # Add assistant's response to conversation history
            chat_conversations[paper_id].append({
                "role": "assistant",
                "content": full_response
            })

            # Send completion event
            yield f"data: {json.dumps({'type': 'chat_complete'})}\n\n"

        except Exception as e:
            logger.error(f"Chat error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    # Return SSE stream response
    return Response(
        stream_with_context(generate_sse_response()),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
            'Connection': 'keep-alive',
        }
    )
```

### 5. Clear Chat Endpoint - DELETE `/api/papers/<int:paper_id>/chat`

Allows users to reset the conversation:

```python
@app.route('/api/papers/<int:paper_id>/chat', methods=['DELETE'])
def clear_paper_chat(paper_id):
    """Clear the chat history for a specific paper."""
    global chat_conversations

    if paper_id in chat_conversations:
        del chat_conversations[paper_id]
        return jsonify({'message': 'Chat cleared successfully'})

    return jsonify({'message': 'No chat history to clear'})
```

---

## Frontend Implementation

### 1. React Component State

The chat functionality is part of the `ChunkViewer` component:

```javascript
const { useState, useEffect, useRef } = React;

window.ChunkViewer = ({ chunkId, onClose }) => {
    // ... other state ...

    // Chat panel state
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const chatMessagesEndRef = useRef(null);

    // ... rest of component
};
```

### 2. Auto-Scroll Effect

Automatically scrolls to the bottom when new messages arrive:

```javascript
// Auto-scroll to bottom of chat messages
useEffect(() => {
    if (chatMessagesEndRef.current) {
        chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [chatMessages]);
```

### 3. Send Message Function

Handles sending messages and receiving streaming responses:

```javascript
const sendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading || !chunkData) return;

    const message = chatInput.trim();
    setChatInput('');
    setChatLoading(true);

    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
        // Get paper ID from chunk data
        const paperId = chunkData.paper_id;

        // Send the message via POST which returns SSE stream
        const response = await fetch(`/api/papers/${paperId}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        // Read the SSE stream from the response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let currentAssistantMessage = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));

                        if (data.type === 'chat_chunk') {
                            // Accumulate the streamed content
                            currentAssistantMessage += data.content;

                            // Update the last message if it's from assistant, or add new one
                            setChatMessages(prev => {
                                const lastMessage = prev[prev.length - 1];
                                if (lastMessage && lastMessage.role === 'assistant') {
                                    return [...prev.slice(0, -1), {
                                        role: 'assistant',
                                        content: currentAssistantMessage
                                    }];
                                } else {
                                    return [...prev, {
                                        role: 'assistant',
                                        content: currentAssistantMessage
                                    }];
                                }
                            });
                        } else if (data.type === 'chat_complete') {
                            setChatLoading(false);
                        } else if (data.type === 'error') {
                            console.error('Chat error:', data.message);
                            setChatMessages(prev => [...prev, {
                                role: 'error',
                                content: `Error: ${data.message}`
                            }]);
                            setChatLoading(false);
                        }
                    } catch (e) {
                        // Ignore JSON parsing errors for incomplete chunks
                    }
                }
            }
        }

        setChatLoading(false);

    } catch (error) {
        console.error('Chat error:', error);
        setChatMessages(prev => [...prev, {
            role: 'error',
            content: 'Failed to send message'
        }]);
        setChatLoading(false);
    }
};
```

### 4. Clear Chat Function

```javascript
const clearChat = async () => {
    if (!chunkData) return;

    try {
        const paperId = chunkData.paper_id;
        await fetch(`/api/papers/${paperId}/chat`, {
            method: 'DELETE'
        });
        setChatMessages([]);
    } catch (error) {
        console.error('Failed to clear chat:', error);
    }
};
```

### 5. Toggle Chat Panel

```javascript
const toggleChat = () => {
    setChatOpen(!chatOpen);
};
```

### 6. Chat UI Component

```javascript
{chatOpen && (
    <div className="chat-panel">
        <div className="chat-panel-header">
            <h4>Chat with Paper</h4>
            <button className="clear-chat-btn" onClick={clearChat} title="Clear chat">
                🗑️
            </button>
        </div>
        <div className="chat-messages">
            {chatMessages.length === 0 ? (
                <div className="chat-empty">
                    Ask questions about this paper...
                </div>
            ) : (
                chatMessages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.role}`}>
                        <div className="message-role">
                            {msg.role === 'user' ? 'You' :
                             msg.role === 'assistant' ? 'AI' : 'Error'}
                        </div>
                        {msg.role === 'assistant' ? (
                            <div
                                className="message-content markdown-chat-content"
                                dangerouslySetInnerHTML={{
                                    __html: renderMarkdown(msg.content)
                                }}
                            />
                        ) : (
                            <div className="message-content">
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))
            )}
            <div ref={chatMessagesEndRef} />
        </div>
        <div className="chat-input-container">
            <input
                type="text"
                className="chat-input"
                placeholder="Type your question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                    }
                }}
                disabled={chatLoading}
            />
            <button
                className="send-btn"
                onClick={sendChatMessage}
                disabled={!chatInput.trim() || chatLoading}
            >
                {chatLoading ? '⏳' : '➤'}
            </button>
        </div>
    </div>
)}
```

### 7. Chat Toggle Button (in header)

```javascript
<button
    className={`chat-toggle-btn ${chatOpen ? 'active' : ''}`}
    onClick={toggleChat}
    title="Chat with paper"
>
    💬
</button>
```

---

## Data Flow Diagram

```
User Types Message
       │
       ▼
Frontend: Add message to UI (optimistic update)
       │
       ▼
Frontend: POST to /api/papers/{paper_id}/chat
       │
       ▼
Backend: Check if conversation exists for paper_id
       │
       ├─── No ──> Load full paper text
       │           Create system message with paper content
       │           Initialize conversation
       │
       ├─── Yes ─> Use existing conversation
       │
       ▼
Backend: Append user message to conversation history
       │
       ▼
Backend: Call Azure OpenAI with streaming=True
       │
       ▼
Backend: Stream chunks via SSE
       │    Format: data: {"type": "chat_chunk", "content": "..."}
       │
       ▼
Frontend: Read SSE stream with ReadableStream API
       │
       ▼
Frontend: Accumulate chunks and update UI in real-time
       │
       ▼
Backend: Send completion signal
       │    Format: data: {"type": "chat_complete"}
       │
       ▼
Frontend: Mark chat as complete, enable input
```

---

## Key Implementation Details

### SSE Event Types

The backend sends these SSE event types:

1. **`chat_chunk`**: Incremental content from the LLM
   ```json
   {"type": "chat_chunk", "content": "partial response text"}
   ```

2. **`chat_complete`**: Signals the response is complete
   ```json
   {"type": "chat_complete"}
   ```

3. **`error`**: Error occurred during processing
   ```json
   {"type": "error", "message": "error description"}
   ```

### Conversation Context Management

- **First message**: System loads entire paper text into context
- **Subsequent messages**: Uses existing conversation history
- **Clear chat**: Deletes conversation from memory, next message reloads paper

### Memory Considerations

⚠️ **Important**: Full paper text is loaded into the system message. For very large papers, this can consume significant token quota. Consider:

- Token counting before initialization
- Chunking strategies for extremely long papers
- Warning users about context window limits

### Streaming Implementation

The backend uses:
- `stream=True` in OpenAI API call
- Generator function for SSE
- `stream_with_context()` Flask wrapper

The frontend uses:
- Fetch API with `ReadableStream`
- Manual SSE parsing (not EventSource API)
- Incremental UI updates for smooth streaming

---

## Configuration Requirements

### Azure OpenAI Config (config.json)

```json
{
  "azure_openai": {
    "endpoint": "https://your-resource.openai.azure.com/",
    "llm_deployment": "gpt-4",
    "embedding_deployment": "text-embedding-3-large",
    "api_version": "2025-04-01-preview",
    "scope": "https://cognitiveservices.azure.com/.default"
  }
}
```

### Required Azure Permissions

The application uses RBAC (DefaultAzureCredential), so the identity running the app needs:
- **Cognitive Services OpenAI User** role on the Azure OpenAI resource

---

## Adaptation Guide for Junior Developers

### To Adapt This System to Your Application:

1. **Backend Integration**:
   - Copy the Azure OpenAI client initialization code
   - Implement the two endpoints (`POST` and `DELETE`)
   - Replace `chunk_mapper` with your own data source
   - Adjust the system message format for your content type

2. **Frontend Integration**:
   - Copy the chat state management code
   - Implement the `sendChatMessage()` function
   - Adapt the UI components to match your design system
   - Ensure you handle SSE parsing correctly

3. **Customization Points**:
   - **System Message**: Modify the prompt in lines 618-622 of app.py
   - **Temperature**: Adjust creativity (currently 0.7)
   - **UI Styling**: Add CSS for chat panel, messages, etc.
   - **Error Handling**: Add retry logic, rate limiting

4. **Testing Checklist**:
   - [ ] First message initializes conversation correctly
   - [ ] Streaming displays incrementally
   - [ ] Multiple messages maintain context
   - [ ] Clear chat resets conversation
   - [ ] Error handling works for network failures
   - [ ] Long papers don't exceed token limits
   - [ ] Concurrent users don't interfere

---

## Common Issues and Solutions

### Issue: SSE connection drops
**Solution**: Check reverse proxy buffering settings, add keepalive headers

### Issue: Out of memory with many conversations
**Solution**: Implement conversation cleanup, LRU cache, or persistent storage

### Issue: Token limit exceeded
**Solution**: Truncate paper content, use summarization, or implement chunked context

### Issue: Slow first message
**Solution**: Pre-load paper content when viewer opens, show loading indicator

---

## Performance Optimization

1. **Pre-load paper content**: Load paper text when chunk viewer opens, before first chat message
2. **Debounce typing**: Only send message on Enter key, not on every keystroke
3. **Conversation pruning**: Limit conversation history to recent N messages
4. **Caching**: Cache paper text loading to avoid repeated chunk retrieval

---

## Security Considerations

1. **Authentication**: Add user authentication to prevent unauthorized access
2. **Rate Limiting**: Limit messages per user/paper to prevent abuse
3. **Input Sanitization**: Validate and sanitize user input
4. **XSS Protection**: Be careful with `dangerouslySetInnerHTML` (use DOMPurify)
5. **Token Limits**: Enforce maximum tokens per conversation

---

## File References

- **Backend**: `/app.py` lines 63-66 (globals), 109-128 (init), 583-680 (endpoints)
- **Frontend**: `/static/js/components/ChunkViewer.js` lines 11-176 (logic), 499-558 (UI)
- **API Docs**: `/FLASK_API_DOCUMENTATION.md` lines 233-261
