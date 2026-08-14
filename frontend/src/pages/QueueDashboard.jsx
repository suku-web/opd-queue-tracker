import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import API from '../api' // Import your Axios configuration helper

function QueueDashboard() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const dept = searchParams.get('dept') || 'General'

  const [tokenNumber, setTokenNumber] = useState('Loading...')
  const [currentServing, setCurrentServing] = useState('Calculating...')
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('Calculating...')

  useEffect(() => {
    // 1. Fetch initial state immediately via standard HTTP API
    const fetchInitialQueue = async () => {
      try {
        const res = await API.get(`/api/queues/${id}?dept=${dept}`)
        if (res.data) {
          setTokenNumber(res.data.tokenNumber || 'OPD-000')
          setCurrentServing(res.data.currentServing || 'OPD-000')
          setEstimatedWaitTime(res.data.waitTime || '0 Mins')
        }
      } catch (err) {
        console.error("Failed to load initial queue via HTTP, waiting for socket...")
      }
    }
    
    fetchInitialQueue()

    // 2. Establish connection to Sidhee's socket server for real-time changes
    const socket = io('http://localhost:5000')

    socket.emit('joinDepartmentQueue', { hospitalId: id, department: dept })

    socket.on('queueUpdate', (data) => {
      if (data) {
        setTokenNumber(data.tokenNumber)
        setCurrentServing(data.currentServing)
        setEstimatedWaitTime(data.waitTime)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [id, dept])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="inline-block px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
          📡 Live Connected Queue
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-blue-500">{dept} Department</h1>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-400 uppercase mb-2">Your Live Token</p>
          <p className="text-6xl font-black text-white my-2">{tokenNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Now Serving</p>
            <p className="text-xl font-bold text-emerald-400">{currentServing}</p>
          </div>
          <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Live Wait Time</p>
            <p className="text-xl font-bold text-amber-400">{estimatedWaitTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueDashboard