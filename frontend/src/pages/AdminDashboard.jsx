import { motion } from "framer-motion";

function AdminDashboard() {
  const queues = [
    { dept: "General", waiting: 12, token: 45 },
    { dept: "Cardiology", waiting: 4, token: 12 },
    { dept: "Orthopaedics", waiting: 7, token: 23 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"
    >
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              🏥 Admin Dashboard
            </h1>
            <p className="text-blue-100 text-sm">
              KEM Hospital
            </p>
          </div>

          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
            🟢 LIVE
          </span>
        </div>
      </header>

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

              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-200 shadow-md">
                ✅ Mark Served
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-5 rounded-xl">
          <h3 className="font-semibold text-blue-800 mb-2">
            🚀 Coming Next
          </h3>

          <p className="text-blue-700 text-sm">
            Real-time Socket.io updates will automatically refresh queue
            information in Week 4.
          </p>
        </div>
      </main>
    </motion.div>
  );
}

export default AdminDashboard;