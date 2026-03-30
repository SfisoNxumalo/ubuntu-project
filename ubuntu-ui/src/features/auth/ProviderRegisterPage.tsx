import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterAuth } from "../../interfaces/RegisterServiceProvider";
import { RegisterServiceProvider } from "../../services/api_service";

const industries = ["Insurance", "Healthcare", "Finance"];

export default function ProviderRegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterAuth | null>(null);

  const handleChange = (k: string, v: string) => {
    setForm((prev: any) => ({ ...prev, [k]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // setLoading(true)
  
      const registerUser:RegisterAuth = {
        CompanyName: form!.CompanyName,
        RegistrationNumber: form!.RegistrationNumber,
        Email: form!.Email,
        PhoneNumber: form!.PhoneNumber,
        Password: form!.Password,
        Address: form!.Address,
        City: form!.City,
        ContactPersonName: form!.ContactPersonName,
        Country: form!.Country,
        LogoUrl: form!.LogoUrl,
        Industry: form!.Industry
      }

      const res = await RegisterServiceProvider(registerUser)
  
      if(res.status == 201){
        alert("User registered successfully")
        navigate('/')
        
        // setLoading(false)
        
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div className="w-full max-w-3xl p-6 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-semibold mb-6">Register Company</h1>

        <div>
          <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

            <Input label="Company Name" onChange={(v:string)=>{handleChange("CompanyName", v)}} />
          <Input label="Registration Number" onChange={(v:string)=>handleChange("RegistrationNumber", v)} />
          <Input label="Email" onChange={(v:string)=>handleChange("Email", v)} />
          <Input label="Phone Number" onChange={(v:string)=>handleChange("PhoneNumber", v)} />
          <Input label="Password" type="password" onChange={(v:string)=>handleChange("Password", v)} />
          <Input label="Address" onChange={(v:string)=>handleChange("Address", v)} />
          <Input label="City" onChange={(v:string)=>handleChange("City", v)} />
          <Input label="Country" onChange={(v:string)=>handleChange("Country", v)} />
          <Input label="Contact Person" onChange={(v:string)=>{handleChange("ContactPersonName", v)}} />
          <Input label="Logo URL" onChange={(v:string)=>handleChange("LogoUrl", v)} />

              {/* Industry */}
              <div>
                <label className="text-sm text-textSecondary">Industry</label>
                <select
                  onChange={(e)=>handleChange("Industry", e.target.value)}
                  className="input mt-1"
                >
                  {industries.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            <button className="btn-primary mt-6 w-full">Register</button>
          </form>
          </div>

          
        <p className="mt-4 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link 
            to="/provider/login" 
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
            Login
        </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Input({ label, type="text", onChange }: any) {
  return (
    <div>
      <label className="text-sm text-textSecondary">{label}</label>
      <input type={type} onChange={(e)=>onChange(e.target.value)} className="input mt-1" />
    </div>
  );
}