import { useState } from 'react'
import { AlertTriangle, Shield, ChevronDown, Plus } from 'lucide-react'

const severityLevels = {
  critical: { label: 'Critical', color: 'bg-red-100 text-red-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  low: { label: 'Low', color: 'bg-blue-100 text-blue-800' }
}

const statuses = {
  open: { label: 'Open', color: 'bg-red-100 text-red-800' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' }
}

export default function Vulnerabilities() {
  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: 'VULN-2023-001',
      title: 'SQL Injection Vulnerability',
      severity: 'critical',
      status: 'open',
      cve: 'CVE-2023-12345',
      affectedSystem: 'Web Application',
      discovered: '2023-11-10',
      remediation: 'Parameterized queries'
    },
    {
      id: 'VULN-2023-002',
      title: 'XSS Vulnerability',
      severity: 'high',
      status: 'in_progress',
      cve: 'CVE-2023-23456',
      affectedSystem: 'Customer Portal',
      discovered: '2023-11-05',
      remediation: 'Input sanitization'
    },
    {
      id: 'VULN-2023-003',
      title: 'Outdated TLS Version',
      severity: 'medium',
      status: 'open',
      cve: 'CVE-2023-34567',
      affectedSystem: 'API Gateway',
      discovered: '2023-10-28',
      remediation: 'Upgrade to TLS 1.3'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [newVulnerability, setNewVulnerability] = useState({
    title: '',
    severity: 'medium',
    cve: '',
    affectedSystem: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewVulnerability(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newVuln = {
      ...newVulnerability,
      id: `VULN-${new Date().getFullYear()}-${(vulnerabilities.length + 1).toString().padStart(3, '0')}`,
      status: 'open',
      discovered: new Date().toISOString().split('T')[0],
      remediation: ''
    }
    setVulnerabilities([newVuln, ...vulnerabilities])
    setNewVulnerability({ title: '', severity: 'medium', cve: '', affectedSystem: '' })
    setShowForm(false)
  }

  const updateStatus = (id: string, newStatus: string) => {
    setVulnerabilities(vulnerabilities.map(vuln => 
      vuln.id === id ? { ...vuln, status: newStatus } : vuln
    ))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vulnerability Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus className="h-4 w-4" />
          <span>New Vulnerability</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">Report New Vulnerability</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newVulnerability.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  name="severity"
                  value={newVulnerability.severity}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVE ID</label>
                <input
                  type="text"
                  name="cve"
                  value={newVulnerability.cve}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="CVE-YYYY-NNNNN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affected System</label>
                <input
                  type="text"
                  name="affectedSystem"
                  value={newVulnerability.affectedSystem}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CVE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected System</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vulnerabilities.map(vuln => (
              <tr key={vuln.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vuln.title}</div>
                      <div className="text-sm text-gray-500">{vuln.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityLevels[vuln.severity].color}`}>
                    {severityLevels[vuln.severity].label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative group">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statuses[vuln.status].color}`}>
                      {statuses[vuln.status].label}
                    </span>
                    <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block">
                      <div className="py-1">
                        {Object.entries(statuses).map(([key, { label }]) => (
                          <button
                            key={key}
                            onClick={() => updateStatus(vuln.id, key)}
                            className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Change to {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vuln.cve || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vuln.affectedSystem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
