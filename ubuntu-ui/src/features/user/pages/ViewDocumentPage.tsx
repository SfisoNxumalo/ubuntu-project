import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

/* Mock Data */
const mockDocument = {
  title: "Bank Statement - March",
  provider: "Yourway Insurance",
  summary:
    "This document provides a summary of financial transactions, including deposits, withdrawals, and account balances for the month.",
};

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ViewDocumentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Ask me anything about this document." },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };

    const aiResponse: Message = {
      role: "ai",
      text: "This is a simulated AI response based on the document.",
    };

    setMessages((prev) => [...prev, userMessage, aiResponse]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-40px)] gap-6">
      
      {/* 📄 LEFT: Document */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">
            {mockDocument.title}
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Provided by {mockDocument.provider}
          </p>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h2 className="text-lg font-semibold mb-3">
            Summary
          </h2>

          <p className="text-textSecondary leading-relaxed">
            {mockDocument.summary}
          </p>
        </motion.div>
      </div>

      {/* 🤖 RIGHT: Chat Panel */}
      <div className="w-[350px] flex flex-col border border-white/10 rounded-2xl bg-white/5">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 font-semibold">
          AI Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-primary text-white self-end"
                  : "bg-white/10 text-textPrimary self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this document..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 outline-none text-sm"
          />

          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-primary hover:bg-primaryHover"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}