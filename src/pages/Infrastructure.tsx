import { useState } from 'react'
import { Server, Router, Network, Shield, ChevronDown, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'

type InfrastructureItem = {
  id: string
  name: string
  type: 'server' | 'router' | 'firewall' | 'application'
  hostname: string
  ip: string
  status: 'up' | 'down' | 'unknown'
  os?: string
  cpu?: {
    cores: number
    usage: number
    model: string
  }
  memory?: {
    total: number
    used: number
    unit: 'GB' | 'MB'
  }
  disk?: {
    total: number
    used: number
    unit: 'GB' | 'TB'
  }
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
      os: 'Ubuntu 22.04 LTS',
      cpu: {
        cores: 4,
        usage: 25,
        model: 'Intel Xeon E3-1230'
      },
      memory: {
        total: 16,
        used: 7.2,
        unit: 'GB'
      },
      disk: {
        total: 500,
        used: 300,
        unit: 'GB'
      },
      lastUpdated: '2023-05-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Database Server',
      type: 'server',
      hostname: 'db-01',
      ip: '192.168.1.20',
      status: 'up',
      os: 'CentOS 7',
      cpu: {
        cores: 8,
        usage: 15,
        model: 'AMD EPYC 7351'
      },
      memory: {
        total: 32,
        used: 20.8,
        unit: 'GB'
      },
      disk: {
        total: 2,
        used: 0.6,
        unit: 'TB'
      },
      lastUpdated: '2023-05-15T14:25:00Z'
    },
    {
      id: '3',
      name: 'Main Router',
      type: 'router',
      hostname: 'router-01',
      ip: '192.168.1.1',
      status: 'up',
      os: 'Cisco IOS XE',
      lastUpdated: '2023-05-15T14:20:00Z'
    },
    {
      id: '4',
      name: 'Firewall',
      type: 'firewall',
      hostname: 'fw-01',
      ip: '192.168.1.5',
      status: 'unknown',
      os: 'pfSense 2.6',
      lastUpdated: '2023-05-15T13:45:00Z'
    }
  ])

  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const rescanItem = (id: string) => {
    // In a real app, this would trigger an API call to rescan
    alert(`Rescanning infrastructure item ${id}`)
    setInfrastructure(prev => prev.map(item => 
      item.id === id 
        ? { ...item, lastUpdated: new Date().toISOString() } 
        : item
    ))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Infrastructure</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-3 border-b border-gray-200 font-medium">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Last Updated</div>
          <div className="col-span-2"></div>
        </div>

        {infrastructure.map((item) => (
          <div key={item.id} className="border-b border-gray-200 last:border-b-0">
            <div 
              className="grid grid-cols-12 p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="col-span-4 flex items-center">
                {item.type === 'server' && <Server className="w-5 h-5 mr-2" />}
                {item.type === 'router' && <Router className="w-5 h-5 mr-2" />}
                {item.type === 'firewall' && <Shield className="w-5 h-5 mr-2" />}
                {item.type === 'application' && <Network className="w-5 h-5 mr-2" />}
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.hostname}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'up' ? 'bg-green-100 text-green-800' :
                  item.status === 'down' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="col-span-2">
                <span className="capitalize">{item.type}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-500">
                {new Date(item.lastUpdated).toLocaleString()}
              </div>
              <div className="col-span-2 flex justify-end items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    rescanItem(item.id)
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                  expandedItem === item.id ? 'rotate-180' : ''
                }`} />
              </div>
            </div>

            {expandedItem === item.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <h3 className="font-medium mb-3">Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Info */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-medium mb-2">Basic Information</h4>
                    <div className="text-sm space-y-2">
                      <p>Hostname: {item.hostname}</p>
                      <p>IP Address: {item.ip}</p>
                      {item.os && <p>Operating System: {item.os}</p>}
                    </div>
                  </div>

                  {/* CPU */}
                  {item.cpu && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-medium mb-2">CPU</h4>
                      <div className="text-sm space-y-2">
                        <p>Model: {item.cpu.model}</p>
                        <p>Cores: {item.cpu.cores}</p>
                        <div className="flex items-center justify-between">
                          <span>Usage:</span>
                          <span className="font-medium">
                            {item.cpu.usage}% of {item.cpu.cores} cores
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Memory */}
                  {item.memory && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-medium mb-2">Memory</h4>
                      <div className="text-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Total:</span>
                          <span className="font-medium">
                            {item.memory.total} {item.memory.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Used:</span>
                          <span className="font-medium">
                            {item.memory.used} {item.memory.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Percentage:</span>
                          <span className="font-medium">
                            {Math.round((item.memory.used / item.memory.total) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Disk */}
                  {item.disk && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-medium mb-2">Disk</h4>
                      <div className="text-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Total:</span>
                          <span className="font-medium">
                            {item.disk.total} {item.disk.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Used:</span>
                          <span className="font-medium">
                            {item.disk.used} {item.disk.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Percentage:</span>
                          <span className="font-medium">
                            {Math.round((item.disk.used / item.disk.total) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
