import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { UserDocument } from "../../../interfaces/UserDocument";
import { getProviderDocuments } from "../../../services/api_service";

/* Type */

export default function ProviderDocumentsPage() {
  const [search, setSearch] = useState("");

  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);
    
      useEffect(()=>{
        const fetchUserDocuments = async() =>{
          const res = await getProviderDocuments("77dc48a7-ac12-4ad4-888b-8643451ccad5");
    
          if(res.status === 200){
            setUserDocuments(res.data)
            
          }
        }
    
        fetchUserDocuments()
      },[]);

  const filtered = userDocuments.filter((d) =>
    `${d.user} ${d.fileName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-textSecondary">
          Track documents you have uploaded and assigned.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
        <Search size={18} className="text-textSecondary" />
        <input
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/*  Table */}
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-sm">
          
          {/* Header */}
          <thead className="bg-white/5 text-textSecondary">
            <tr className="text-left">
              <th className="p-4">User</th>
              <th className="p-4">Document</th>
              <th className="p-4">Assigned At</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filtered.map((doc, index) => (
              <motion.tr
                key={index}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="border-t border-white/5"
              >
                <td className="p-4 font-medium">{doc.user}</td>

                <td className="p-4">{doc.fileName}</td>

                <td className="p-4 text-textSecondary">
                  {doc.assignedAt}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      doc.isRead
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {doc.isRead ? "Read" : "Unread"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}