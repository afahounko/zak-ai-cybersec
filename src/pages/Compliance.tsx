import { useState } from 'react'
import { Shield, Check, X, ChevronDown, Plus } from 'lucide-react'

const complianceStatuses = {
  compliant: { label: 'Compliant', color: 'bg-green-100 text-green-800', icon: Check },
  non_compliant: { label: 'Non-Compliant', color: 'bg-red-100 text-red-800', icon: X },
  partial: { label: 'Partially Compliant', color: 'bg-yellow-100 text-yellow-800', icon: ChevronDown }
}

export default function Compliance() {
  const [standards, setStandards] = useState([
    {
      id: 'STD-001',
      name: 'ISO 27001',
      status: 'compliant',
      lastAssessed: '2023-10-15',
      controls: 114,
      compliantControls: 114
    },
    {
      id: 'STD-002',
      name: 'GDPR',
      status: 'partial',
      lastAssessed: '2023-09-28',
      controls: 99,
      compliantControls: 87
    },
    {
      id: 'STD-003',
      name: 'PCI DSS',
      status: 'non_compliant',
      lastAssessed: '2023-11-01',
      controls: 12,
      compliantControls: 5
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [newStandard, setNewStandard] = useState({
    name: '',
    status: 'compliant'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewStandard(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStd = {
      ...newStandard,
      id: `STD-${(standards.length + 1).toString().padStart(3, '0')}`,
      lastAssessed: new Date().toISOString().split('T')[0],
      controls: 0,
      compliantControls: 0
    }
    setStandards([newStd, ...standards])
    setNewStandard({ name: '', status: 'compliant' })
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Compliance Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus className="h-4 w-4" />
          <span>New Standard</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Compliance Standard</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStandard.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newStandard.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="compliant">Compliant</option>
                  <option value="partial">Partially Compliant</option>
                  <option value="non_compliant">Non-Compliant</option>
                </select>
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
                Add Standard
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {standards.map(standard => {
          const StatusIcon = complianceStatuses[standard.status].icon
          return (
            <div key={standard.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{standard.name}</h2>
                <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${complianceStatuses[standard.status].color}`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {complianceStatuses[standard.status].label}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>ID: {standard.id}</p>
                <p>Last Assessed: {standard.lastAssessed}</p>
                <p>Controls: {standard.controls}</p>
                <p>Compliant Controls: {standard.compliantControls}</p>
                {standard.status === 'partial' && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-500 h-2.5 rounded-full" 
                      style={{ width: `${(standard.compliantControls / standard.controls) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
