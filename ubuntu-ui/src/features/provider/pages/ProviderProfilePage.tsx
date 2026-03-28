import { useState } from "react";
import { motion } from "framer-motion";

type ProviderProfile = {
  companyName: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  contactPersonName: string;
  logoUrl: string;
  industry: string;
  updatedAt: string;
};

const industries = [
  "Insurance",
  "Healthcare",
  "Finance",
  "Education",
  "Technology",
];

const mockProvider: ProviderProfile = {
  companyName: "Yourway",
  registrationNumber: "REG-123456",
  email: "yourway@gmail.com",
  phoneNumber: "0119848760",
  address: "123 Main Street",
  city: "Johannesburg",
  country: "South Africa",
  contactPersonName: "John Doe",
  logoUrl: "https://via.placeholder.com/80",
  industry: "Insurance",
  updatedAt: "2026-03-20",
};

export default function ProviderProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState(mockProvider);
  const [form, setForm] = useState(mockProvider);

  const handleChange = (key: keyof ProviderProfile, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setProvider({
      ...form,
      updatedAt: new Date().toISOString().split("T")[0],
    });
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
          <p className="text-sm text-textSecondary">
            Last updated: {provider.updatedAt}
          </p>
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
          src={provider.logoUrl}
          alt="Logo"
          className="w-20 h-20 rounded-xl object-cover border border-white/10"
        />
        {isEditing && (
          <input
            type="text"
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={(e) => handleChange("logoUrl", e.target.value)}
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
        <Input label="Company Name" value={form.companyName} disabled={!isEditing} onChange={(v:string) => handleChange("companyName", v)} />
        <Input label="Registration Number" value={form.registrationNumber} disabled={!isEditing} onChange={(v:string) => handleChange("registrationNumber", v)} />
        <Input label="Email" value={form.email} disabled={!isEditing} onChange={(v:string) => handleChange("email", v)} />
        <Input label="Phone Number" value={form.phoneNumber} disabled={!isEditing} onChange={(v:string) => handleChange("phoneNumber", v)} />
        <Input label="Address" value={form.address} disabled={!isEditing} onChange={(v:string) => handleChange("address", v)} />
        <Input label="City" value={form.city} disabled={!isEditing} onChange={(v:string) => handleChange("city", v)} />
        <Input label="Country" value={form.country} disabled={!isEditing} onChange={(v:string) => handleChange("country", v)} />
        <Input label="Contact Person" value={form.contactPersonName} disabled={!isEditing} onChange={(v:string) => handleChange("contactPersonName", v)} />

        {/* Industry Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-textSecondary">Industry</label>
          <select
            disabled={!isEditing}
            value={form.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
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