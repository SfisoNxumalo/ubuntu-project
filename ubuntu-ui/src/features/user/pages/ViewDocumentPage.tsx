import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Send } from "lucide-react";
import { getDocumentById } from "../../../services/api_service";
import type { UploadedDocument } from "../../../interfaces/UploadedDocument";
import { useParams } from "react-router-dom";
import { useSpeech } from "react-text-to-speech";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ViewDocumentPage() {

  const { id } = useParams();

  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Ask me anything about this document." },
  ]);

  const [playing, setPlaying] = useState<boolean>(false)

   const [document, setDocument] = useState<UploadedDocument | null>(null);

   if (id){
      useEffect(()=>{
        const fetchUserDocuments = async() =>{
          const res = await getDocumentById(id);

          if(res.status === 200){
            setDocument(res.data)
          }
        }

        fetchUserDocuments()
      },[]);
   }

  //  const { start, pause, stop } = useSpeech({
  //   text: document?.content,
  // });

  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const voices = speechSynthesis.getVoices();

    // Try pick a better voice (Google voices are usually best)
    const preferred =
      voices.find(v => v.name.includes("Google")) ||
      voices.find(v => v.lang === "en-US");

    setVoice(preferred || null);
  }, []);

  const { start, pause, stop } = useSpeech({
    text: document?.content,
     lang: "en-US",
    rate: 1,
    pitch: 1,
  });

  

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
            {document?.fileName}
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            {/* Provided by {document?.provider} */}
          </p>
          <button onClick={() => {
            if(playing){
              pause()
              setPlaying(false)
            }
            else{
              start()
              setPlaying(true)
            }
          }} className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-primary hover:bg-primaryHover transition">
            <PlayCircle size={16} />
            { playing ? "pause" : "Listen"}
          </button>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h2 className="text-lg font-semibold mb-3">
            Content
          </h2>

          <p className="text-textSecondary leading-relaxed">
            {document?.content}
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