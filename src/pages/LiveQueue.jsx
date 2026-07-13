import { motion } from "framer-motion";
import { useParams, useSearchParams } from "react-router-dom";

function LiveQueue() {
  const { hospitalId } = useParams();
  const [searchParams] = useSearchParams();

  const department = searchParams.get("dept") || "General";
  const tokenNumber = searchParams.get("token") || "7";
  const estimatedWait = searchParams.get("wait") || "60";

  const peopleAhead = Math.floor(Number(estimatedWait) / 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-center text-white">

          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl mb-5">

            <span className="text-4xl font-black text-blue-700">
              #{tokenNumber}
            </span>

          </div>

          <h1 className="text-3xl font-bold">
            Your Queue Token
          </h1>

          <p className="text-blue-100 mt-2">
            {department} • Hospital {hospitalId}
          </p>

        </div>

        <div className="p-8">

          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>

          <div className="grid grid-cols-2 gap-5">

            <div className="bg-green-50 rounded-2xl p-6 text-center shadow">

              <div className="text-4xl mb-2">👥</div>

              <h2 className="text-3xl font-bold text-green-700">
                {peopleAhead}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                People Ahead
              </p>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6 text-center shadow">

              <div className="text-4xl mb-2">⏳</div>

              <h2 className="text-3xl font-bold text-orange-600">
                ~{estimatedWait} min
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Estimated Wait
              </p>

            </div>

          </div>

          <div className="mt-8 bg-blue-100 border border-blue-300 rounded-2xl p-5 text-center">

            <h3 className="font-bold text-blue-700 text-lg">
              Live Queue Status
            </h3>

            <p className="text-blue-600 mt-2">
              🔴 Real-time updates will be connected in Week 4.
            </p>

          </div>

          <div className="mt-6 bg-purple-50 rounded-2xl p-5 text-center">

            <p className="text-gray-700">
              Please stay near the hospital.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              You will be called when your token number appears.
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default LiveQueue;