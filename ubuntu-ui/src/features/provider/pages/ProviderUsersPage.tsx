import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Type */
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  province: string;
  isActive: boolean;
};

/* Mock Data */
const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Sifiso",
    lastName: "Mawila",
    email: "sifiso@email.com",
    phone: "0712345678",
    province: "Gauteng",
    isActive: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@email.com",
    phone: "0723456789",
    province: "Western Cape",
    isActive: false,
  },
];

export default function ProviderUsersPage() {

  const navigate = useNavigate();
    
  const [search, setSearch] = useState("");

  const filteredUsers = mockUsers.filter((u) =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Assigned Users</h1>
        <p className="text-textSecondary">
          View users who have granted access to your services.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
        <Search size={18} className="text-textSecondary" />
        <input
          placeholder="Search users..."
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
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Province</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                onClick={() => navigate(`/provider/users/${user.id}`)}
                key={user.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="border-t border-white/5"
              >
                <td className="p-4 font-medium">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-4 text-textSecondary">
                  {user.email}
                </td>

                <td className="p-4">{user.phone}</td>

                <td className="p-4">{user.province}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
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