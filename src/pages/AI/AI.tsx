import { useState, useEffect, useRef } from 'react';
import { OpenAI } from 'openai';

import '../../styles/pages/AI.scss';

import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PageContent from '../../components/PageContent/PageContent';

export default function AI() {
  const openAIKey = '';

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
              content: 'Do NOT talk like an AI bot. Mimic a genuine friendly OR helpful person.',
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
        } else {
          setChatOutput('AI could not generate a response.');
        }
      } catch (error) {
        setError('Rate limit reached. Please try again later.');
      } finally {
        setIsThinking(false);
      }
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
              disabled={isThinking}
            />
            <button type="submit" disabled={!openAIKey || !chatInput.trim() || isThinking}>
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
