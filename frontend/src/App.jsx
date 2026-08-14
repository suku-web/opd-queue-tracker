import { Routes, Route } from 'react-router-dom'
<<<<<<< HEAD

import Home from './pages/Home'
import PatientCheckIn from './pages/PatientCheckin'
import LiveQueue from './pages/LiveQueue'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
=======
import Home from './pages/Home'
import PatientCheckin from './pages/PatientCheckin'
import QueueDashboard from './pages/QueueDashboard'
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8

function App() {
  return (
    <Routes>
      {/* 1. Landing Homepage */}
      <Route path="/" element={<Home />} />

<<<<<<< HEAD
      <Route
        path="/checkin"
        element={<PatientCheckIn />}
      />

      <Route
        path="/queue/:hospitalId"
        element={<LiveQueue />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
=======
      {/* 2. Path parameter configuration */}
      <Route path="/hospital/:id" element={<PatientCheckin />} />

      {/* 3. Base check-in path */}
      <Route path="/checkin" element={<PatientCheckin />} />

      {/* 4. Live Queue Display Dashboard */}
      <Route path="/queue/:id" element={<QueueDashboard />} />
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
    </Routes>
  );
}

<<<<<<< HEAD
export default App
=======
export default App;
>>>>>>> 2ef0391f2163817341cbf271da7e7b0f92ffcfc8
