import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../theme.css";
import { IconCross, IconMail, IconLock, IconArrowRight } from "../components/Icons";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body flex items-center justify-center p-6"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="w-full max-w-md ticket p-9">
        <div className="text-center mb-8">
          <span
            className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ background: "var(--teal-deep)", color: "var(--paper)" }}
          >
            <IconCross className="w-7 h-7" />
          </span>

          <h1 className="font-display text-3xl" style={{ color: "var(--ink)" }}>
            Admin Login
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>
            Welcome back. Login to manage hospital queues.
          </p>
        </div>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
            <IconMail className="w-4 h-4" /> Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-3 bg-white transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
            <IconLock className="w-4 h-4" /> Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 bg-white transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          />
        </div>

        <button
          onClick={() => {
            if (email && password) {
              navigate("/admin/dashboard");
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 font-semibold text-lg py-3.5 transition-colors"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--coral)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
        >
          Login <IconArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-xs font-data tracking-widest uppercase mt-7" style={{ color: "var(--ink-soft)" }}>
          Smart OPD Queue Tracker &middot; Week 3
        </p>
      </div>
    </motion.div>
  );
}

export default AdminLogin;