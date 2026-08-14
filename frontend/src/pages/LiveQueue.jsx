
import { useEffect, useState } from 'react'
import { useParams, useSearchParams }
  from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io(
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
)

function LiveQueue() {
  const { hospitalId }   = useParams()
  const [searchParams]   = useSearchParams()
  const department       = searchParams.get('dept') || 'General'
  const initialToken     = searchParams.get('token') || '?'
  const initialWait      = searchParams.get('wait')  || '?'

  const [queueCount, setQueueCount] = useState(
    Number(initialToken) || 0
  )
  const [waitTime, setWaitTime]     = useState(
    Number(initialWait)  || 0
  )

  useEffect(() => {
    console.log('LiveQueue Loaded')
    const roomId = hospitalId + '_' + department;
    console.log("joining room:",roomId);
    socket.emit('join_queue', roomId)

    socket.on('queue_updated', data => {
      setQueueCount(data.queueCount)
      setWaitTime(data.estimatedWait)
    })

    return () => {
      socket.off('queue_updated')
    }
  }, [hospitalId, department])

  return (
    <div className="min-h-screen bg-gray-50 flex
                    items-center justify-center p-6">
      <div className="bg-white rounded-xl border
                      border-gray-200 shadow-sm p-8
                      w-full max-w-md text-center">

        <div className="w-20 h-20 bg-blue-100 rounded-full
                        flex items-center justify-center
                        mx-auto mb-6">
          <span className="text-3xl font-bold text-blue-700">
            #{queueCount}
          </span>
        </div>

        <h1 className="text-2xl font-semibold
                      text-gray-800 mb-1">
          Your Token Number
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {department} · Hospital {hospitalId}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-gray-800">
              {Math.max(0, queueCount - 1)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              People ahead
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-orange-600">
              ~{waitTime}m
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Estimated wait
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center
                        gap-2 bg-green-50 border
                        border-green-200 rounded-lg p-3
                        text-sm text-green-700">
          <span className="w-2 h-2 bg-green-500 rounded-full
                          animate-pulse">
          </span>
          Live — updates automatically
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Stay in the hospital. You will be called by
          your token number.
        </p>
      </div>
    </div>
  )
}
export default LiveQueue
