import { useState, useEffect, useRef } from 'react';

import { OpenAI } from 'openai';

import '../../styles/pages/AI.scss';

import PageTemplate from '../../components/PageTemplate/PageTemplate';
import PageContent from '../../components/PageContent/PageContent';
import PopupModal from '../../components/PopupModal/PopupModal';
import DynamicMessages from '../../components/DynamicMessages/DynamicMessages';

export default function AI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openAIKey, setOpenAIKey] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [, setChatOutput] = useState('');
  const [isError, setError] = useState('');

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

      const updatedChatHistory = [
        ...chatHistory,
        { role: 'user', content: chatInput },
      ];

      setChatHistory(updatedChatHistory);

      try {
        setIsThinking(true);
				
        const messages = updatedChatHistory.map((chat) => ({
          role: chat.role as "user" | "assistant" | "system" | "function",
          content: chat.content,
        }));

        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 1024,
          temperature: 0.8,
        });

        if (!isError && response.choices && response.choices.length > 0) {
          const message = response.choices[0].message?.content?.trim();
          setChatOutput(message || '');

          const updatedChatHistoryWithSystemMessage = [
            ...updatedChatHistory,
            { role: 'system', content: message || '' },
          ];

          setChatHistory(updatedChatHistoryWithSystemMessage);

          localStorage.setItem(
            'chatHistory',
            JSON.stringify(updatedChatHistoryWithSystemMessage),
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

  function handleClearHistory() {
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

  const introMessages = [
    'Welcome To The zAI Chatbot!',
    'Ask Me Anything!',
    "Let's Have A Conversation!",
    'Ready To Chat?',
    "What's On Your Mind?",
  ];

  const thinkingMessages = [
    'Thinking...',
    'Generating a response...',
    'Give me a moment...',
    'Processing...',
    'Computing...',
    'Responding...',
  ];

  useEffect(() => {
    if (!isThinking) {
      const chatInput = document.getElementById('chat-input') as HTMLInputElement;
      chatInput?.focus();
    }
  }, [isThinking]);

  const submitErrorHandler = AIErrorHandling || !chatInput.trim() || isThinking || !!isError;

  return (
    <PageTemplate header="zAI Chatbot">
      <PageContent>
        <p className='margin--remove-top'>
          Your OpenAI key, conversational history, and overall data is not retained. None of your information is stored.
        </p>
        <button className="no-select" onClick={() => setIsModalOpen(true)} disabled={isTyping || isThinking || !!isError}>
          Enter OpenAI Key
        </button>
        <PopupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="margin--remove-top no-select">Enter Key</h2>
          <input
            type="password"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
            placeholder="Enter OpenAI key..."
          />
          <button
            className="no-select"
            type="submit"
            onClick={() => setIsModalOpen(false)}
            disabled={AIErrorHandling}
          >
            Save
          </button>
        </PopupModal>
        <div className="chat-container">
          <div ref={chatContainerRef} className="chat-messages">
            {!isTyping && chatHistory.length === 0 && (
              <DynamicMessages className='chat-intro' messages={introMessages} duration='3' />
            )}

            {!isError &&
              chatHistory.map((chat, index) => (
                <div key={index} className={`chat-bubble chat-bubble-${chat.role}`}>
                  <p>{chat.content}</p>
                </div>
              ))}

            {isTyping && (
              <div className="chat-bubble chat-bubble-user italic">
                <p>Typing...</p>
              </div>
            )}

            {isThinking && (
              <div className="chat-bubble chat-bubble-system italic">
                <p>{thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]}</p>
              </div>
            )}
          </div>
          <form name="chat-input" onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
							id="chat-input"
              value={chatInput}
              onChange={handleChatInputChange}
              placeholder="Type your message..."
              disabled={AIErrorHandling || isThinking || !!isError}
              maxLength={5000}
            />
            <button
              type="submit"
              disabled={submitErrorHandler}
              className={isThinking ? 'italic no-select' : 'no-select'}
            >
              {!isThinking ? 'Send' : 'Sending...'}
            </button>
            <button
              className="clear no-select"
              onClick={handleClearHistory}
              disabled={isTyping || isThinking || !!isError || chatHistory.length < 1}
            >
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

