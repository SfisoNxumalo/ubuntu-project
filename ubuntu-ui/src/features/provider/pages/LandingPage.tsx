import { motion } from "framer-motion";
import { EyeOff, Brain, Upload, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">

      {/* 🔥 HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold max-w-4xl"
        >
          Making Documents Accessible for Everyone
        </motion.h1>

        <p className="mt-6 text-lg text-textSecondary max-w-2xl">
          We empower visually impaired individuals by transforming complex documents into simple, understandable summaries using AI.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl bg-primary text-white"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/provider/register")}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10"
          >
            For Providers
          </button>
        </div>
      </section>

      {/* 🚨 PROBLEM */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          The Problem
        </h2>

        <div className="max-w-3xl mx-auto text-textSecondary">
          <p>
            Millions of visually impaired individuals struggle daily to access important documents such as bank statements, medical reports, and insurance policies.
          </p>
          <p className="mt-4">
            These documents are often complex, lengthy, and not optimized for accessibility, creating barriers to independence and informed decision-making.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <EyeOff size={60} className="text-primary opacity-70" />
        </div>
      </section>

      {/* 💡 SOLUTION */}
      <section className="py-20 px-6 bg-white/5 border-y border-white/10 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Our Solution
        </h2>

        <p className="max-w-3xl mx-auto text-textSecondary">
          Our platform enables service providers to upload documents which are instantly summarized using AI, making them easy to understand and accessible for visually impaired users.
        </p>

        <div className="mt-10 flex justify-center">
          <Brain size={60} className="text-primary" />
        </div>
      </section>

      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
            Our Purpose
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* 🎯 Mission */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
            <h3 className="text-xl font-semibold mb-3 text-primary">
                Our Mission
            </h3>
            <p className="text-sm text-textSecondary leading-relaxed">
                To empower visually impaired individuals by transforming inaccessible documents into clear, understandable, and interactive information using AI.
            </p>
            </motion.div>

            {/* 🔭 Vision */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
            <h3 className="text-xl font-semibold mb-3 text-primary">
                Our Vision
            </h3>
            <p className="text-sm text-textSecondary leading-relaxed">
                To create a world where access to information is not limited by ability, enabling full independence and inclusion for visually impaired individuals.
            </p>
            </motion.div>

            {/* 💎 Values */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
            <h3 className="text-xl font-semibold mb-3 text-primary">
                Our Values
            </h3>
            <ul className="text-sm text-textSecondary space-y-2">
                <li>• Accessibility first</li>
                <li>• Human-centered design</li>
                <li>• Innovation through AI</li>
                <li>• Trust and security</li>
            </ul>
            </motion.div>

        </div>
        </section>

      {/* ⚙️ HOW IT WORKS */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <Card icon={Upload} title="Upload Document">
            Providers upload documents securely.
          </Card>

          <Card icon={Brain} title="AI Summarization">
            AI generates simplified summaries instantly.
          </Card>

          <Card icon={Users} title="User Access">
            Users receive and interact with documents.
          </Card>

        </div>
      </section>

      {/* ✨ FEATURES */}
      <section className="py-20 px-6 bg-white/5 border-y border-white/10">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <Feature title="AI-Powered Summaries">
            Simplifies complex documents instantly.
          </Feature>

          <Feature title="Voice Interaction">
            Ask questions and listen to summaries.
          </Feature>

          <Feature title="Secure Access Control">
            Users control which providers can send documents.
          </Feature>

        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Start Making Documents Accessible Today
        </h2>

        <button
          onClick={() => navigate("/register")}
          className="px-8 py-4 rounded-xl bg-primary text-white text-lg"
        >
          Create Account
        </button>
      </section>

    </div>
  );
}


function Card({ icon: Icon, title, children }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
    >
      <Icon className="mx-auto mb-4 text-primary" size={28} />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-textSecondary">{children}</p>
    </motion.div>
  );
}


function Feature({ title, children }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-textSecondary">{children}</p>
    </div>
  );
}