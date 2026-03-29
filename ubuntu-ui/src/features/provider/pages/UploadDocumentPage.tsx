import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Search } from "lucide-react";
import type { ServiceProviderUser } from "../../../interfaces/ServiceProviderUser";
import { getServiceProvidersUsers, uploadDocument } from "../../../services/api_service";


export default function UploadDocumentPage() {

  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

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
    u.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    );
  };


  const SERVICE_PROVIDER_ID = "77dc48a7-ac12-4ad4-888b-8643451ccad5";

const handleUpload = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  if (selectedUsers.length === 0) {
    alert("Please select at least one user");
    return;
  }

  //Super bad implementation. Due to time constraint, I'll leave it as it
  try {
    for (const userId of selectedUsers) {
      const formData = new FormData();

      formData.append("File", file);
      formData.append("ServiceProviderId", SERVICE_PROVIDER_ID);
      formData.append("UserId", userId);
      formData.append("ContactPerson", "Admin");

      const res = await uploadDocument(formData)

      if(res.status == 200)
      {
        alert("Document uploaded and assigned successfully 🚀");
      }
    }
  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
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
          <input
            type="file"
            className="mt-4 "
            
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </motion.div>

        {/* Title Input
        <div className="flex flex-col gap-2">
          <label className="text-sm text-textSecondary">Document Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title..."
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          />
        </div> */}
      </div>

      {/* AI Summary */}
      {/* <div className="flex flex-col gap-3">
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
      </div> */}

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
                  <td className="p-3">{user.firstName + " " + user.lastName}</td>
                  <td className="p-3 text-textSecondary">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button onClick={handleUpload} className="px-6 py-3 rounded-xl bg-primary hover:bg-primaryHover shadow-glow">
          Upload & Assign
        </button>
      </div>
    </div>
  );
}