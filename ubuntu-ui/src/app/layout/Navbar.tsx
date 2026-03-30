import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-semibold">
            <span className="text-white">Ubuntu</span>
            <span className="text-primary">Assist</span>
          </motion.div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link className="text-textSecondary hover:text-white transition" to="/">
            Home
          </Link>
          <Link className="text-textSecondary hover:text-white transition" to="/login">
            User
          </Link>
          <Link className="text-textSecondary hover:text-white transition" to="/provider/login">
            Service provider
          </Link>
        </div>

        {/* CTA */}
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-xl bg-primary text-white text-sm shadow-glow hover:bg-primaryHover transition"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}