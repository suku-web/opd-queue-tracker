import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import API from "../api";

const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000"
);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"
    >

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
          </span>

        </div>
      </header>


      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Current Queue Status
        </h2>


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
          </p>

        </div>

      </main>

    </motion.div>
  );
}

export default AdminDashboard;