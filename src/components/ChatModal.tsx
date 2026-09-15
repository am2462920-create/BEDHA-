import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Plus,
  Trash2,
  Search,
  Bot,
  User,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatConversation, ChatMessage } from '../types';
import { INITIAL_CONVERSATIONS } from '../data/initialData';

export const ChatModal: React.FC = () => {
  const { isChatOpen, setChatOpen, user, setActiveProjectModal, projects } = useApp();

  // Conversations State
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    try {
      const saved = localStorage.getItem('bedha_chats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_CONVERSATIONS;
  });

  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || 'conv_1'
  );
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMobileList, setShowMobileList] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist conversations
  useEffect(() => {
    try {
      localStorage.setItem('bedha_chats', JSON.stringify(conversations));
    } catch (e) {}
  }, [conversations]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeConvId, isTyping]);

  if (!isChatOpen) return null;

  const activeConversation =
    conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleStartNewChat = () => {
    const newId = `conv_${Date.now()}`;
    const newConv: ChatConversation = {
      id: newId,
      title: 'New Neural Dialogue',
      lastMessage: 'Awaiting prompt...',
      updatedAt: 'Just now',
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: 'ai',
          text: `Greetings, ${user.name.split(' ')[0]}. I am **BEDHA AI**, cognitive core of the BEDHA technology ecosystem. How may I assist your exploration today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setShowMobileList(false);
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    if (activeConvId === id) {
      if (filtered.length > 0) {
        setActiveConvId(filtered[0].id);
      } else {
        handleStartNewChat();
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    setInputText('');

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update conversation with user message
    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            title: c.messages.length <= 1 ? query.slice(0, 30) : c.title,
            lastMessage: query,
            updatedAt: 'Just now',
            messages: [...c.messages, userMsg]
          };
        }
        return c;
      })
    );

    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      let replyText = '';
      if (response.ok) {
        const data = await response.json();
        replyText = data.reply;
      } else {
        replyText = `BEDHA AI Core responded to: "${query}". You can also explore our 16 flagship projects directly in the Projects section or reach the founder Brindaban Mondal at brindabanmondal987@gmail.com.`;
      }

      const aiMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev =>
        prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              lastMessage: replyText.slice(0, 50) + '...',
              updatedAt: 'Just now',
              messages: [...c.messages, aiMsg]
            };
          }
          return c;
        })
      );
    } catch (err) {
      console.warn('Chat fetch error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `msg_ai_fb_${Date.now()}`,
        sender: 'ai',
        text: `I received your inquiry regarding "${query}". The BEDHA ecosystem is progressing at pace with 16 core pillars including Helium Flowzen X1 quantum silicon, A1 mobile devices, HIMADRI smart city grids, and space transport.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations(prev =>
        prev.map(c => (c.id === activeConvId ? { ...c, messages: [...c.messages, fallbackAiMsg] } : c))
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const quickPrompts = [
    'What is Helium Flowzen X1?',
    'Tell me about the A1 smartphone',
    'How does HIMADRI smart city operate?',
    'Founder & Architect contact info'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] sm:h-[84vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* TOP: BEDHA AI Header with Robot Visual Reference */}
        <div className="bg-slate-900 text-white p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between shrink-0 relative overflow-hidden">
          {/* Subtle Ambient Glowing Backdrop */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            {/* Robot Visual from generated asset */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-blue-500/50 shadow-md bg-slate-800 shrink-0">
              <img
                src="/assets/brand/bedha_ai_robot.jpg"
                alt="BEDHA AI Robot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-wide text-white font-heading">
                  BEDHA AI
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-300 font-semibold uppercase tracking-wider">
                  Autonomous Core
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>Sentient Ecosystem Intelligence • Grounded Knowledge Base</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => setShowMobileList(!showMobileList)}
              className="md:hidden px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200"
            >
              {showMobileList ? 'Chat' : 'Chats'}
            </button>
            <button
              onClick={() => setChatOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Chat Workspace: Sidebar (Conversations) + Active Chat */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar: User Conversations List */}
          <div
            className={`w-full md:w-80 border-r border-slate-200 bg-slate-50/80 flex flex-col shrink-0 transition-all ${
              showMobileList ? 'flex absolute inset-0 z-20 bg-white' : 'hidden md:flex'
            }`}
          >
            {/* Search and New Chat button */}
            <div className="p-3 border-b border-slate-200/80 space-y-2">
              <button
                onClick={handleStartNewChat}
                className="w-full py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Start New Dialogue</span>
              </button>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dialogues..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Conversation Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 no-scrollbar">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  No conversations found.
                </div>
              ) : (
                filteredConversations.map(conv => {
                  const isActive = conv.id === activeConvId;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setActiveConvId(conv.id);
                        setShowMobileList(false);
                      }}
                      className={`p-3.5 cursor-pointer transition-colors flex items-start justify-between group ${
                        isActive ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="text-xs font-bold text-slate-800 truncate font-heading">
                          {conv.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {conv.lastMessage}
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1 font-mono">
                          {conv.updatedAt}
                        </div>
                      </div>

                      <button
                        onClick={e => handleDeleteConversation(conv.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-opacity"
                        title="Delete conversation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Main Chat Panel */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Active Dialogue Header on Mobile */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-700 truncate max-w-xs">
                  {activeConversation?.title || 'Active Dialogue'}
                </span>
              </div>
              <span className="text-[10px] text-slate-600">
                {activeConversation?.messages.length || 0} messages
              </span>
            </div>

            {/* Chat Messages Scroll Window */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
              {activeConversation?.messages.map(msg => {
                const isAi = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 sm:gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-blue-300 shrink-0 bg-slate-900">
                        <img
                          src="/assets/brand/bedha_ai_robot.jpg"
                          alt="AI"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div
                      className={`relative max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed group ${
                        isAi
                          ? 'bg-slate-50 text-slate-800 border border-slate-200/90 rounded-tl-sm'
                          : 'bg-blue-600 text-white rounded-tr-sm shadow-xs'
                      }`}
                    >
                      {/* Markdown simple parse for bold text */}
                      <div className="whitespace-pre-wrap">
                        {msg.text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3 text-[10px] opacity-70">
                        <span>{msg.timestamp}</span>
                        {isAi && (
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-blue-600"
                            title="Copy reply"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {!isAi && (
                      <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-slate-300 shrink-0 bg-slate-100">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2.5 text-xs text-slate-500 p-2">
                  <div className="w-7 h-7 rounded-xl overflow-hidden ring-1 ring-blue-300 shrink-0 bg-slate-900">
                    <img
                      src="/assets/brand/bedha_ai_robot.jpg"
                      alt="AI"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-600">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    <span>BEDHA AI neural node thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar bg-slate-50/40">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider shrink-0">
                Suggested:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-[11px] text-slate-600 transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask BEDHA AI about projects, technology, or services..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
