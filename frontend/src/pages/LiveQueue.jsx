<<<<<<< HEAD

import { useEffect, useState } from 'react'
import { useParams, useSearchParams }
  from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io(
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
)
=======
import { motion } from "framer-motion";
import { useParams, useSearchParams } from "react-router-dom";
import "../theme.css";
import { EcgDivider } from "../components/Ecg";
import { IconUsers, IconClock } from "../components/Icons";
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8

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
<<<<<<< HEAD
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
=======
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body flex items-center justify-center p-6"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="w-full max-w-lg ticket overflow-hidden">
        <div className="p-9 text-center" style={{ background: "var(--teal-deep)", color: "var(--paper)" }}>
          <motion.div
  key={tokenNumber}
  initial={{ scale: 1.2 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.3 }}
  className="w-28 h-28 mx-auto flex items-center justify-center mb-5 border-2"
  style={{
    borderColor: "rgba(255,255,255,0.35)",
    background: "rgba(255,255,255,0.06)",
  }}
>
  <span className="font-data text-4xl font-semibold">
    #{tokenNumber}
  </span>
</motion.div>

          <h1 className="font-display text-3xl">Your Queue Token</h1>
          <p className="mt-2 text-sm" style={{ color: "#cfe3df" }}>
            {department} &middot; Hospital {hospitalId}
          </p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-40">
              <EcgDivider color="var(--coral)" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="ticket-stub pl-4 py-5 text-center" style={{ borderLeftColor: "var(--mint)" }}>
              <IconUsers className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--mint)" }} />
              <h2 className="font-data text-3xl font-semibold" style={{ color: "var(--ink)" }}>
                {peopleAhead}
              </h2>
              <p className="font-data text-xs tracking-[0.15em] uppercase mt-2" style={{ color: "var(--ink-soft)" }}>
                People Ahead
              </p>
            </div>

            <div className="ticket-stub pl-4 py-5 text-center" style={{ borderLeftColor: "var(--amber)" }}>
              <IconClock className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--amber)" }} />
              <h2 className="font-data text-3xl font-semibold" style={{ color: "var(--ink)" }}>
                ~{estimatedWait}m
              </h2>
              <p className="font-data text-xs tracking-[0.15em] uppercase mt-2" style={{ color: "var(--ink-soft)" }}>
                Estimated Wait
              </p>
            </div>
          </div>

          <div
  className="flex items-center justify-center gap-2 mt-8 p-3 border rounded-lg"
  style={{
    borderColor: "var(--line)",
    background: "var(--paper-2)",
    color: "var(--coral)",
  }}
>
  <span className="w-2 h-2 rounded-full animate-pulse bg-red-500"></span>
  <span className="font-data text-xs tracking-[0.15em] uppercase">
    Live — updates automatically
  </span>
</div>

          <div className="mt-5 p-5 text-center" style={{ background: "var(--paper-2)" }}>
            <p style={{ color: "var(--ink)" }}>Please stay near the hospital.</p>
            <p className="text-sm mt-2" style={{ color: "var(--ink-soft)" }}>
              You will be called when your token number appears.
            </p>
          </div>
        </div>
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
      </div>
    </div>
  )
}
export default LiveQueue
