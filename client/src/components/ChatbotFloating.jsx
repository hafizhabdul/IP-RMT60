import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import api from '@/utils/api';

export default function ChatbotFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! 👋 Saya SNS Assistant. Ada yang bisa saya bantu tentang kursus NDT, jadwal training, atau sertifikasi?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/chatbot/send', { message: trimmed });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.text || 'Maaf, saya tidak bisa menjawab saat ini.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti atau hubungi kami via WhatsApp di +62 812-9258-446.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">SNS Assistant</div>
                  <div className="text-xs text-gray-300">AI-Powered • NDT Expert</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-900'}`}>
                      {msg.role === 'user' ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3 text-white" />}
                    </div>
                    <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown
                          className="prose prose-sm max-w-none [&>p]:m-0 [&>ul]:m-0 [&>ol]:m-0 [&>p+p]:mt-2"
                          components={{
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 px-3 py-2 bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pertanyaan..."
                  className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        aria-label="Chat with AI Assistant"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </>
  );
}
