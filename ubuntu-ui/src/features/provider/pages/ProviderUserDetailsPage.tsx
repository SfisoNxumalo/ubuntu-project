
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useState } from "react";

/* Types */
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  province: string;
};

type Document = {
  id: string;
  title: string;
  createdAt: string;
};

/* Mock Data */
const mockUser: User = {
  id: "1",
  firstName: "Sifiso",
  lastName: "Mawila",
  email: "sifiso@email.com",
  phone: "0712345678",
  province: "Gauteng",
};

const mockDocuments: Document[] = [
  { id: "1", title: "Bank Statement - March", createdAt: "2 days ago" },
  { id: "2", title: "Insurance Policy", createdAt: "5 days ago" },
  { id: "3", title: "Medical Report", createdAt: "1 week ago" },
];

export default function ProviderUserDetailsPage() {

  const [search, setSearch] = useState("");

  const filteredDocs = mockDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* 👤 User Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <h1 className="text-2xl font-semibold">
          {mockUser.firstName} {mockUser.lastName}
        </h1>

        <div className="mt-2 text-sm text-textSecondary">
          <p>{mockUser.email}</p>
          <p>{mockUser.phone}</p>
          <p>{mockUser.province}</p>
        </div>
      </motion.div>

      {/*  Documents Section */}
      <div className="flex flex-col gap-4">
        
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Documents Sent
          </h2>

          {/*  Search */}
          <input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm outline-none"
          />
        </div>

        {/* List */}
        <div className="grid gap-3">
          {filteredDocs.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-textSecondary">
                    {doc.createdAt}
                  </p>
                </div>
              </div>

              <button className="text-sm text-primary hover:underline">
                View
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}