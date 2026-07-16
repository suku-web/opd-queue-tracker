import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientCheckin from './pages/PatientCheckin'
import QueueDashboard from './pages/queuedashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hospital/:id" element={<PatientCheckin />} />
      <Route path="/queue/:id" element={<QueueDashboard />} />
    </Routes>
  );
}

export default App;