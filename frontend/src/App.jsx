import { Routes, Route } from 'react-router-dom'
import Home           from './pages/Home'
import PatientCheckIn from './pages/PatientCheckin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkin" element={<PatientCheckIn />} />
    </Routes>
  )
}
export default App