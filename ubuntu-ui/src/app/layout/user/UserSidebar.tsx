import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, FileText, User } from "lucide-react";

const items = [
  { label: "Dashboard", path: "/user", icon: LayoutDashboard },
  { label: "My Documents", path: "/user/documents", icon: FileText },
  { label: "Profile", path: "/user/profile", icon: User },
];

export default function UserSidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white/5 backdrop-blur-md border-r border-white/10 p-4 flex flex-col">
      
      {/* Logo */}
      <div className="mb-8 text-lg font-semibold">
        <span className="text-white">Ubuntu</span>
        <span className="text-primary">Assist</span>
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-primary/20 text-white shadow-glow"
                      : "text-textSecondary hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}