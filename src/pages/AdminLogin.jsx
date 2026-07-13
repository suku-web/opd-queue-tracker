import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-purple-100 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white">

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏥</div>

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Login to manage hospital queues.
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📧 Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🔒 Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          onClick={() => {
            if (email && password) {
              navigate("/admin/dashboard");
            }
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
        >
          Login →
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Smart OPD Queue Tracker • Week 3
        </p>

      </div>
    </motion.div>
  );
}

export default AdminLogin;