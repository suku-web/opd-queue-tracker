import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientCheckin from './pages/PatientCheckin'
import QueueDashboard from './pages/queuedashboard'

function App() {
  return (
    <Routes>
      {/* 1. Landing Homepage */}
      <Route path="/" element={<Home />} />

      {/* 2. Path parameter configuration */}
      <Route path="/hospital/:id" element={<PatientCheckin />} />

      {/* 3. Base check-in path */}
      <Route path="/checkin" element={<PatientCheckin />} />

      {/* 4. Live Queue Display Dashboard */}
      <Route path="/queue/:id" element={<QueueDashboard />} />
    </Routes>
  );
}

export default App;