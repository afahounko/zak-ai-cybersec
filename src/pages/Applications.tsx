import { useState } from 'react'
import { Globe, Lock, AlertTriangle, Shield, ChevronDown, RefreshCw } from 'lucide-react'

type Application = {
  id: string
  name: string
  url: string
  type: 'wordpress' | 'website' | 'crm' | 'custom'
  status: 'secure' | 'warning' | 'critical'
  lastScan: string
  vulnerabilities: {
    ssl: {
      valid: boolean
      expiresSoon: boolean
      cipherStrength: 'strong' | 'medium' | 'weak'
    },
    sqlInjection: boolean
    httpHeaders: {
      xFrameOptions: boolean
      xXssProtection: boolean
      contentSecurityPolicy: boolean
    },
    outdatedSoftware: boolean
  }
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      name: 'Main Website',
      url: 'https://example.com',
      type: 'website',
      status: 'warning',
      lastScan: '2023-05-15T14:30:00Z',
      vulnerabilities: {
        ssl: {
          valid: true,
          expiresSoon: true,
          cipherStrength: 'strong'
        },
        sqlInjection: false,
        httpHeaders: {
          xFrameOptions: true,
          xXssProtection: false,
          contentSecurityPolicy: false
        },
        outdatedSoftware: false
      }
    },
    {
      id: '2',
      name: 'Company Blog',
      url: 'https://blog.example.com',
      type: 'wordpress',
      status: 'critical',
      lastScan: '2023-05-15T13:45:00Z',
      vulnerabilities: {
        ssl: {
          valid: true,
          expiresSoon: false,
          cipherStrength: 'weak'
        },
        sqlInjection: true,
        httpHeaders: {
          xFrameOptions: false,
          xXssProtection: false,
          contentSecurityPolicy: false
        },
        outdatedSoftware: true
      }
    },
    {
      id: '3',
      name: 'Customer Portal',
      url: 'https://portal.example.com',
      type: 'crm',
      status: 'secure',
      lastScan: '2023-05-15T14:15:00Z',
      vulnerabilities: {
        ssl: {
          valid: true,
          expiresSoon: false,
          cipherStrength: 'strong'
        },
        sqlInjection: false,
        httpHeaders: {
          xFrameOptions: true,
          xXssProtection: true,
          contentSecurityPolicy: true
        },
        outdatedSoftware: false
      }
    }
  ])

  const [expandedApp, setExpandedApp] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedApp(expandedApp === id ? null : id)
  }

  const rescanApplication = (id: string) => {
    // In a real app, this would trigger an API call to rescan
    alert(`Rescanning application ${id}`)
    setApplications(prev => prev.map(app => 
      app.id === id 
        ? { ...app, lastScan: new Date().toISOString() } 
        : app
    ))
  }

  const getApplicationTypeColor = (type: string) => {
    switch(type) {
      case 'wordpress': return 'bg-blue-100 text-blue-800'
      case 'website': return 'bg-green-100 text-green-800'
      case 'crm': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add New Application
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-3 border-b border-gray-200 font-medium">
          <div className="col-span-4">Application</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Last Scan</div>
          <div className="col-span-2"></div>
        </div>

        {applications.map((app) => (
          <div key={app.id} className="border-b border-gray-200 last:border-b-0">
            <div 
              className="grid grid-cols-12 p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleExpand(app.id)}
            >
              <div className="col-span-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                <div>
                  <div className="font-medium">{app.name}</div>
                  <div className="text-sm text-gray-500">{app.url}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  app.status === 'secure' ? 'bg-green-100 text-green-800' :
                  app.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getApplicationTypeColor(app.type)}`}>
                  {app.type}
                </span>
              </div>
              <div className="col-span-2 text-sm text-gray-500">{new Date(app.lastScan).toLocaleString()}</div>
              <div className="col-span-2 flex justify-end items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    rescanApplication(app.id)
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                  expandedApp === app.id ? 'rotate-180' : ''
                }`} />
              </div>
            </div>

            {expandedApp === app.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <h3 className="font-medium mb-3">Security Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* SSL Security */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-blue-600" />
                        <h4 className="font-medium">SSL Certificate</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        app.vulnerabilities.ssl.valid && !app.vulnerabilities.ssl.expiresSoon && app.vulnerabilities.ssl.cipherStrength === 'strong' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.vulnerabilities.ssl.valid && !app.vulnerabilities.ssl.expiresSoon && app.vulnerabilities.ssl.cipherStrength === 'strong'
                          ? 'Secure'
                          : 'Issues detected'}
                      </span>
                    </div>
                    
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Certificate Valid</span>
                        <span className={`font-medium ${
                          app.vulnerabilities.ssl.valid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {app.vulnerabilities.ssl.valid ? 'Yes' : 'No'}
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Expiring Soon</span>
                        <span className={`font-medium ${
                          app.vulnerabilities.ssl.expiresSoon ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {app.vulnerabilities.ssl.expiresSoon ? 'Yes' : 'No'}
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Cipher Strength</span>
                        <span className={`font-medium ${
                          app.vulnerabilities.ssl.cipherStrength === 'strong' ? 'text-green-600' :
                          app.vulnerabilities.ssl.cipherStrength === 'medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {app.vulnerabilities.ssl.cipherStrength}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* SQL Injection */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        <h4 className="font-medium">SQL Injection</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        !app.vulnerabilities.sqlInjection ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {!app.vulnerabilities.sqlInjection ? 'Secure' : 'Vulnerable'}
                      </span>
                    </div>
                    
                    <p className="text-sm">
                      {!app.vulnerabilities.sqlInjection 
                        ? 'No SQL injection vulnerabilities detected'
                        : 'SQL injection vulnerabilities detected! Immediate action required.'}
                    </p>
                  </div>

                  {/* HTTP Headers */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        <h4 className="font-medium">HTTP Headers</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        app.vulnerabilities.httpHeaders.xFrameOptions && 
                        app.vulnerabilities.httpHeaders.xXssProtection && 
                        app.vulnerabilities.httpHeaders.contentSecurityPolicy
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.vulnerabilities.httpHeaders.xFrameOptions && 
                         app.vulnerabilities.httpHeaders.xXssProtection && 
                         app.vulnerabilities.httpHeaders.contentSecurityPolicy
                          ? 'Secure'
                          : 'Issues detected'}
                      </span>
                    </div>
                    
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center justify-between">
                        <span>X-Frame-Options</span>
                        <span className={`font-medium ${
                          app.vulnerabilities.httpHeaders.xFrameOptions ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {app.vulnerabilities.httpHeaders.xFrameOptions ? 'Present' : 'Missing'}
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>X-XSS-Protection</span>
                        <span className={`font-medium ${
                          app.vulnerabilities.httpHeaders.xXssProtection ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {app.vulnerabilities.httpHeaders.xXssProtection ? 'Present' : 'Missing'}
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Content-Security-Policy</span>
                        <span className={`font-medium ${
                          app.vulnerabilities.httpHeaders.contentSecurityPolicy ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {app.vulnerabilities.httpHeaders.contentSecurityPolicy ? 'Present' : 'Missing'}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Outdated Software */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                        <h4 className="font-medium">Software Updates</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        !app.vulnerabilities.outdatedSoftware ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {!app.vulnerabilities.outdatedSoftware ? 'Up to date' : 'Updates available'}
                      </span>
                    </div>
                    
                    <p className="text-sm">
                      {!app.vulnerabilities.outdatedSoftware 
                        ? 'All software components are up to date'
                        : 'Outdated software detected. Update recommended.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
