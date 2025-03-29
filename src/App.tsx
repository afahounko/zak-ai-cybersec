import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Incidents from './pages/Incidents'
import RiskManagement from './pages/RiskManagement'
import Infrastructure from './pages/Infrastructure'
import Vulnerabilities from './pages/Vulnerabilities'
import Compliance from './pages/Compliance'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/risk-management" element={<RiskManagement />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}
