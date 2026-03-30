import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { loginRequest, AuthUser } from "../../interfaces/AuthUser";
import { loginUser } from "../../services/api_service";
import { useAuthStore } from "../../stores/authStore";

export default function ProviderLoginPage() {
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

    const res = await loginUser(logUser, "ServiceProvider")

    if(res.status == 200){
      
      const user:AuthUser = res.data
      login(user)

      navigate('/provider')
      
      // setLoading(false)
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-semibold mb-6">Provider Login</h1>

        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input placeholder="Email" className="input" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="input" onChange={(e)=>setPassword(e.target.value)} />

            <button className="btn-primary">Login</button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-400">
        New to the platform?{" "}
        <Link 
            to="/provider/register" 
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