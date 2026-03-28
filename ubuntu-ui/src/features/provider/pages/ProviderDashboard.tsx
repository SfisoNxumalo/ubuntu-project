import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Users,
  Activity,
  Send,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* Mock Data */
const stats = [
  { label: "Documents Uploaded", value: "128", icon: FileText },
  { label: "Active Users", value: "42", icon: Users },
  { label: "Summaries Generated", value: "310", icon: Activity },
  { label: "Pending Actions", value: "5", icon: Upload },
];

const uploadData = [
  { name: "Jan", uploads: 30 },
  { name: "Feb", uploads: 45 },
  { name: "Mar", uploads: 60 },
  { name: "Apr", uploads: 50 },
  { name: "May", uploads: 70 },
];

const industryData = [
  { name: "Insurance", value: 40 },
  { name: "Healthcare", value: 25 },
  { name: "Finance", value: 20 },
  { name: "Other", value: 15 },
];

const recentDocs = [
  "Bank Statement - March",
  "Insurance Policy",
  "Medical Report",
];

export default function ProviderDashboard() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Need help uploading or assigning documents?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: "This is a simulated response." },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/*  Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <Icon className="text-primary mb-3" />
              <p className="text-sm text-textSecondary">{s.label}</p>
              <h2 className="text-xl font-semibold">{s.value}</h2>
            </motion.div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Upload Trend */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-white/5 border border-white/10"
        >
            <h3 className="mb-4 font-semibold">Upload Trends</h3>

            <ResponsiveContainer width="100%" height={250}>
            <LineChart data={uploadData}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                type="monotone"
                dataKey="uploads"
                stroke="#058DE8"
                strokeWidth={2}
                />
            </LineChart>
            </ResponsiveContainer>
        </motion.div>

        {/*  Industry Distribution */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-white/5 border border-white/10"
        >
            <h3 className="mb-4 font-semibold">Industry Distribution</h3>

            <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                data={industryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                >
                {industryData.map((_, index) => (
                    <Cell key={index} fill="#058DE8" />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </motion.div>
        </div>

      {/* Actions + Chat */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Actions */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
          <ActionCard title="Upload Document" icon={Upload} />
          <ActionCard title="Manage Documents" icon={FileText} />
          <ActionCard title="View Users" icon={Users} />
          <ActionCard title="Analytics" icon={Activity} />
        </div>

        {/*  Chat Panel */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5">
          
          <div className="p-4 border-b border-white/10 font-semibold">
            Assistant
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white self-end"
                    : "bg-white/10 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-primary rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/*  Recent Documents */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Recent Documents
        </h2>

        <div className="grid gap-3">
          {recentDocs.map((doc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between"
            >
              <span>{doc}</span>
              <button className="text-primary text-sm">
                View
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*  Action Card */
function ActionCard({
  title,
  icon: Icon,
}: {
  title: string;
  icon: any;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
    >
      <Icon className="text-primary mb-3" />
      <h3 className="font-semibold">{title}</h3>
    </motion.div>
  );
}