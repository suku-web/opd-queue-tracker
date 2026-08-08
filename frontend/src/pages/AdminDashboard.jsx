import { motion } from "framer-motion";
import "../theme.css";
import { EcgDivider } from "../components/Ecg";
import { IconCross, IconCheck } from "../components/Icons";

function AdminDashboard() {
  const queues = [
    { dept: "General", waiting: 12, token: 45 },
    { dept: "Cardiology", waiting: 4, token: 12 },
    { dept: "Orthopaedics", waiting: 7, token: 23 },
  ];

  const band = (waiting) => {
    if (waiting > 10) return { color: "var(--coral)", label: "Busy" };
    if (waiting > 5) return { color: "var(--amber)", label: "Moderate" };
    return { color: "var(--mint)", label: "Light" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <header style={{ background: "var(--teal-deep)", color: "var(--paper)" }}>
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
              <IconCross className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl leading-none">Admin Dashboard</h1>
              <p className="font-data text-xs mt-1.5" style={{ color: "#cfe3df" }}>
                KEM Hospital
              </p>
            </div>
          </div>

          <span
            className="font-data text-xs tracking-[0.2em] uppercase status-live px-3 py-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          >
            Live
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="font-display text-3xl" style={{ color: "var(--ink)" }}>
          Current Queue Status
        </h2>
        <EcgDivider color="var(--line)" className="my-6 max-w-xs" />

        <div className="space-y-5">
          {queues.map((q, i) => {
            const b = band(q.waiting);
            return (
              <div
                key={i}
                className="ticket p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderLeft: `3px solid ${b.color}` }}
              >
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="font-display text-xl" style={{ color: "var(--ink)" }}>
                      {q.dept}
                    </h3>
                    <p className="font-data text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                      Current Token #{q.token}
                    </p>
                  </div>

                  <span
                    className="font-data text-xs tracking-[0.15em] uppercase px-3 py-2"
                    style={{ color: b.color, border: `1px solid ${b.color}` }}
                  >
                    {q.waiting} Waiting &middot; {b.label}
                  </span>
                </div>

                <button
                  className="w-full inline-flex items-center justify-center gap-2 font-semibold py-3 transition-colors"
                  style={{ background: "var(--mint)", color: "#fff" }}
                >
                  <IconCheck className="w-4 h-4" /> Mark Served
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-9 p-6 border" style={{ borderColor: "var(--line)", background: "var(--paper-2)" }}>
          <h3 className="font-data text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--teal)" }}>
            Coming Next
          </h3>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            Real-time Socket.io updates will automatically refresh queue
            information in Week 4.
          </p>
        </div>
      </main>
    </motion.div>
  );
}

export default AdminDashboard;