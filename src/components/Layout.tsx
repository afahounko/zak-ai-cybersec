import { useState, useEffect } from 'react'
import { Menu, Search, ChevronDown, Shield, AlertTriangle, Zap, Lock, Server, Network, Router, Settings, LayoutDashboard, FileText, Globe } from 'lucide-react'
import Notifications from './Notifications'
import UserMenu from './UserMenu'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Incidents', icon: AlertTriangle, path: '/incidents' },
    { name: 'Risk Management', icon: Shield, path: '/risk-management' },
    { name: 'Infrastructure', icon: Server, path: '/infrastructure' },
    { name: 'Applications', icon: Globe, path: '/applications' },
    { name: 'Vulnerabilities', icon: Zap, path: '/vulnerabilities' },
    { name: 'Compliance', icon: Lock, path: '/compliance' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop overlay */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0 w-64 md:w-64' : '-translate-x-full md:translate-x-0 md:w-20'}
        fixed md:relative z-50 md:z-auto
        h-full bg-gray-900 text-white transition-all duration-300 ease-in-out
      `}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold truncate">Zak CyberSec</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-1 rounded-md hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center p-3 hover:bg-gray-800 rounded-md mx-2 truncate"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3 truncate">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-20">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-3 md:p-4 md:px-6">
            {/* Mobile menu button - only shows on small screens */}
            {window.innerWidth <= 768 && !sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-1 mr-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <div className={`relative ${searchFocused ? 'w-full' : 'w-40 md:w-96'} transition-all duration-300`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Notifications />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
