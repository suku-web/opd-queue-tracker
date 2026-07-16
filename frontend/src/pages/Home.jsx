import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import "../theme.css";
import { EcgDivider, PulseLoader } from "../components/Ecg";
import { IconCross, IconUsers, IconPin, IconArrowRight, IconAmbulance } from "../components/Icons";

function Home() {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/hospitals")
      .then((res) => {
        setHospitals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalDepartments = hospitals.reduce(
    (sum, hospital) => sum + hospital.departments.length,
    0
  );

  const totalPatients = hospitals.reduce(
    (sum, hospital) =>
      sum +
      hospital.departments.reduce(
        (s, d) => s + d.averageServiceMinutes,
        0
      ),
    0
  );

  // presentational helper: colors a department tag by its wait band — no data is changed
  const waitBand = (minutes) => {
    if (minutes > 30) return { color: "var(--coral)", label: "busy" };
    if (minutes > 15) return { color: "var(--amber)", label: "moderate" };
    return { color: "var(--mint)", label: "light" };
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex justify-center items-center font-body"
        style={{ background: "var(--paper)" }}
      >
        <PulseLoader label="Reading hospital vitals" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen font-body"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Navbar */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(246,243,236,0.88)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 flex items-center justify-center rounded-sm"
              style={{ background: "var(--teal)", color: "var(--paper)" }}
            >
              <IconCross className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl leading-none" style={{ color: "var(--ink)" }}>
                Smart OPD
              </h1>
              <p className="font-data text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "var(--ink-soft)" }}>
                Queue Management
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="font-body font-semibold text-sm px-5 py-2.5 border transition-colors"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ink)";
              e.currentTarget.style.color = "var(--paper)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink)";
            }}
          >
            Hospital Admin &rarr;
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-10">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 border overflow-hidden" style={{ borderColor: "var(--line)" }}>
          <div className="p-10 md:p-14" style={{ background: "var(--teal-deep)", color: "var(--paper)" }}>
            <span className="font-data text-xs tracking-[0.25em] uppercase status-live" style={{ color: "#f0b6ab" }}>
              Live across {hospitals.length} hospitals
            </span>

            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mt-5">
              Skip the queue.
              <br />
              Not the care.
            </h2>

            <p className="mt-6 text-lg leading-7" style={{ color: "#cfe3df" }}>
              Find a nearby hospital, check today's waiting time by
              department, and join the queue before you leave home.
            </p>

            <button
              className="mt-9 inline-flex items-center gap-2 font-body font-semibold px-7 py-3.5 transition-transform hover:translate-x-1"
              style={{ background: "var(--coral)", color: "#fff" }}
            >
              Explore Hospitals <IconArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div
            className="hidden lg:flex flex-col justify-center items-center gap-6 p-10"
            style={{ background: "var(--paper-2)" }}
          >
            <IconAmbulance className="w-20 h-20" style={{ color: "var(--teal)" }} />
            <div className="w-full max-w-xs">
              <EcgDivider color="var(--coral)" />
            </div>
            <p className="font-data text-xs tracking-widest uppercase text-center" style={{ color: "var(--ink-soft)" }}>
              Every token, tracked in real time
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 mt-10 border-t border-l" style={{ borderColor: "var(--line)" }}>
          {[
            { icon: <IconCross className="w-6 h-6" />, value: hospitals.length, label: "Hospitals", accent: "var(--teal)" },
            { icon: <IconUsers className="w-6 h-6" />, value: totalDepartments, label: "Departments", accent: "var(--mint)" },
            { icon: <IconUsers className="w-6 h-6" />, value: totalPatients, label: "Avg. Waiting Score", accent: "var(--coral)" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-8 border-r border-b"
              style={{ borderColor: "var(--line)", borderLeft: `3px solid ${stat.accent}` }}
            >
              <div style={{ color: stat.accent }}>{stat.icon}</div>
              <h3 className="font-data text-4xl font-semibold mt-4" style={{ color: "var(--ink)" }}>
                {stat.value}
              </h3>
              <p className="font-data text-xs tracking-[0.2em] uppercase mt-2" style={{ color: "var(--ink-soft)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
                Nearby Hospitals
              </h2>
              <p className="mt-2" style={{ color: "var(--ink-soft)" }}>
                Choose where you'd like to check in.
              </p>
            </div>
          </div>
          <EcgDivider color="var(--line)" className="mb-10" />

          <div className="grid lg:grid-cols-2 gap-8">
            {hospitals.map((hospital) => (
              <div
                key={hospital._id}
                onClick={() => navigate("/checkin?hospital=" + hospital._id)}
                className="ticket cursor-pointer transition-all duration-200 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-7" style={{ background: "var(--teal-deep)", color: "var(--paper)" }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-2xl">{hospital.name}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm" style={{ color: "#cfe3df" }}>
                        <IconPin className="w-4 h-4" /> {hospital.address}
                      </p>
                    </div>
                    <IconCross className="w-8 h-8 opacity-70 shrink-0" />
                  </div>
                </div>

                <div className="p-7">
                  <h4 className="font-data text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--ink-soft)" }}>
                    Departments
                  </h4>

                  <div className="flex flex-wrap gap-2.5">
                    {hospital.departments.map((dept) => {
                      const band = waitBand(dept.averageServiceMinutes);
                      return (
                        <span
                          key={dept.name}
                          className="ticket-stub pl-2.5 pr-3 py-1.5 text-xs font-body font-medium"
                          style={{ borderLeftColor: band.color, color: "var(--ink)" }}
                        >
                          {dept.name}
                          <span className="font-data ml-1.5" style={{ color: "var(--ink-soft)" }}>
                            {dept.averageServiceMinutes}m
                          </span>
                        </span>
                      );
                    })}
                  </div>

                  <button
                    className="w-full mt-8 py-3.5 font-body font-semibold transition-colors"
                    style={{ background: "var(--ink)", color: "var(--paper)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--coral)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
                  >
                    Check In &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default Home;