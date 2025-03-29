import { useState } from 'react'
import { Settings as SettingsIcon, User, Shield, Bell, Lock, Database, Mail, Save } from 'lucide-react'

const settingsCategories = [
  {
    id: 'account',
    name: 'Account Settings',
    icon: User,
    description: 'Manage your account information and preferences'
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    description: 'Configure security settings and authentication methods'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Customize notification preferences and alerts'
  },
  {
    id: 'api',
    name: 'API Access',
    icon: Lock,
    description: 'Manage API keys and access permissions'
  },
  {
    id: 'data',
    name: 'Data Management',
    icon: Database,
    description: 'Configure data retention and backup settings'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Mail,
    description: 'Connect with external services and tools'
  }
]

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState('account')
  const [formData, setFormData] = useState({
    // Account settings
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: 'Security Analyst',
    company: 'Acme Corp',
    
    // Security settings
    twoFactorEnabled: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    
    // Notification settings
    emailAlerts: true,
    smsAlerts: false,
    webNotifications: true,
    criticalIncidents: true,
    weeklyReports: true,
    
    // API settings
    apiEnabled: true,
    
    // Data settings
    retentionPeriod: '365',
    autoBackup: true,
    
    // Integration settings
    slackIntegration: false,
    jiraIntegration: true,
    teamsIntegration: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the settings to a backend
    alert('Settings saved successfully!')
  }

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'account':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )
      
      case 'security':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactorEnabled"
                  name="twoFactorEnabled"
                  checked={formData.twoFactorEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactorEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable Two-Factor Authentication
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                <select
                  name="sessionTimeout"
                  value={formData.sessionTimeout}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Expiry (days)</label>
                <select
                  name="passwordExpiry"
                  value={formData.passwordExpiry}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="never">Never</option>
                </select>
              </div>
              
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )
      
      case 'notifications':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Notification Channels</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailAlerts"
                      name="emailAlerts"
                      checked={formData.emailAlerts}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailAlerts" className="ml-2 block text-sm text-gray-700">
                      Email Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsAlerts"
                      name="smsAlerts"
                      checked={formData.smsAlerts}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="smsAlerts" className="ml-2 block text-sm text-gray-700">
                      SMS Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="webNotifications"
                      name="webNotifications"
                      checked={formData.webNotifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="webNotifications" className="ml-2 block text-sm text-gray-700">
                      Web Notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Notification Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="criticalIncidents"
                      name="criticalIncidents"
                      checked={formData.criticalIncidents}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="criticalIncidents" className="ml-2 block text-sm text-gray-700">
                      Critical Incidents
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="weeklyReports"
                      name="weeklyReports"
                      checked={formData.weeklyReports}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="weeklyReports" className="ml-2 block text-sm text-gray-700">
                      Weekly Reports
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'api':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">API Access</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="apiEnabled"
                  name="apiEnabled"
                  checked={formData.apiEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="apiEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable API Access
                </label>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">API Keys</h4>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Production API Key</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Regenerate</button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="password"
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                      className="bg-gray-100 border-gray-300 rounded-md p-2 text-sm w-full"
                    />
                    <button className="ml-2 text-xs text-blue-600 hover:text-blue-800">Show</button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">API Rate Limits</h4>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="100">100 requests/minute</option>
                  <option value="500">500 requests/minute</option>
                  <option value="1000">1000 requests/minute</option>
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>
            </div>
          </div>
        )
      
      case 'data':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Data Management</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention Period (days)</label>
                <select
                  name="retentionPeriod"
                  value={formData.retentionPeriod}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                  <option value="730">2 years</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoBackup"
                  name="autoBackup"
                  checked={formData.autoBackup}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoBackup" className="ml-2 block text-sm text-gray-700">
                  Enable Automatic Backups
                </label>
              </div>
              
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Export All Data
                </button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-red-600 mb-2">Danger Zone</h4>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Delete All Data
                </button>
              </div>
            </div>
          </div>
        )
      
      case 'integrations':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">External Integrations</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.82 4.1a10 10 0 0 0-16.41 11l.41 1.2-1.72 5.1 5.22-1.37 1.16.4a10 10 0 0 0 11.37-16.36l-1.17.4a8.5 8.5 0 1 1-9.55 14.12l-1.17.4-3.5.9 1.1-3.3.4-1.17a8.5 8.5 0 0 1 13.85-9.67l.4-1.16zM7.52 11.4l.72.72a1 1 0 0 0 1.41 0l3.54-3.54a1 1 0 0 0 0-1.41l-.72-.72a1 1 0 0 0-1.41 0L7.52 10a1 1 0 0 0 0 1.41z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">Slack</h4>
                      <p className="text-xs text-gray-500">Receive alerts in your Slack channels</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="slackIntegration"
                      name="slackIntegration"
                      checked={formData.slackIntegration}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <button className="ml-4 text-sm text-blue-600 hover:text-blue-800">Configure</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">Jira</h4>
                      <p className="text-xs text-gray-500">Create tickets from security incidents</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="jiraIntegration"
                      name="jiraIntegration"
                      checked={formData.jiraIntegration}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <button className="ml-4 text-sm text-blue-600 hover:text-blue-800">Configure</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">Microsoft Teams</h4>
                      <p className="text-xs text-gray-500">Send notifications to Teams channels</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="teamsIntegration"
                      name="teamsIntegration"
                      checked={formData.teamsIntegration}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <button className="ml-4 text-sm text-blue-600 hover:text-blue-800">Configure</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button 
          onClick={handleSubmit}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Categories */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ul>
              {settingsCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center p-3 text-left ${
                      activeCategory === category.id
                        ? 'bg-blue-50 border-l-4 border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className={`h-5 w-5 mr-3 ${
                      activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <div>
                      <div className={`font-medium ${
                        activeCategory === category.id ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderCategoryContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
