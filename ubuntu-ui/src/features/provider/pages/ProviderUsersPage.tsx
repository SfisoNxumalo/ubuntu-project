import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { ServiceProviderUser } from "../../../interfaces/ServiceProviderUser";
import { getServiceProvidersUsers } from "../../../services/api_service";


export default function ProviderUsersPage() {

  const [search, setSearch] = useState("");

  const [serviceProviderUsers, setServiceProviderUsers] = useState<ServiceProviderUser[]>([]);
  
    useEffect(()=>{
          const fetchUsers = async() =>{
            const res = await getServiceProvidersUsers("77dc48a7-ac12-4ad4-888b-8643451ccad5");
            if(res.status === 200){
              setServiceProviderUsers(res.data)
            }
          }
          fetchUsers()
        },[]);

  const filteredUsers = serviceProviderUsers.filter((u) =>
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
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                
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
               
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}