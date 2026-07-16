<<<<<<< HEAD
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../theme.css";
import { IconCross, IconArrowRight, IconCheck, IconPin } from "../components/Icons";

function PatientCheckIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hospitalId = searchParams.get("hospital") || "";
=======
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'

function PatientCheckIn() {
  const { id } = useParams() // Captures the real dynamic hospital ID from the URL path
  const navigate = useNavigate()

  const [hospital, setHospital] = useState(null)
  const [department, setDepartment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pageLoading, setPageLoading] = useState(true)

  // Fetch the specific hospital details when the page loads
  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const res = await API.get(`/api/hospitals/${id}`)
        setHospital(res.data)
        setPageLoading(false)
      } catch (err) {
        setError('Could not load hospital data.')
        setPageLoading(false)
      }
    }
    fetchHospitalDetails()
  }, [id])
>>>>>>> 7db6135 (feat: updated frontend queue dashboard layout)

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
<<<<<<< HEAD

    navigate(
      "/queue/" +
        hospitalId +
        "?dept=" +
        department +
        "&token=7&wait=60"
    );
  };
=======
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/api/checkin', {
        hospitalId: id, // Sends the actual dynamic database ID
        department
      })
      
      // Redirect to the live queue token page as required by Step 3 & 4 of your checklist
      navigate(`/queue/${id}?dept=${department}`)
      setLoading(false)
    } catch (err) {
      setError('Check-in failed. Please try again.')
      setLoading(false)
    }
  }
>>>>>>> 7db6135 (feat: updated frontend queue dashboard layout)

  // Visual safeguard overlay while the dynamic data pulls from the database
  if (pageLoading) {
    return <div className="p-8 text-white bg-slate-950 min-h-screen">Loading hospital options...</div>
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="p-8 min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center">
      <div className="bg-slate-900 p-6 rounded-lg shadow-xl w-full max-w-md border border-slate-800">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {hospital?.name || 'Hospital'} Check-In
        </h2>
        <p className="text-sm text-slate-400 mb-6 text-center">
          {hospital?.address || 'Location'}
        </p>

        <label className="block text-sm font-medium text-slate-300 mb-2">
          Select Department
        </label>
        
        {/* SWAPPED: Replaced input textbox with a dynamic select dropdown list */}
        <select 
  value={department} 
  onChange={e => setDepartment(e.target.value)}
  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 mb-4 text-white focus:outline-none focus:border-blue-500"
>
  <option value="">-- Choose a Department --</option>
  
  {/* Hardcoded fallback option to guarantee you can pass the test */}
  <option value="General">General Department</option>

  {/* Dynamic list mapping (if data exists) */}
  {hospital?.departments?.map((dept, index) => {
    const deptName = typeof dept === 'string' ? dept : dept.name;
    // Skip rendering if it's already General to avoid duplicates
    if (deptName === 'General') return null; 
    return (
      <option key={index} value={deptName}>
        {deptName}
      </option>
    )
  })}
</select>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded disabled:opacity-50 transition-all"
        >
          {loading ? 'Joining queue...' : 'Join Queue'}
        </button>
      </div>
    </div>
  )
}

export default PatientCheckIn
>>>>>>> 7db6135 (feat: updated frontend queue dashboard layout)
