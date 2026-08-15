import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

import "../theme.css";
import { EcgDivider } from "../components/Ecg";
import { IconUsers, IconClock } from "../components/Icons";

const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000"
);

function LiveQueue() {
  const { hospitalId } = useParams();
  const [searchParams] = useSearchParams();

  const department = searchParams.get("dept") || "General";
  const initialToken = searchParams.get("token") || "0";
  const initialWait = searchParams.get("wait") || "0";

  const [queueCount, setQueueCount] = useState(
    Number(initialToken) || 0
  );

  const [waitTime, setWaitTime] = useState(
    Number(initialWait) || 0
  );

  useEffect(() => {
    console.log("LiveQueue Loaded");

    const roomId = hospitalId + "_" + department;

    console.log("Joining room:", roomId);

    socket.emit("join_queue", roomId);

    const handleQueueUpdate = (data) => {
      console.log("Queue updated:", data);

      if (data.queueCount !== undefined) {
        setQueueCount(Number(data.queueCount));
      }

      if (data.estimatedWait !== undefined) {
        setWaitTime(Number(data.estimatedWait));
      }
    };

    socket.on("queue_updated", handleQueueUpdate);

    return () => {
      socket.off("queue_updated", handleQueueUpdate);
    };
  }, [hospitalId, department]);

  const tokenNumber = queueCount;
  const peopleAhead = Math.max(0, queueCount - 1);
  const estimatedWait = waitTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body flex items-center justify-center p-6"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <div className="w-full max-w-lg ticket overflow-hidden">

        {/* HEADER */}
        <div
          className="p-9 text-center"
          style={{
            background: "var(--teal-deep)",
            color: "var(--paper)",
          }}
        >
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

          <h1 className="font-display text-3xl">
            Your Queue Token
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: "#cfe3df" }}
          >
            {department} &middot; Hospital {hospitalId}
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          {/* ECG DIVIDER */}
          <div className="flex justify-center mb-6">
            <div className="w-40">
              <EcgDivider color="var(--coral)" />
            </div>
          </div>

          {/* QUEUE INFORMATION */}
          <div className="grid grid-cols-2 gap-5">

            {/* PEOPLE AHEAD */}
            <div
              className="ticket-stub pl-4 py-5 text-center"
              style={{
                borderLeftColor: "var(--mint)",
              }}
            >
              <IconUsers
                className="w-6 h-6 mx-auto mb-2"
                style={{ color: "var(--mint)" }}
              />

              <h2
                className="font-data text-3xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {peopleAhead}
              </h2>

              <p
                className="font-data text-xs tracking-[0.15em] uppercase mt-2"
                style={{ color: "var(--ink-soft)" }}
              >
                People Ahead
              </p>
            </div>

            {/* ESTIMATED WAIT */}
            <div
              className="ticket-stub pl-4 py-5 text-center"
              style={{
                borderLeftColor: "var(--amber)",
              }}
            >
              <IconClock
                className="w-6 h-6 mx-auto mb-2"
                style={{ color: "var(--amber)" }}
              />

              <h2
                className="font-data text-3xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                ~{estimatedWait}m
              </h2>

              <p
                className="font-data text-xs tracking-[0.15em] uppercase mt-2"
                style={{ color: "var(--ink-soft)" }}
              >
                Estimated Wait
              </p>
            </div>
          </div>

          {/* LIVE STATUS */}
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
              Live &mdash; updates automatically
            </span>
          </div>

          {/* INFORMATION */}
          <div
            className="mt-5 p-5 text-center"
            style={{
              background: "var(--paper-2)",
            }}
          >
            <p style={{ color: "var(--ink)" }}>
              Please stay near the hospital.
            </p>

            <p
              className="text-sm mt-2"
              style={{ color: "var(--ink-soft)" }}
            >
              You will be called when your token number appears.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LiveQueue;