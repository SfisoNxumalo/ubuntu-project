import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getServiceProviders } from "../../../services/api_service";
import type { ServiceProvider } from "../../../interfaces/ServiceProvider";
import { useNavigate } from "react-router-dom";


export default function UserProvidersPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
//   const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  const [filters, setFilters] = useState({
    city: "",
    country: "",
    industry: "",
  });

  useEffect(()=>{
    const getReceiver = async() =>{
      const res = await getServiceProviders();

      if(res.status === 200){
        setProviders(res.data)
      }
    }

    getReceiver()
  },[]);

  /*  Dynamic dropdown values */
  const cities = [...new Set(providers.map((p) => p.city))];
  const countries = [...new Set(providers.map((p) => p.country))];
  const industries = [...new Set(providers.map((p) => p.industry))];

  /* Filtering */
  const filtered = providers.filter((p) => {
    return (
      p.companyName.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.city || p.city === filters.city) &&
      (!filters.country || p.country === filters.country) &&
      (!filters.industry || p.industry === filters.industry)
    );
  });

  const confirmActivation = () => {
    if (!selectedProvider) return;

    setProviders((prev) =>
      prev.map((p) =>
        p.id === selectedProvider.id
          ? { ...p, isActivated: true }
          : p
      )
    );

    setSelectedProvider(null);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Service Providers</h1>
        <p className="text-textSecondary">
          Manage which providers can send you documents.
        </p>
      </div>

      {/* Search */}
      <input
        placeholder="Search providers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
      />

      {/* 🎛 Filters */}
      <div className="grid md:grid-cols-3 gap-4">
        
        {/* City */}
        <select
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value })
          }
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm outline-none backdrop-blur-md hover:bg-white/10 transition"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Country */}
        <select
          value={filters.country}
          onChange={(e) =>
            setFilters({ ...filters, country: e.target.value })
          }
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm outline-none backdrop-blur-md hover:bg-white/10 transition"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Industry */}
        <select
          value={filters.industry}
          onChange={(e) =>
            setFilters({ ...filters, industry: e.target.value })
          }
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm outline-none backdrop-blur-md hover:bg-white/10 transition"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {/* Providers List */}
      <div className="grid gap-4">
        {filtered.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onToggle={() => {
            //   if (!provider.isActivated) {
            //     setSelectedProvider(provider);
            //   }
            }}
          />
        ))}
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {selectedProvider && (
          <ConfirmModal
            provider={selectedProvider}
            onConfirm={confirmActivation}
            onClose={() => setSelectedProvider(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* Provider Card */
function ProviderCard({
  provider,
}: {
  provider: ServiceProvider;
  onToggle: () => void;
}) {
    const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(`/user/providers/${provider.id}`)}
      whileHover={{ scale: 1.01 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold">{provider.companyName}</h3>
        <p className="text-sm text-textSecondary">
          {provider.city}, {provider.country} • {provider.industry}
        </p>
      </div>

      {/* Toggle */}
      {/* <button
        disabled={provider.isActivated}
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          provider.isActivated
            ? "bg-primary opacity-70 cursor-not-allowed"
            : "bg-gray-600"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            provider.isActivated ? "translate-x-6" : ""
          }`}
        />
      </button> */}
    </motion.div>
  );
}

/* Confirm Modal */
function ConfirmModal({
  provider,
  onConfirm,
  onClose,
}: {
  provider: ServiceProvider;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-surface p-6 rounded-2xl border border-white/10 w-[90%] max-w-md"
      >
        <h2 className="text-lg font-semibold mb-2">
          Allow Access?
        </h2>

        <p className="text-sm text-textSecondary mb-6">
          Allow{" "}
          <span className="text-white">{provider.companyName}</span>{" "}
          to send you documents?
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
      </motion.div>
    </motion.div>
  );
}