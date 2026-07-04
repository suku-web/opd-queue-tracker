import { useState } from 'react'
import API from '../api'

function PatientCheckIn() {
  const [department, setDepartment] = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const handleCheckIn = async () => {
    if (!department) {
      setError('Please select a department.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/api/checkin', {
        hospitalId: '1',
        department
      })
      alert(`Checked in! Token: ${res.data.tokenNumber}`)
      setLoading(false)
    } catch (err) {
      setError('Check-in failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <input 
        type="text" 
        placeholder="Department" 
        value={department} 
        onChange={e => setDepartment(e.target.value)}
        className="border p-2 mb-2 block"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Joining queue...' : 'Join Queue'}
      </button>
    </div>
  )
}
export default PatientCheckIn
