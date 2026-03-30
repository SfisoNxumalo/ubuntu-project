import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterUser } from "../../interfaces/RegisterUser";
import { RegisterUserService } from "../../services/api_service";

export default function UserRegisterPage() {
  const [form, setForm] = useState<RegisterUser | null>(null);
  const navigate = useNavigate()

  const handleChange = (k: string, v: string) => {
    setForm((prev: any) => ({ ...prev, [k]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // setLoading(true)
       
    
        const registerUser:RegisterUser = {
          Email: form!.Email,
          Phone: form!.Phone,
          Password: form!.Password,
          FirstName: form!.FirstName,
          LastName: form!.LastName,
          Gender: form!.Gender,
          DateOfBirth: form!.DateOfBirth,
          Province: form!.Province
        }
    
        const res = await RegisterUserService(registerUser)
    
        if(res.status == 201){
          alert("User registered successfully")
          navigate('/')
          
          // setLoading(false)
          
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen">
  <motion.div className="w-full max-w-2xl p-6 rounded-2xl bg-white/5 border border-white/10">
    <h1 className="text-2xl font-semibold mb-6">Create Account</h1>

    <form onSubmit={handleSubmit}>
    <div className="grid md:grid-cols-2 gap-4">
          <Input label="First Name" onChange={(v: string) => handleChange("FirstName", v)} />
          <Input label="Last Name" onChange={(v: string) => handleChange("LastName", v)} />
          <Input label="Gender" onChange={(v: string) => handleChange("Gender", v)} />
          <Input label="Date of Birth" type="date" onChange={(v: string) => handleChange("DateOfBirth", v)} />
          <Input label="Email" onChange={(v: string) => handleChange("Email", v)} />
          <Input label="Password" type="password" onChange={(v: string) => handleChange("Password", v)} />
          <Input label="Phone" onChange={(v: string) => handleChange("Phone", v)} />
          <Input label="Province" onChange={(v: string) => handleChange("Province", v)} />
        </div>

    <button className="btn-primary mt-6 w-full">Register</button>
    </form>

    {/* New Login Link Section */}
    <p className="mt-4 text-center text-sm text-gray-400">
      Already have an account?{" "}
      <Link 
        to="/login" 
        className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
      >
        Login
      </Link>
    </p>
  </motion.div>
</div>
  );
}

function Input({ label, type = "text", onChange }: any) {
  return (
    <div>
      <label className="text-sm text-textSecondary">{label}</label>
      <input
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className="input mt-1"
      />
    </div>
  );
}