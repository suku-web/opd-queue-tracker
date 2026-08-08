import { motion } from "framer-motion";
import { useParams, useSearchParams } from "react-router-dom";
import "../theme.css";
import { EcgDivider } from "../components/Ecg";
import { IconUsers, IconClock } from "../components/Icons";

function LiveQueue() {
  const { hospitalId } = useParams();
  const [searchParams] = useSearchParams();

  const department = searchParams.get("dept") || "General";
  const tokenNumber = searchParams.get("token") || "7";
  const estimatedWait = searchParams.get("wait") || "60";

  const peopleAhead = Math.floor(Number(estimatedWait) / 10);

  return (
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
      </div>
    </motion.div>
  );
}

export default LiveQueue;