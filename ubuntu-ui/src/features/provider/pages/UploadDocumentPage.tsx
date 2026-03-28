import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Search } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
};

const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Michael Brown", email: "michael@example.com" },
];

export default function UploadDocumentPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    );
  };

  const handleGenerateSummary = () => {
    // Mock AI response (replace with API later)
    setSummary(
      "This document provides a summary of financial transactions and account balances."
    );
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Upload Document</h1>
        <p className="text-textSecondary">
          Upload a document, generate an AI summary, and assign it to users.
        </p>
      </div>

      {/* Upload + Title */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Upload Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center"
        >
          <Upload size={32} className="text-primary mb-4" />
          <p className="text-sm text-textSecondary">
            Drag & drop or click to upload
          </p>
          <input type="file" className="mt-4" />
        </motion.div>

        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-textSecondary">Document Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title..."
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* AI Summary */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">AI Summary</h2>

          <button
            onClick={handleGenerateSummary}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primaryHover text-sm"
          >
            Generate Summary
          </button>
        </div>

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="AI summary will appear here..."
          rows={5}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none resize-none"
        />
      </div>

      {/* Users Table */}
      <div className="flex flex-col gap-4">
        
        <h2 className="text-lg font-semibold">Assign to Users</h2>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <Search size={18} className="text-textSecondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-left text-textSecondary">
                <th className="p-3"></th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUser(user.id)}
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3 text-textSecondary">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button className="px-6 py-3 rounded-xl bg-primary hover:bg-primaryHover shadow-glow">
          Upload & Assign
        </button>
      </div>
    </div>
  );
}