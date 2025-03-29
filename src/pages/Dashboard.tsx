import { Activity, Shield, AlertTriangle, Zap, Lock, Network, Server, Router, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const stats = [
    { title: 'Active Threats', value: '24', icon: Shield, trend: 'up', color: 'red' },
    { title: 'Vulnerabilities', value: '156', icon: Zap, trend: 'up', color: 'orange' },
    { title: 'Compliance Issues', value: '8', icon: Lock, trend: 'down', color: 'yellow' },
    { title: 'Open Ports', value: '42', icon: Network, trend: 'stable', color: 'blue' },
    { title: 'Servers', value: '18', icon: Server, trend: 'stable', color: 'green' },
    { title: 'Firewalls', value: '5', icon: Router, trend: 'stable', color: 'indigo' }
  ]

  const recentIncidents = [
    {
      id: 'INC-2023-001',
      title: 'Unauthorized access attempt',
      status: 'open',
      severity: 'critical',
      source: 'Firewall logs',
      createdAt: '2023-11-15T09:30:00Z'
    },
    {
      id: 'INC-2023-002',
      title: 'Suspicious file upload',
      status: 'in_progress',
      severity: 'high',
      source: 'Web server',
      createdAt: '2023-11-14T14:15:00Z'
    }
  ]

  const topRisks = [
    {
      id: 'RISK-001',
      name: 'Unpatched Server',
      level: 'high',
      status: 'not_started',
      lastAssessed: '2023-11-10'
    },
    {
      id: 'RISK-002',
      name: 'Weak Password Policy',
      level: 'medium',
      status: 'in_progress',
      lastAssessed: '2023-11-12'
    }
  ]

  const statusColors = {
    open: 'bg-red-100 text-red-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    not_started: 'bg-gray-100 text-gray-800'
  }

  const severityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Security Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Incidents and Top Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Incidents */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Incidents</h2>
            <Link to="/incidents" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-red-100 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{incident.title}</p>
                    <p className="text-sm text-gray-500">{incident.source} • {new Date(incident.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[incident.status]}`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[incident.severity]}`}>
                    {incident.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Risks */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Risks</h2>
            <Link to="/risk-management" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {topRisks.map((risk) => (
              <div key={risk.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{risk.name}</p>
                    <p className="text-sm text-gray-500">Last assessed: {risk.lastAssessed}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[risk.level]}`}>
                    {risk.level}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[risk.status]}`}>
                    {risk.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Reporting */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Official Reporting</h2>
        <p className="text-sm text-gray-600 mb-4">
          Generate official reports for regulatory compliance and incident reporting to authorities.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => alert('ANSSI report generation would be triggered here')}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            <FileText className="h-5 w-5" />
            <span>Generate ANSSI Report</span>
          </button>
          <button 
            onClick={() => alert('CERT report generation would be triggered here')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <FileText className="h-5 w-5" />
            <span>Generate CERT Report</span>
          </button>
          <button 
            onClick={() => alert('CSIRT report generation would be triggered here')}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            <FileText className="h-5 w-5" />
            <span>Generate CSIRT Report</span>
          </button>
        </div>
      </div>

      {/* Security KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Security KPIs</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Threat Detection Rate</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Incident Resolution Time</span>
                <span>4.2h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Top Threats</h2>
          <div className="space-y-3">
            {[
              { name: 'SQL Injection', count: 12 },
              { name: 'XSS Vulnerabilities', count: 8 },
              { name: 'Misconfigured Firewall', count: 5 },
              { name: 'Outdated Software', count: 3 }
            ].map((threat) => (
              <div key={threat.name} className="flex items-center justify-between">
                <span className="text-sm">{threat.name}</span>
                <span className="text-sm font-medium">{threat.count} detected</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
