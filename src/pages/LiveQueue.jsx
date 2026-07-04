import { useParams, useSearchParams } from 'react-router-dom'

function LiveQueue() {
  const { hospitalId } = useParams()
  const [searchParams] = useSearchParams()

  const department = searchParams.get('dept') || 'General'
  const tokenNumber = searchParams.get('token') || '7'
  const estimatedWait = searchParams.get('wait') || '60'

  const peopleAhead = Math.floor(Number(estimatedWait) / 10)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-md text-center">

        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-blue-700">
            #{tokenNumber}
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Your Token Number
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          {department} · Hospital {hospitalId}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-gray-800">
              {peopleAhead}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              People ahead
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-orange-600">
              ~{estimatedWait}m
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Estimated wait
            </p>
          </div>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Live updates connect in Week 4
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Stay in the hospital. You will be called by your token number.
        </p>

      </div>

    </div>
  )
}

export default LiveQueue