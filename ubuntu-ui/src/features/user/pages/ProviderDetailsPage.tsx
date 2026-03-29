import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { checkAccess, getServiceProviderById, updateProviderAccess, type AccessObj } from "../../../services/api_service";
import type { ServiceProvider } from "../../../interfaces/ServiceProvider";
import { useParams } from "react-router-dom";

/* Mock */

export default function ProviderDetailsPage() {

  const {id} = useParams()
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [isActivated, setActiviated] = useState<AccessObj | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  if(id){
    useEffect(()=>{
      const fetchServiceProvider = async() =>{
        const res = await getServiceProviderById(id);
        if(res.status === 200){
          setProvider(res.data)
          const hasAccess = await checkAccess("ACF13EA8-1747-4CEC-A242-CD81C7AA1F13", id);
          if(hasAccess.status === 200){
            setActiviated(hasAccess.data);
          }
          
        }
      }
      fetchServiceProvider()
    },[]);
  }
  
  const modifyUserProviderAccess = async (grant:boolean) => {
    try {
        if (!id) return;

        const res = await updateProviderAccess("ACF13EA8-1747-4CEC-A242-CD81C7AA1F13", id, grant);

        // 4. Check the status code as you intended
        if (res.status === 200) {
        setActiviated({
            hasAccess: grant
        });
        }
    } catch (error) {
        console.error("Failed to update access:", error);
        // Optional: Add user feedback here (e.g., a toast notification)
    }
    };

    const handleToggle = async () => {

    if (!isActivated?.hasAccess) {
        setShowConfirm(true);
        return; // Exit early
    }

    modifyUserProviderAccess(false)
}

  const confirmAdd = () => {
    modifyUserProviderAccess(true)
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {provider?.companyName}
        </h1>

         <button
          onClick={handleToggle}
          className={`px-5 py-2 rounded-xl text-sm transition ${
            isActivated?.hasAccess
              ? "bg-red-500/20 text-red-400"
              : "bg-primary text-white"
          }`}
        >
          {isActivated?.hasAccess ? "Remove Access" : "Add Provider"}
        </button>
      </div>

      {/* Logo + Industry */}
      <div className="flex items-center gap-4">
        <img
          src={provider?.logo}
          alt="logo"
          className="w-20 h-20 rounded-xl border border-white/10 object-cover"
        />

        <div>
          <p className="text-textSecondary text-sm">Industry</p>
          <p className="font-medium">{provider?.industry}</p>
        </div>
      </div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <Detail label="Email" value={provider?.email || ""} />
        <Detail label="Phone" value={provider?.phoneNumber || ""} />
        <Detail label="City" value={provider?.city || ""} />
        <Detail label="Country" value={provider?.country || ""} />
        {/* <Detail label="Contact Person" value={provider?.contactPersonName} /> */}
      </motion.div>

      {/* Confirm Modal */}
      {showConfirm && (
        <ConfirmModal
          name={provider?.companyName || ""}
          onConfirm={confirmAdd}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

/* Detail Field */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-textSecondary">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

/* Confirm Modal */
function ConfirmModal({
  name,
  onConfirm,
  onClose,
}: {
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface p-6 rounded-2xl border border-white/10 w-[90%] max-w-md">
        
        <h2 className="text-lg font-semibold mb-2">
          Allow Access?
        </h2>

        <p className="text-sm text-textSecondary mb-6">
          Allow <span className="text-white">{name}</span> to send you documents?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}