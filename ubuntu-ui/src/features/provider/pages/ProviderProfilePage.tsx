import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getServiceProviderById } from "../../../services/api_service";
import type { ServiceProvider } from "../../../interfaces/ServiceProvider";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

const industries = [
  "Insurance",
  "Healthcare",
  "Finance",
  "Education",
  "Technology",
];

export default function ProviderProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [form, setForm] = useState<ServiceProvider | null>(null);

    const user = useAuthStore((s) => s.user);
  const navigate = useNavigate()

  if(!user) {
    navigate('/')
    return
  }

    if(user?.id){
      useEffect(()=>{
        const fetchServiceProvider = async() =>{
          const res = await getServiceProviderById(user?.id);
          if(res.status === 200){
            setProvider(res.data)
            setForm(res.data);
          }
        }
        fetchServiceProvider()
      },[]);
    }

  const handleSave = () => {

    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(provider);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Company Profile
          </h1>
          {/* <p className="text-sm text-textSecondary">
            Last updated: {provider.updatedAt}
          </p> */}
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-primary"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-primary"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={provider?.logo}
          alt="Logo"
          className="w-20 h-20 rounded-xl object-cover border border-white/10"
        />
        {isEditing && (
          <input
            type="text"
            placeholder="Logo URL"
            value={provider?.logo}
            
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
          />
        )}
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <Input label="Company Name" value={form?.companyName} disabled={!isEditing}  />
        
        <Input label="Email" value={form?.email} disabled={!isEditing} />
        <Input label="Phone Number" value={form?.phoneNumber} disabled={!isEditing}  />
        
        <Input label="City" value={form?.city} disabled={!isEditing}  />
        <Input label="Country" value={form?.country} disabled={!isEditing}  />
       

        {/* Industry Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-textSecondary">Industry</label>
          <select
            disabled={!isEditing}
            value={form?.industry}
            className={`px-4 py-3 rounded-xl border outline-none ${
              isEditing
                ? "bg-white/10 border-primary"
                : "bg-white/5 border-white/10 text-textSecondary"
            }`}
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
    </div>
  );
}

/* Input Component */
function Input({
  label,
  value,
  onChange,
  disabled,
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-textSecondary">{label}</label>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-3 rounded-xl border outline-none transition ${
          disabled
            ? "bg-white/5 border-white/10 text-textSecondary"
            : "bg-white/10 border-primary text-white"
        }`}
      />
    </div>
  );
}