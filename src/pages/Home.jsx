import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const hospitals = [
    {
      id: '1',
      name: 'KEM Hospital',
      area: 'Parel',
      queues: {
        Cardiology: 4,
        General: 12,
        Ortho: 2
      }
    },
    {
      id: '2',
      name: 'Sion Hospital',
      area: 'Sion',
      queues: {
        Cardiology: 7,
        General: 3,
        Ortho: 9
      }
    },
    {
      id: '3',
      name: 'Nair Hospital',
      area: 'Mumbai Central',
      queues: {
        Cardiology: 1,
        General: 15,
        Ortho: 5
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            OPD Queue Tracker
          </h1>

          <button
            onClick={() => navigate('/admin')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Hospital Admin →
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Check OPD wait times before you arrive
          </h2>

          <p className="text-gray-500">
            Live queue data from government hospitals.
          </p>
        </div>

        <div className="bg-gray-200 rounded-xl h-48 mb-8 flex items-center justify-center">
          <p className="text-gray-400 text-sm">
            🗺️ Google Maps — added in Week 5
          </p>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Nearby Hospitals
        </h3>

        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            onClick={() => navigate('/checkin?hospital=' + hospital.id)}
            className="bg-white border border-gray-200 rounded-xl p-5 mb-3 cursor-pointer hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">

              <div>
                <h4 className="font-semibold text-gray-800">
                  {hospital.name}
                </h4>

                <p className="text-sm text-gray-400">
                  {hospital.area}
                </p>
              </div>

              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">
                Check In
              </button>

            </div>

            <div className="flex gap-3 flex-wrap">

              {Object.entries(hospital.queues).map(([dept, count]) => (
                <span
                  key={dept}
                  className={`text-xs px-3 py-1 rounded-full ${
                    count > 10
                      ? 'bg-red-100 text-red-700'
                      : count > 5
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {dept}: {count} waiting
                </span>
              ))}

            </div>

          </div>
        ))}

      </main>

    </div>
  )
}

export default Home