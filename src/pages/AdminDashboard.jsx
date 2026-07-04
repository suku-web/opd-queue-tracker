function AdminDashboard() {
  const queues = [
    { dept: 'General', waiting: 12, token: 45 },
    { dept: 'Cardiology', waiting: 4, token: 12 },
    { dept: 'Orthopaedics', waiting: 7, token: 23 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard — KEM Hospital
          </h1>

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            🔴 Live
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Current Queue Status
        </h2>

        {queues.map((q, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 mb-3"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">
                {q.dept}
              </h3>

              <span className="text-sm text-gray-400">
                Token #{q.token}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`text-2xl font-bold ${
                  q.waiting > 10
                    ? 'text-red-600'
                    : q.waiting > 5
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {q.waiting} waiting
              </span>

              <button className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700">
                Mark Served ✓
              </button>
            </div>
          </div>
        ))}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-sm text-blue-700">
          Real-time Socket.io updates connect in Week 4.
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard