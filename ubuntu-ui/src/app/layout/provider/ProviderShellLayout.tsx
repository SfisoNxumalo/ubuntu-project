import { Outlet } from "react-router-dom";
import ProviderSidebar from "./ProviderSidebar";
import { motion } from "framer-motion";

export default function ProviderShellLayout() {
  return (
    <div className="h-screen flex bg-background text-textPrimary overflow-hidden">
      <ProviderSidebar />

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}