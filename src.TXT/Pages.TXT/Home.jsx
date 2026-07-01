import { useState, useEffect } from 'react'
import API from '../api'

function Home() {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')

  useEffect(() => {
    API.get('/api/hospitals')
      .then(res => {
        setHospitals(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load hospitals. Please try again.')
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8 text-gray-500">Loading hospitals...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>

  return (
    <div className="p-8">
      {hospitals.map(h => (
        <div key={h._id} className="p-4 border mb-2 rounded">
          <h4 className="font-bold">{h.name}</h4>
          <p>{h.address}</p>
        </div>
      ))}
    </div>
  )
}
export default Home