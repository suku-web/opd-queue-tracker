import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import PatientCheckIn from './pages/PatientCheckIn'
import LiveQueue from './pages/LiveQueue'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import QueueDashboard from './pages/QueueDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/checkin" element={<PatientCheckIn />} />

      <Route
        path="/hospital/:id"
        element={<PatientCheckIn />}
      />

      <Route
        path="/queue/:hospitalId"
        element={<LiveQueue />}
      />

      <Route
        path="/queue-dashboard/:id"
        element={<QueueDashboard />}
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
    </Routes>
  )
}

export default App