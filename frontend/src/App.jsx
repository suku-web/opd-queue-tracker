<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientCheckIn from "./pages/PatientCheckin";
import LiveQueue from "./pages/LiveQueue";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
=======
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientCheckin from './pages/PatientCheckin'
import QueueDashboard from './pages/queuedashboard'
>>>>>>> 7db6135 (feat: updated frontend queue dashboard layout)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<<<<<<< HEAD
      <Route path="/checkin" element={<PatientCheckIn />} />
      <Route path="/queue/:hospitalId" element={<LiveQueue />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
=======
      <Route path="/hospital/:id" element={<PatientCheckin />} />
      <Route path="/queue/:id" element={<QueueDashboard />} />
>>>>>>> 7db6135 (feat: updated frontend queue dashboard layout)
    </Routes>
  );
}

export default App;