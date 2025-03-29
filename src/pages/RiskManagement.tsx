import { useState } from 'react'
import { AlertCircle, Shield, User, FileText, ChevronDown, Plus } from 'lucide-react'

const riskLevels = {
  high: { label: 'High', color: 'bg-red-100 text-red-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  low: { label: 'Low', color: 'bg-blue-100 text-blue-800' }
}

const mitigationStatuses = {
  not_started: { label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' }
}

export default function RiskManagement() {
  const [risks, setRisks] = useState([
    {
      id: 'RISK-001',
      name: 'Unpatched Server',
      asset: 'Web Server (192.168.1.10)',
      level: 'high',
      owner: 'John Doe',
      status: 'not_started',
      mitigation: 'Apply latest security patches',
      lastAssessed: '2023-11-10'
    },
    {
      id: 'RISK-002',
      name: 'Weak Password Policy',
      asset: 'Active Directory',
      level: 'medium',
      owner: 'Jane Smith',
      status: 'in_progress',
      mitigation: 'Implement password complexity requirements',
      lastAssessed: '2023-11-12'
    },
    {
      id: 'RISK-003',
      name: 'Missing Backup Verification',
      asset: 'Database Server',
      level: 'low',
      owner: 'Mike Johnson',
      status: 'not_started',
      mitigation: 'Schedule regular backup tests',
      lastAssessed: '2023-11-08'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [newRisk, setNewRisk] = useState({
    name: '',
    asset: '',
    level: 'medium',
    owner: '',
    mitigation: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewRisk(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRiskItem = {
      ...newRisk,
      id: `RISK-${(risks.length + 1).toString().padStart(3, '0')}`,
      status: 'not_started',
      lastAssessed: new Date().toISOString().split('T')[0]
    }
    setRisks([newRiskItem, ...risks])
    setNewRisk({ name: '', asset: '', level: 'medium', owner: '', mitigation: '' })
    setShowForm(false)
  }

  const updateMitigationStatus = (id: string, newStatus: string) => {
    setRisks(risks.map(risk => 
      risk.id === id ? { ...risk, status: newStatus } : risk
    ))
  }

  const reportToANSSI = (riskId: string) => {
    // In a real app, this would trigger an API call or form submission
    alert(`Risk ${riskId} reported to ANSSI/CERT/CSIRT`)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Risk Management</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <Plus className="h-4 w-4" />
            <span>Define Risk</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">Define New Risk</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Name</label>
                <input
                  type="text"
                  name="name"
                  value={newRisk.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                <input
                  type="text"
                  name="asset"
                  value={newRisk.asset}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                <select
                  name="level"
                  value={newRisk.level}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                <input
                  type="text"
                  name="owner"
                  value={newRisk.owner}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mitigation Plan</label>
              <textarea
                name="mitigation"
                value={newRisk.mitigation}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
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
                Save Risk
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map(risk => (
              <tr key={risk.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{risk.name}</div>
                      <div className="text-sm text-gray-500">{risk.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {risk.asset}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevels[risk.level].color}`}>
                    {riskLevels[risk.level].label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{risk.owner}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative group">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${mitigationStatuses[risk.status].color}`}>
                        {mitigationStatuses[risk.status].label}
                      </span>
                      <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block">
                        <div className="py-1">
                          {Object.entries(mitigationStatuses).map(([key, { label }]) => (
                            <button
                              key={key}
                              onClick={() => updateMitigationStatus(risk.id, key)}
                              className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Change to {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => reportToANSSI(risk.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      <span>Report</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Shield className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Official Reporting</h2>
        <p className="text-sm text-gray-600 mb-4">
          Use this section to generate official reports for regulatory compliance and incident reporting to authorities.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={() => alert('ANSSI/CERT/CSIRT report generation would be triggered here')}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            <FileText className="h-4 w-4" />
            <span>Generate ANSSI Report</span>
          </button>
          <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            <FileText className="h-4 w-4" />
            <span>Generate CERT Report</span>
          </button>
        </div>
      </div>
    </div>
  )
}
