import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function PatientCheckIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const hospitalId = searchParams.get('hospital') || ''

  const [department, setDepartment] = useState('')
  const [error, setError] = useState('')

  const departments = [
    'General',
    'Cardiology',
    'Orthopaedics',
    'Gynaecology',
    'Paediatrics',
    'ENT'
  ]

  const handleCheckIn = () => {
    if (!department) {
      setError('Please select a department.')
      return
    }

    navigate(
      '/queue/' +
      hospitalId +
      '?dept=' +
      department +
      '&token=7&wait=60'
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-md">

        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 mb-6 block"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Patient Check-In
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Select your department to join the queue.
        </p>

        {hospitalId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-700">
            Hospital: {hospitalId}
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department
        </label>

        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value)
            setError('')
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 mb-4 focus:outline-none focus:border-blue-500"
        >
          <option value="">-- Select department --</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleCheckIn}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Join Queue
        </button>

      </div>

    </div>
  )
}

export default PatientCheckIn