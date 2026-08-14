import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function PatientCheckIn() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState(null);
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const res = await API.get(`/api/hospitals/${id}`);
        setHospital(res.data);
      } catch (err) {
        setError('Could not load hospital data.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  const handleCheckIn = async () => {
    if (!department) {
      setError('Please select a department.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await API.post('/api/checkin', {
        hospitalId: id,
        department,
      });

      navigate(`/queue/${id}?dept=${department}`);
    } catch (err) {
      setError('Check-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="p-8 min-h-screen bg-slate-950 text-white">
        Loading hospital options...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center">
      <div className="bg-slate-900 p-6 rounded-lg shadow-xl w-full max-w-md border border-slate-800">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {hospital?.name || 'Hospital'} Check-In
        </h2>

        <p className="text-sm text-slate-400 mb-6 text-center">
          {hospital?.address || 'Location'}
        </p>

        <label className="block text-sm font-medium text-slate-300 mb-2">
          Select Department
        </label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 mb-4 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">-- Choose a Department --</option>

          <option value="General">General Department</option>

          {hospital?.departments?.map((dept, index) => {
            const deptName = typeof dept === 'string' ? dept : dept.name;

            if (deptName === 'General') return null;

            return (
              <option key={index} value={deptName}>
                {deptName}
              </option>
            );
          })}
        </select>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded disabled:opacity-50 transition-all"
        >
          {loading ? 'Joining queue...' : 'Join Queue'}
        </button>
      </div>
    </div>
  );
}

export default PatientCheckIn;