import { useState, useRef, useEffect } from 'react';
import { explainSchemeWithAI } from '../utils/aiHelper';

const AIChatbot = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am your SchemeScout Assistant. How can I help you find government benefits today?' }
  ]);
  
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault(); // Support form submission/Enter key
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    const userMsg = { role: 'user', text: userQuery };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Logic: Pass "General Assistance" as name so aiHelper uses the Chatbot prompt
      const botResponse = await explainSchemeWithAI(
        { 
          name: "General Assistance", 
          benefit: userQuery 
        }, 
        user
      );
    
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to the scout network. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper no-print">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>🤖 SchemeScout AI</span>
            <button onClick={() => setIsOpen(false)} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>✕</button>
          </div>
          
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg bot typing">
                <span className="loading-pulse">AI is thinking...</span>
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleSendMessage}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about scholarships, farming..." 
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !input.trim()}>
              {isTyping ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Chat">
        {isOpen ? '❌' : '💬'}
      </button>
    </div>
  );
};

export default AIChatbot;