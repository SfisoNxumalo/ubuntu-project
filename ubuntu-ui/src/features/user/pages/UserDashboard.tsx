import { motion } from "framer-motion";
import { FileText, Upload, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserDocuments } from "../../../services/api_service";
import { useNavigate } from "react-router-dom";
import type { UserDocument } from "../../../interfaces/UserDocument";

export default function UserDashboard() {

  const [, setUserDocuments] = useState<UserDocument[]>([]);

  useEffect(()=>{
    const fetchUserDocuments = async() =>{
      const res = await getUserDocuments("acf13ea8-1747-4cec-a242-cd81c7aa1f13");

      if(res.status === 200){
        setUserDocuments(res.data)
      }
    }

    fetchUserDocuments()
  },[]);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
      >
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome back 👋
        </h1>
        <p className="text-textSecondary mt-2">
          Your AI assistant is ready to help you access your documents.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <DashboardCard
          
          icon={FileText}
          title="View Documents"
          description="Browse your uploaded and shared documents"
          url="/user/documents"
        />

        <DashboardCard
          icon={PlayCircle}
          title="Listen to Summary"
          description="Play AI-generated summaries instantly"
          url="/user"
        />

        <DashboardCard
          icon={Upload}
          title="Upload Document"
          description="Upload a new document for summarisation"
          url="/user"
        />
      </div>

      {/* Recent Documents */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>

        <div className="grid gap-4">
          <RecentDocCard id="1" title="Bank Statement - March" />
          <RecentDocCard id="2" title="Medical Report" />
          <RecentDocCard id="3" title="Lease Agreement" />
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  icon: any;
  title: string;
  description: string;
  url:string
};

function DashboardCard({ icon: Icon, title, description, url }: CardProps) {

  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(url)}
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer transition"
    >
      <Icon className="mb-4 text-primary" size={28} />

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-textSecondary mt-1">{description}</p>
    </motion.div>
  );
}

function RecentDocCard({ title, id }: { title: string, id:string }) {

  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <FileText className="text-primary" size={20} />
        <span>{title}</span>
      </div>

      <button onClick={() => navigate(`/user/documents/${id}`)} className="text-sm text-primary hover:underline">
        View
      </button>
    </motion.div>
  );
}