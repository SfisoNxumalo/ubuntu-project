import { motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { getUserDocuments } from "../../../services/api_service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserDocument } from "../../../interfaces/UserDocument";

export default function UserDocumentsPage() {

  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);
  
    useEffect(()=>{
      const fetchUserDocuments = async() =>{
        const res = await getUserDocuments("acf13ea8-1747-4cec-a242-cd81c7aa1f13");
  
        if(res.status === 200){
          setUserDocuments(res.data)
          console.log(">>>> ", res.data);
          
        }
      }
  
      fetchUserDocuments()
    },[]);
    
  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">My Documents</h1>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <Search size={18} className="text-textSecondary" />
          <input
            type="text"
            placeholder="Search documents..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="grid gap-4">
        {userDocuments.map((doc) => (
          <DocumentCard key={doc.id} {...doc} />
        ))}
      </div>
    </div>
  );
}



function DocumentCard(d: UserDocument) {
    const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <FileText className="text-primary" size={22} />
        <div>
          <h3 className="font-medium">{d.fileName}</h3>
          <p className="text-sm text-textSecondary">{d.assignedAt.substring(0, 10)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        
        <button onClick={() => navigate(`/user/documents/${d.documentId}`)} className="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
          View
        </button>

      </div>
    </motion.div>
  );
}