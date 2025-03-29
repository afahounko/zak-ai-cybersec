import { useState } from 'react'
import { FileText, Download, ChevronDown, Plus } from 'lucide-react'

const reportTypes = {
  security: { label: 'Security', color: 'bg-red-100 text-red-800' },
  compliance: { label: 'Compliance', color: 'bg-blue-100 text-blue-800' },
  risk: { label: 'Risk', color: 'bg-yellow-100 text-yellow-800' },
  infrastructure: { label: 'Infrastructure', color: 'bg-green-100 text-green-800' }
}

export default function Reports() {
  const [reports, setReports] = useState([
    {
      id: 'RPT-2023-001',
      title: 'Monthly Security Report',
      type: 'security',
      generated: '2023-11-01',
      period: 'October 2023',
      status: 'ready'
    },
    {
      id: 'RPT-2023-002',
      title: 'GDPR Compliance Audit',
      type: 'compliance',
      generated: '2023-10-15',
      period: 'Q3 2023',
      status: 'ready'
    },
    {
      id: 'RPT-2023-003',
      title: 'Risk Assessment Summary',
      type: 'risk',
      generated: '2023-09-30',
      period: 'September 2023',
      status: 'ready'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'security',
    period: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewReport(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRpt = {
      ...newReport,
      id: `RPT-${new Date().getFullYear()}-${(reports.length + 1).toString().padStart(3, '0')}`,
      generated: new Date().toISOString().split('T')[0],
      status: 'pending'
    }
    setReports([newRpt, ...reports])
    setNewReport({ title: '', type: 'security', period: '' })
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus className="h-4 w-4" />
          <span>New Report</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">Generate New Report</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                <input
                  type="text"
                  name="title"
                  value={newReport.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  name="type"
                  value={newReport.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="security">Security</option>
                  <option value="compliance">Compliance</option>
                  <option value="risk">Risk</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <input
                  type="text"
                  name="period"
                  value={newReport.period}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. October 2023 or Q3 2023"
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
                Generate
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map(report => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${reportTypes[report.type].color}`}>
                    {reportTypes[report.type].label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.generated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    <span>Download</span>
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
