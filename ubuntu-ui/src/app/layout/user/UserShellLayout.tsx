import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { motion } from "framer-motion";

export default function UserShellLayout() {
  return (
    <div className="h-screen flex bg-background text-textPrimary overflow-hidden">
      <UserSidebar />

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