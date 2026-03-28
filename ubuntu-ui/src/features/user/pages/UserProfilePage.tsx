import { useState } from "react";
import { motion } from "framer-motion";
import UserProvidersPage from "./UserProvidersPage";

/* Types */
type UserProfile = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  province: string;
  updatedAt: string;
};

/* Mock Data */
const mockUser: UserProfile = {
  firstName: "Sifiso",
  lastName: "Mawila",
  gender: "Male",
  dateOfBirth: "1998-05-12",
  email: "sifiso@email.com",
  phone: "0712345678",
  province: "Gauteng",
  updatedAt: "2026-03-20",
};

/* Tabs */
type Tab = "profile" | "providers";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [form, setForm] = useState(mockUser);

  const handleChange = (key: keyof UserProfile, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setUser({
      ...form,
      updatedAt: new Date().toISOString().split("T")[0],
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(user);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      
      {/* Tabs */}
      <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
        <TabButton
          label="Profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <TabButton
          label="Service Providers"
          active={activeTab === "providers"}
          onClick={() => setActiveTab("providers")}
        />
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <ProfileTab
          user={user}
          form={form}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}

      {activeTab === "providers" && <UserProvidersPage  />}
    </div>
  );
}

/* 🔹 Tab Button */
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm transition ${
        active
          ? "bg-primary text-white shadow-glow"
          : "text-textSecondary hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

/* 🔹 Profile Tab */
function ProfileTab({
  user,
  form,
  isEditing,
  setIsEditing,
  handleChange,
  handleSave,
  handleCancel,
}: any) {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-textSecondary text-sm">
            Last updated: {user.updatedAt}
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

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <InputField label="First Name" value={form.firstName} disabled={!isEditing} onChange={(v:string) => handleChange("firstName", v)} />
        <InputField label="Last Name" value={form.lastName} disabled={!isEditing} onChange={(v:string) => handleChange("lastName", v)} />
        <InputField label="Gender" value={form.gender} disabled={!isEditing} onChange={(v:string) => handleChange("gender", v)} />
        <InputField label="Date of Birth" type="date" value={form.dateOfBirth} disabled={!isEditing} onChange={(v:string) => handleChange("dateOfBirth", v)} />
        <InputField label="Email" value={form.email} disabled={!isEditing} onChange={(v:string) => handleChange("email", v)} />
        <InputField label="Phone" value={form.phone} disabled={!isEditing} onChange={(v:string) => handleChange("phone", v)} />
        <InputField label="Province" value={form.province} disabled={!isEditing} onChange={(v:string) => handleChange("province", v)} />
      </motion.div>
    </div>
  );
}

/* 🔹 Providers Tab (Simplified placeholder) */
function ProvidersTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10"
    >
      <h2 className="text-lg font-semibold mb-2">
        Service Providers
      </h2>
      <p className="text-textSecondary text-sm">
        Manage which providers can send you documents.
      </p>

      {/* 👉 You can later plug your full ProvidersPage here */}
    </motion.div>
  );
}

/* 🔹 Input */
function InputField({
  label,
  value,
  onChange,
  disabled,
  type = "text",
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-textSecondary">{label}</label>

      <input
        type={type}
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