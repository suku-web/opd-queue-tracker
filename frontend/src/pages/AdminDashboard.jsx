import { useEffect, useState } from "react";
import { motion } from "framer-motion";
<<<<<<< HEAD
import { io } from "socket.io-client";
import API from "../api";

const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000"
);
=======
import "../theme.css";
import { EcgDivider } from "../components/Ecg";
import { IconCross, IconCheck } from "../components/Icons";
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8

function AdminDashboard() {
  const [queues, setQueues] = useState([
    { dept: "General", waiting: 12, token: 45 },
    { dept: "Cardiology", waiting: 4, token: 12 },
    { dept: "Orthopaedics", waiting: 7, token: 23 },
  ]);

  
  const hospitalId = "6a4e77e981f48df8f78949";

  // Socket.io real-time updates
  useEffect(() => {
    // Join Socket.io rooms
    queues.forEach((q) => {
      const roomId = hospitalId + "_" + q.dept;

      socket.emit("join_queue", roomId);

      console.log("Joined room:", roomId);
    });

    // Listen for queue updates
    const handleQueueUpdate = (data) => {
      console.log("Queue updated:", data);

      setQueues((prev) =>
        prev.map((q) => ({
          ...q,
          waiting:
            data.queueCount !== undefined
              ? data.queueCount
              : q.waiting,
        }))
      );
    };

    socket.on("queue_updated", handleQueueUpdate);

    // Cleanup
    return () => {
      socket.off("queue_updated", handleQueueUpdate);
    };
  }, []);

  // Get initial hospital data
  useEffect(() => {
    API.get("/api/hospitals")
      .then((res) => {
        console.log("Hospitals:", res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch hospitals:", err);
      });
  }, []);

  // Mark patient as served
  const handleMarkServed = async (checkInId, dept) => {
    try {
      await API.put(
        "/api/checkin/" + checkInId + "/served",
        {},
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Marked served:", dept);
    } catch (err) {
      console.error("Mark served failed:", err);
    }
  };

  const band = (waiting) => {
    if (waiting > 10) return { color: "var(--coral)", label: "Busy" };
    if (waiting > 5) return { color: "var(--amber)", label: "Moderate" };
    return { color: "var(--mint)", label: "Light" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
<<<<<<< HEAD

      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              🏥 Admin Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              KEM Hospital
            </p>
          </div>

          {/* LIVE INDICATOR */}
          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
            🟢 LIVE
=======
      <header style={{ background: "var(--teal-deep)", color: "var(--paper)" }}>
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
              <IconCross className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl leading-none">Admin Dashboard</h1>
              <p className="font-data text-xs mt-1.5" style={{ color: "#cfe3df" }}>
                KEM Hospital
              </p>
            </div>
          </div>

          <span
            className="font-data text-xs tracking-[0.2em] uppercase status-live px-3 py-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          >
            Live
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
          </span>

        </div>
      </header>


      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-6 py-10">
<<<<<<< HEAD

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
=======
        <h2 className="font-display text-3xl" style={{ color: "var(--ink)" }}>
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
          Current Queue Status
        </h2>
        <EcgDivider color="var(--line)" className="my-6 max-w-xs" />

<<<<<<< HEAD

        <div className="space-y-5">

          {queues.map((q, i) => (

            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 p-6"
            >

              <div className="flex justify-between items-center mb-5">

                <div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    🩺 {q.dept}
                  </h3>

                  <p className="text-gray-500">
                    Current Token #{q.token}
                  </p>

                </div>


                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    q.waiting > 10
                      ? "bg-red-100 text-red-700"
                      : q.waiting > 5
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  👥 {q.waiting} Waiting
                </span>

              </div>


              <button
                onClick={() => handleMarkServed("", q.dept)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-200 shadow-md"
              >
                ✅ Mark Served
              </button>

            </div>

          ))}

        </div>


        {/* INFO */}
        <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-5 rounded-xl">

          <h3 className="font-semibold text-blue-800 mb-2">
            🚀 Real-Time Updates
          </h3>

          <p className="text-blue-700 text-sm">
            Queue information updates automatically using
            Socket.io without refreshing the page.
=======
        <div className="space-y-5 overflow-x-auto">
          {queues.map((q, i) => {
            const b = band(q.waiting);
            return (
              <div
                key={i}
                className="ticket p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderLeft: `3px solid ${b.color}` }}
              >
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="font-display text-xl" style={{ color: "var(--ink)" }}>
                      {q.dept}
                    </h3>
                    <p className="font-data text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                      Current Token #{q.token}
                    </p>
                  </div>

                  <span
                    className="font-data text-xs tracking-[0.15em] uppercase px-3 py-2"
                    style={{ color: b.color, border: `1px solid ${b.color}` }}
                  >
                    {q.waiting} Waiting &middot; {b.label}
                  </span>
                </div>

                <button
                  className="w-full inline-flex items-center justify-center gap-2 font-semibold py-3 transition-colors"
                  style={{ background: "var(--mint)", color: "#fff" }}
                >
                  <IconCheck className="w-4 h-4" /> Mark Served
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-9 p-6 border" style={{ borderColor: "var(--line)", background: "var(--paper-2)" }}>
          <h3 className="font-data text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--teal)" }}>
            Coming Next
          </h3>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            Real-time Socket.io updates will automatically refresh queue
            information in Week 4.
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
          </p>

        </div>

      </main>

    </motion.div>
  );
}

export default AdminDashboard;