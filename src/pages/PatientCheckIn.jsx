import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white text-center">

          <div className="text-6xl mb-3">
            🏥
          </div>

          <h1 className="text-3xl font-bold">
            Patient Check-In
          </h1>

          <p className="text-blue-100 mt-2">
            Join the OPD queue in just a few clicks.
          </p>

        </div>

        <div className="p-8">

          <button
            onClick={() => navigate("/")}
            className="mb-6 text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            ← Back to Home
          </button>

          {hospitalId && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-700 font-medium">
                🏥 Hospital ID: {hospitalId}
              </p>
            </div>
          )}

          <label className="block font-semibold text-gray-700 mb-2">
            Select Department
          </label>

          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setError("");
            }}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Department --</option>

            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {error && (
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleCheckIn}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-all duration-200"
          >
            Join Queue →
          </button>

          <div className="mt-8 bg-green-50 rounded-xl p-4 border border-green-200">

            <h3 className="font-semibold text-green-700 mb-2">
              ✔ Benefits
            </h3>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Skip long hospital queues</li>
              <li>• Live waiting time updates</li>
              <li>• Faster patient check-in</li>
            </ul>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default PatientCheckIn;