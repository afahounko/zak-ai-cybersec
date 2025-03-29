import { useState } from 'react'
import { AlertTriangle, Check, Clock, X, Plus, FileText, AlertCircle, ChevronDown } from 'lucide-react'

const statuses = {
  open: { label: 'Open', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: Check },
  pending: { label: 'Pending Review', color: 'bg-blue-100 text-blue-800', icon: FileText }
}

const severities = {
  critical: { label: 'Critical', color: 'bg-red-100 text-red-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  low: { label: 'Low', color: 'bg-blue-100 text-blue-800' }
}

export default function Incidents() {
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-2023-001',
      title: 'Unauthorized access attempt',
      status: 'open',
      severity: 'critical',
      source: 'Firewall logs',
      createdBy: 'System',
      createdAt: '2023-11-15T09:30:00Z',
      description: 'Multiple failed login attempts detected from external IP'
    },
    {
      id: 'INC-2023-002',
      title: 'Suspicious file upload',
      status: 'in_progress',
      severity: 'high',
      source: 'Web server',
      createdBy: 'John Doe',
      createdAt: '2023-11-14T14:15:00Z',
      description: 'Potential malware detected in uploaded file'
    },
    {
      id: 'INC-2023-003',
      title: 'Outdated software',
      status: 'pending',
      severity: 'medium',
      source: 'Vulnerability scan',
      createdBy: 'Automated Scan',
      createdAt: '2023-11-13T11:20:00Z',
      description: 'Apache server requires security update'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [newIncident, setNewIncident] = useState({
    title: '',
    source: '',
    severity: 'medium',
    createdBy: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewIncident(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInc = {
      ...newIncident,
      id: `INC-${new Date().getFullYear()}-${(incidents.length + 1).toString().padStart(3, '0')}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      description: ''
    }
    setIncidents([newInc, ...incidents])
    setNewIncident({ title: '', source: '', severity: 'medium', createdBy: '' })
    setShowForm(false)
  }

  const updateStatus = (id: string, newStatus: string) => {
    setIncidents(incidents.map(inc => 
      inc.id === id ? { ...inc, status: newStatus } : inc
    ))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incident Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus className="h-4 w-4" />
          <span>New Incident</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">Report New Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newIncident.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <input
                  type="text"
                  name="source"
                  value={newIncident.source}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <select
                  name="severity"
                  value={newIncident.severity}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={newIncident.createdBy}
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
                Submit Incident
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {incidents.map(incident => {
          const StatusIcon = statuses[incident.status].icon
          return (
            <div key={incident.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">{incident.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${severities[incident.severity].color}`}>
                      {severities[incident.severity].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{incident.id} • {new Date(incident.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${statuses[incident.status].color}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statuses[incident.status].label}
                  </span>
                  <div className="relative group">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block">
                      <div className="py-1">
                        {Object.entries(statuses).map(([key, { label }]) => (
                          <button
                            key={key}
                            onClick={() => updateStatus(incident.id, key)}
                            className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Change to {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Source:</span> {incident.source}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Description:</span> {incident.description}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Details
                </button>
                {incident.status !== 'resolved' && (
                  <button 
                    onClick={() => updateStatus(incident.id, 'resolved')}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
