import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../theme.css";
import { IconCross, IconArrowRight, IconCheck, IconPin } from "../components/Icons";

function PatientCheckIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hospitalId = searchParams.get("hospital") || "";

  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const departments = [
    "General",
    "Cardiology",
    "Orthopaedics",
    "Gynaecology",
    "Paediatrics",
    "ENT",
  ];

  const handleCheckIn = () => {
    if (!department) {
      setError("Please select a department.");
      return;
    }

    navigate(
      "/queue/" +
        hospitalId +
        "?dept=" +
        department +
        "&token=7&wait=60"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body flex items-center justify-center p-6"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="w-full max-w-lg ticket overflow-hidden">
        <div className="p-9 text-center" style={{ background: "var(--teal-deep)", color: "var(--paper)" }}>
          <span
            className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <IconCross className="w-7 h-7" />
          </span>

          <h1 className="font-display text-3xl">Patient Check-In</h1>
          <p className="mt-2 text-sm" style={{ color: "#cfe3df" }}>
            Join the OPD queue in just a few clicks.
          </p>
        </div>

        <div className="p-8">
          <button
            onClick={() => navigate("/")}
            className="mb-6 font-body font-semibold text-sm transition-colors"
            style={{ color: "var(--teal)" }}
          >
            &larr; Back to Home
          </button>

          {hospitalId && (
            <div className="ticket-stub pl-3 py-2 mb-6 flex items-center gap-2 text-sm" style={{ borderLeftColor: "var(--teal)" }}>
              <IconPin className="w-4 h-4" style={{ color: "var(--teal)" }} />
              <span className="font-data" style={{ color: "var(--ink)" }}>
                Hospital ID: {hospitalId}
              </span>
            </div>
          )}

          <label className="block font-body font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>
            Select Department
          </label>

          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setError("");
            }}
            className="w-full font-body px-4 py-3 mb-4 bg-white border transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            <option value="">-- Select Department --</option>

            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {error && (
            <p className="text-sm mb-4 font-body" style={{ color: "var(--coral)" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleCheckIn}
            className="w-full inline-flex items-center justify-center gap-2 font-body font-semibold text-lg py-3.5 transition-colors"
            style={{ background: "var(--coral)", color: "#fff" }}
          >
            Join Queue <IconArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--line)" }}>
            <h3 className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--ink-soft)" }}>
              Why check in online
            </h3>

            <ul className="text-sm space-y-2.5" style={{ color: "var(--ink)" }}>
              {["Skip long hospital queues", "Live waiting time updates", "Faster patient check-in"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <IconCheck className="w-4 h-4 shrink-0" style={{ color: "var(--mint)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PatientCheckIn;