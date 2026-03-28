import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

/* Type */
type ProviderDocument = {
  username: string;
  documentName: string;
  documentId: string;
  assignedAt: string;
  isRead: boolean;
};

/* Mock Data */
const mockDocuments: ProviderDocument[] = [
  {
    username: "Sifiso Mawila",
    documentName: "Bank Statement - March",
    documentId: "doc-1",
    assignedAt: "2026-03-20",
    isRead: true,
  },
  {
    username: "Jane Smith",
    documentName: "Insurance Policy",
    documentId: "doc-2",
    assignedAt: "2026-03-18",
    isRead: false,
  },
];

export default function ProviderDocumentsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockDocuments.filter((d) =>
    `${d.username} ${d.documentName}`
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
                <td className="p-4 font-medium">{doc.username}</td>

                <td className="p-4">{doc.documentName}</td>

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