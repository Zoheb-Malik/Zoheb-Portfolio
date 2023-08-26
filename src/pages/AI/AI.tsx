import { useState, useEffect, useRef } from 'react';
import { OpenAI } from 'openai';

import '../../styles/pages/AI.scss';

import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PageContent from '../../components/PageContent/PageContent';
import PopupModal from '../../components/PopupModal/PopupModal';

export default function AI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openAIKey, setOpenAIKey] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [, setChatOutput] = useState('');
  const [error, setError] = useState('');

  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleChatInputChange = (event: any) => {
    setChatInput(event.target.value);
    setIsTyping(event.target.value !== '');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (openAIKey) {
      const openai = new OpenAI({
        apiKey: openAIKey,
        dangerouslyAllowBrowser: true,
      });

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: 'user', content: chatInput },
      ]);
      setChatInput('');
      setIsTyping(false);

      try {
        setIsThinking(true);
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: chatInput },
            {
              role: 'system',
              content: 'Do NOT talk like an AI bot. Mimic a genuine helpful person.',
            },
          ],
          max_tokens: 1096,
          temperature: 0.9,
        });

        if (response.choices && response.choices.length > 0) {
          const message = response.choices[0].message?.content?.trim();
          setChatOutput(message || '');
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { role: 'ai', content: message || '' },
          ]);
          localStorage.setItem(
            'chatHistory',
            JSON.stringify([
              ...chatHistory,
              { role: 'user', content: chatInput },
              { role: 'ai', content: message || '' },
            ]),
          );
        }
      } catch (error) {
        setError('There has been an error generating a response. Please try again later.');
      } finally {
        setIsThinking(false);
      }
    } else if (!openAIKey.startsWith('sk-')) {
      setError('You must enter a valid OpenAI key!');
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  useEffect(() => {
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      (chatContainer as HTMLElement).scrollTop = (chatContainer as HTMLElement).scrollHeight;
    }
  }, [chatHistory]);

  return (
    <PageTemplate header="AI Chatbot">
      <PageContent title="Chat with AI">
        <div>
          <button onClick={() => setIsModalOpen(true)}>Enter API Key</button>
        </div>
        <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <h2>Enter Key</h2>
            <input
              type="text"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="Enter your API key..."
              disabled={isThinking}
            />
            <button onClick={() => setIsModalOpen(false)} disabled={!openAIKey.startsWith('sk-')}>
              Save
            </button>
          </div>
        </PopupModal>
        <div className="chat-container">
          <div ref={chatContainerRef} className="chat-messages">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-bubble ${chat.role}-bubble`}>
                <p>{chat.content}</p>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble user-bubble">
                <p>Typing...</p>
              </div>
            )}
            {isThinking && (
              <div className="chat-bubble ai-bubble">
                <p>Thinking...</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={handleChatInputChange}
              placeholder="Type your message..."
              disabled={!openAIKey.startsWith('sk-') || isThinking || !!error}
            />
            <button type="submit" disabled={!openAIKey || !chatInput.trim() || isThinking || !!error}>
              Send
            </button>
            <button onClick={handleClearHistory} disabled={chatHistory.length < 1}>
              Clear Chat
            </button>
          </form>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>
      </PageContent>
    </PageTemplate>
  );
}
