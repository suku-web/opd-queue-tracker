import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-purple-100 flex justify-center items-center">

        <div className="text-center">

          <div className="w-24 h-24 rounded-full border-[10px] border-blue-200 border-t-blue-600 animate-spin mx-auto"></div>

          <h1 className="text-3xl font-bold mt-8 text-slate-700">
            Loading Smart Hospital...
          </h1>

          <p className="text-gray-500 mt-2">
            Fetching Live Hospital Data
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-100">

      {/* Navbar */}

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b shadow-sm">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <div>

            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">

              🏥 Smart OPD

            </h1>

            <p className="text-gray-500">
              Hospital Queue Management
            </p>

          </div>

          <button

            onClick={() => navigate("/admin")}

            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-2xl font-semibold shadow-xl hover:scale-105 transition"

          >

            Hospital Admin →

          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Hero */}

        <div className="rounded-[35px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 shadow-2xl overflow-hidden">

          <div className="grid lg:grid-cols-2">

            <div className="p-14 text-white">

              <h2 className="text-6xl font-black leading-tight">

                Skip
                <br />
                Long Queues.

              </h2>

              <p className="text-blue-100 mt-6 text-xl leading-8">

                Find nearby hospitals,
                check waiting time,
                and join the queue online.

              </p>

              <button
                className="mt-8 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                Explore Hospitals
              </button>

            </div>

            <div className="hidden lg:flex justify-center items-center">

              <div className="text-[180px]">
                🏥
              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-3">🏥</div>

            <h3 className="text-4xl font-extrabold text-blue-600">
              {hospitals.length}
            </h3>

            <p className="text-gray-500 mt-2">
              Hospitals
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-3">🩺</div>

            <h3 className="text-4xl font-extrabold text-green-600">
              {totalDepartments}
            </h3>

            <p className="text-gray-500 mt-2">
              Departments
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-3">👥</div>

            <h3 className="text-4xl font-extrabold text-purple-600">
              {totalPatients}
            </h3>

            <p className="text-gray-500 mt-2">
              Avg Waiting Score
            </p>
          </div>
        </div>

      <div className="mt-14">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-4xl font-bold text-slate-800">
              Nearby Hospitals
            </h2>

            <p className="text-gray-500 mt-2">
              Choose the best hospital for your visit.
            </p>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {hospitals.map((hospital) => (

            <div
              key={hospital._id}
              onClick={() =>
                navigate("/checkin?hospital=" + hospital._id)
              }
              className="cursor-pointer rounded-[30px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >

              <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-8 text-white">

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-3xl font-bold">
                      🏥 {hospital.name}
                    </h3>

                    <p className="mt-3 text-blue-100">
                      📍 {hospital.address}
                    </p>

                  </div>

                  <div className="text-6xl">
                    🚑
                  </div>

                </div>

              </div>

              <div className="p-8">

                <h4 className="font-bold text-lg mb-5">
                  Departments
                </h4>

                <div className="flex flex-wrap gap-3">
                              {hospital.departments.map((dept, index) => {
                  const colors = [
                    "bg-green-100 text-green-700",
                    "bg-blue-100 text-blue-700",
                    "bg-pink-100 text-pink-700",
                    "bg-yellow-100 text-yellow-700",
                    "bg-purple-100 text-purple-700",
                  ];

                  return (
                    <span
                      key={dept.name}
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        colors[index % colors.length]
                      }`}
                    >
                      {dept.name} • {dept.averageServiceMinutes} min
                    </span>
                  );
                })}
              </div>

              <button
                className="w-full mt-8 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-xl"
              >
                Check In →
              </button>

            </div>

          </div>

          ))}

        </div>

      </div>

      </main>

    </div>

  );
}

export default Home;    