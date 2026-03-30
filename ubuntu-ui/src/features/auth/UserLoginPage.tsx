import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { AuthUser, loginRequest } from "../../interfaces/AuthUser";
import { loginUser } from "../../services/api_service";
import { useAuthStore } from "../../stores/authStore";

export default function UserLoginPage() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const login = useAuthStore.getState().login; // or use selector
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // setLoading(true)

    const logUser:loginRequest = {
      email:email,
      password:password
    }

    const res = await loginUser(logUser, "User")

    if(res.status == 200){
      
      const user:AuthUser = res.data
      login(user)
      

      navigate('/user')
      
      // setLoading(false)
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
      >
        <h1 className="text-2xl font-semibold mb-6">User Login</h1>

        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          <button className="btn-primary">Login</button>
          </form>
          
            <p className="mt-4 text-center text-sm text-gray-400">
        New to the platform?{" "}
        <Link 
            to="/register" 
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
            Create an Account
        </Link>
        </p>
        </div>
      </motion.div>
    </div>
  );
}