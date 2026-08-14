import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import PatientCheckIn from './pages/PatientCheckin'
import LiveQueue from './pages/LiveQueue'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

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
    </Routes>
  )
}

export default App