import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Users,
  Activity,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import type { ServiceProviderUser } from "../../../interfaces/ServiceProviderUser";
import { getProviderDocuments, getServiceProvidersUsers } from "../../../services/api_service";
import type { UserDocument } from "../../../interfaces/UserDocument";
import { useNavigate } from "react-router-dom";

/* Mock Data */
const stats = [
  { label: "Documents Uploaded", value: "0", icon: FileText },
  { label: "Active Users", value: "0", icon: Users },
  { label: "Summaries Generated", value: "0", icon: Activity },
  { label: "Pending Actions", value: "0", icon: Upload },
];

const industryData = [
  { name: "Insurance", value: 40 },
  { name: "Healthcare", value: 25 },
  { name: "Finance", value: 20 },
  { name: "Other", value: 15 },
];

export default function ProviderDashboard() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Need help uploading or assigning documents?" },
  ]);

  const [, setServiceProviderUsers] = useState<number>(0);
  const [uploadData, setuploadData] = useState<any[]>([]);
    
      useEffect(()=>{
            const fetchUsers = async() =>{
              const res = await getServiceProvidersUsers("77dc48a7-ac12-4ad4-888b-8643451ccad5");

              if(res.status === 200){
                setServiceProviderUsers(res.data.length)
                stats[1].value = String(res.data.length)
              }
            }
            fetchUsers()
          },[]);

          const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);
              
                useEffect(()=>{
                  const fetchUserDocuments = async() =>{
                    const res = await getProviderDocuments("77dc48a7-ac12-4ad4-888b-8643451ccad5");
              
                    if(res.status === 200){
                      setUserDocuments(res.data)
                      stats[0].value = String(res.data.length)
                      const output = getUploadDataSummary(res.data)
                      setuploadData(output)
                    }
                  }
              
                  fetchUserDocuments()
                },[]);

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
          <ActionCard title="Upload Document" icon={Upload} url="/provider/upload" />
          <ActionCard title="View Users" icon={Users}  url="/provider/users"/>
        </div>

  
      </div>

      {/*  Recent Documents */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Recent Documents
        </h2>

        <div className="grid gap-3">
          {userDocuments.slice(2).map((doc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between"
            >
              <span>{doc.fileName}</span>
              
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
  url
}: {
  title: string;
  icon: any;
  url:string
}) {
  const navigate = useNavigate();
  return (
    <motion.div
    onClick={() => navigate(url)}
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
    >
      <Icon className="text-primary mb-3" />
      <h3 className="font-semibold">{title}</h3>
    </motion.div>
  );
}

function getUploadDataSummary(data:UserDocument[]):any[]{

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // 1. Group and count
  const counts = data.reduce((acc:any, item) => {

    const monthIndex = parseInt(item.assignedAt.substring(5, 7), 10) - 1;
    const name = monthNames[monthIndex];
    
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  // 2. Format into the final array
  const uploadData:any[] = monthNames
    .map(name => ({
      name: name,
      uploads: counts[name] || 0
    }))

  return uploadData
}