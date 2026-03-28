import { motion } from "framer-motion";
import { FileText, Search, PlayCircle } from "lucide-react";

const documents = [
  { id: 1, title: "Bank Statement - March", date: "2 days ago" },
  { id: 2, title: "Medical Report", date: "5 days ago" },
  { id: 3, title: "Lease Agreement", date: "1 week ago" },
];

export default function UserDocumentsPage() {
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
        {documents.map((doc) => (
          <DocumentCard key={doc.id} {...doc} />
        ))}
      </div>
    </div>
  );
}

type DocProps = {
  title: string;
  date: string;
};

function DocumentCard({ title, date }: DocProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <FileText className="text-primary" size={22} />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-textSecondary">{date}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        
        <button className="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
          View
        </button>

        <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-primary hover:bg-primaryHover transition">
          <PlayCircle size={16} />
          Listen
        </button>
      </div>
    </motion.div>
  );
}