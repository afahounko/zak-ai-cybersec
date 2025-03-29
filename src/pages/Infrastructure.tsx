import { useState } from 'react'
import { Server, Router, Network, Shield, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

type InfrastructureItem = {
  id: string
  name: string
  type: 'server' | 'router' | 'firewall' | 'application'
  hostname: string
  ip: string
  status: 'up' | 'down' | 'unknown'
  cpu?: number
  memory?: number
  disk?: number
  lastUpdated: string
}

export default function Infrastructure() {
  const [infrastructure, setInfrastructure] = useState<InfrastructureItem[]>([
    {
      id: '1',
      name: 'Web Server',
      type: 'server',
      hostname: 'web-01',
      ip: '192.168.1.10',
      status: 'up',
      cpu: 25,
      memory: 45,
      disk: 60,
      lastUpdated: '2023-05-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Database Server',
      type: 'server',
      hostname: 'db-01',
      ip: '192.168.1.20',
      status: 'up',
      cpu: 15,
      memory: 65,
      disk: 30,
      lastUpdated: '2023-05-15T14:25:00Z'
    },
    {
      id: '3',
      name: 'Main Router',
      type: 'router',
      hostname: 'router-01',
      ip: '192.168.1.1',
      status: 'up',
      lastUpdated: '2023-05-15T14:20:00Z'
    },
    {
      id: '4',
      name: 'Firewall',
      type: 'firewall',
      hostname: 'fw-01',
      ip: '192.168.1.5',
      status: 'unknown',
      lastUpdated: '2023-05-15T13:45:00Z'
    }
  ])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Infrastructure</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infrastructure.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {item.type === 'server' && <Server className="w-5 h-5" />}
                {item.type === 'router' && <Router className="w-5 h-5" />}
                {item.type === 'firewall' && <Shield className="w-5 h-5" />}
                {item.type === 'application' && <Network className="w-5 h-5" />}
                <h2 className="font-medium">{item.name}</h2>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.status === 'up' ? 'bg-green-100 text-green-800' :
                item.status === 'down' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Hostname: {item.hostname}</p>
              <p>IP: {item.ip}</p>
              <p>Last updated: {new Date(item.lastUpdated).toLocaleString()}</p>
              {item.cpu !== undefined && <p>CPU: {item.cpu}%</p>}
              {item.memory !== undefined && <p>Memory: {item.memory}%</p>}
              {item.disk !== undefined && <p>Disk: {item.disk}%</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
