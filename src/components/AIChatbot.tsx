import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, BookOpen, Clock, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

const QUICK_PROMPTS = [
  { label: "List KsTU Faculties", text: "What are the faculties and major departments at Kumasi Technical University (KsTU)?" },
  { label: "Explain Database Normalization", text: "Can you explain database normalization (1NF, 2NF, 3NF) simply for a Level 200 student?" },
  { label: "Study Schedule help", text: "Chale, help me design a 5-day exam study schedule for Engineering Level 300 with 4 courses." },
  { label: "Campus FAQs", text: "Where is the Central Library located, and what are the library operating hours?" }
];

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Akwaaba! I'm **Kojo**, your official KsTU Academic Assistant. Ask me anything about your lecture notes, courses, past questions, study techniques, or general campus details. How can I help you today, Chale?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setError(null);
    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with AI");
      }

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Make sure your GEMINI_API_KEY is active in secrets.");
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text: string) => {
    // Simple custom markdown renderer for bold, list items, and linebreaks
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Check for headers
      if (line.startsWith("### ")) {
        return <h4 key={lineIdx} className="text-base font-bold text-slate-800 mt-3 mb-1">{line.replace("### ", "")}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={lineIdx} className="text-lg font-extrabold text-[#003366] mt-4 mb-2">{line.replace("## ", "")}</h3>;
      }
      if (line.startsWith("# ")) {
        return <h2 key={lineIdx} className="text-xl font-black text-[#003366] mt-4 mb-2">{line.replace("# ", "")}</h2>;
      }

      // Check for bullet points
      const isBullet = line.startsWith("- ") || line.startsWith("* ");
      let processedLine = line;
      if (isBullet) {
        processedLine = line.substring(2);
      }

      // Format bold markup **text**
      const parts = processedLine.split(/\*\*(.*?)\*\*/g);
      const content = parts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-semibold text-slate-900">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-sm text-slate-700 leading-relaxed mb-1">
            {content}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-sm text-slate-700 leading-relaxed mb-2 min-h-[1px]">
          {content}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-50 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden" id="ai-assistant-card">
      {/* Bot Header */}
      <div className="bg-[#003366] p-5 text-white flex items-center justify-between border-b border-[#003366]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm animate-pulse">
            <Bot className="w-6 h-6 text-[#FFD700]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold tracking-tight text-white">Kojo Academic AI</h3>
              <span className="bg-[#FFD700] text-[#003366] font-mono text-[9px] px-2 py-0.5 rounded-full font-black">GEMINI FLASH</span>
            </div>
            <p className="text-xs text-blue-100/80">Kumasi Tech Uni Hub Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setMessages([{ role: "model", text: "Let's start fresh, Chale! Ask me anything about your academic courses, note summaries, or campus life at KsTU." }]);
              setError(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
              msg.role === "user" 
                ? "bg-[#003366] border-[#003366] text-white" 
                : "bg-[#FFD700]/10 border-[#FFD700]/20 text-[#003366]"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3.5 rounded-2xl shadow-xs text-sm ${
              msg.role === "user"
                ? "bg-[#003366] text-white rounded-tr-none"
                : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
            }`}>
              {msg.role === "user" ? (
                <p className="whitespace-pre-line">{msg.text}</p>
              ) : (
                <div className="space-y-1">{renderFormattedText(msg.text)}</div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#003366] flex items-center justify-center shrink-0 animate-bounce">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs rounded-tl-none flex items-center gap-2 text-slate-500 text-sm">
              <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-ping" />
              <span>Chale, Kojo is drafting a response...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <div className="space-y-1.5">
              <p className="font-semibold">Gemini AI Offline / Key Missing</p>
              <p>{error}</p>
              <div className="text-xs bg-red-100/50 p-2 rounded border border-red-200 font-mono text-red-950">
                Tip: Configure <strong>GEMINI_API_KEY</strong> in the top-right <strong>Settings &gt; Secrets</strong> panel to power real-time AI mentoring.
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Suggestions (Only if chat is short or empty) */}
      {messages.length <= 2 && (
        <div className="p-4 bg-slate-100/70 border-t border-slate-200/60">
          <p className="text-xs font-semibold text-slate-500 mb-2.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#003366]" />
            Quick Academic Enquiries:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp.text)}
                className="p-3 bg-white hover:bg-[#FFD700]/10 border border-slate-200 hover:border-[#FFD700]/30 rounded-2xl text-left text-xs text-slate-700 transition-all font-medium shadow-xs"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 bg-white border-t border-slate-200 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Kojo about course notes, past questions, or campus info..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-[#003366] hover:bg-blue-800 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
          disabled={!input.trim() || loading}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
