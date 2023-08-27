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
  const [isError, setError] = useState('');

  const [introMessageIndex, setIntroMessageIndex] = useState(0);

  const introMessages = [
    "Welcome To The zAI Chatbot!",
    "Ask Me Anything!",
    "Let's Have A Conversation!",
    "Ready To Chat?",
    "What's On Your Mind?",
  ];

  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const AIErrorHandling = !openAIKey.startsWith('sk-') || openAIKey.length !== 51;

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

      setChatInput('');
      setIsTyping(false);

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: 'user', content: chatInput },
      ]);

      try {
        setIsThinking(true);
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: chatInput },
            {
              role: 'system',
              content: 'Be simple, do not write large messages. If asked a question that indicates you may need to recall a previous message, emphasise you do not retain conversational history.',
            },
          ],
          max_tokens: 1096,
          temperature: 0.9,
        });

        if (!isError && (response.choices && response.choices.length > 0)) {
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
      } catch (error: any) {
        setError(error.message);

        setTimeout(() => {
          window.location.reload();
        }, 5000);

        localStorage.removeItem('chatHistory');
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIntroMessageIndex((prevIndex) => (prevIndex + 1) % introMessages.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTemplate header="zAI Chatbot">
      <PageContent>
        <div>
          <button onClick={() => setIsModalOpen(true)}>Enter OpenAI Key</button>
        </div>
        <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="margin--remove-top">Enter Key</h2>
          <input
            type="text"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
            placeholder="Enter OpenAI key..."
          />
          <button type="submit" onClick={() => setIsModalOpen(false)} disabled={AIErrorHandling}>
            Save
          </button>
        </PopupModal>
        <div className="chat-container">
          <div ref={chatContainerRef} className="chat-messages">
            {!isTyping && chatHistory.length === 0 && (
              <div className="chat-intro fade">
                <h3>{introMessages[introMessageIndex]}</h3>
              </div>
            )}
            {!isError && chatHistory.map((chat, index) => (
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
              disabled={AIErrorHandling || isThinking || !!isError}
            />
            <button type="submit" disabled={AIErrorHandling || !chatInput.trim() || isThinking || !!isError}>
              Send
            </button>
            <button className="clear" onClick={handleClearHistory} disabled={!!isError || chatHistory.length < 1}>
              Clear Chat
            </button>
          </form>
          {isError && (
            <div className="error-message">
              <p>{isError}</p>
              <p>The page will automatically refresh in 5 seconds.</p>
            </div>
          )}
        </div>
      </PageContent>
    </PageTemplate>
  );
}
