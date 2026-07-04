import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-sm">

        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Hospital Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={() => {
            if (email && password)
              navigate('/admin/dashboard')
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default AdminLogin