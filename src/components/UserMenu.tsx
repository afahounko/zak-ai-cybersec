import { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut, User, Settings, HelpCircle } from 'lucide-react'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
    { icon: LogOut, label: 'Sign out' }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 md:space-x-2 focus:outline-none"
      >
        <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          U
        </div>
        <ChevronDown className={`h-3 w-3 md:h-4 md:w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-3 py-2 md:px-4 border-b border-gray-100">
            <p className="text-sm font-medium truncate">User Name</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-3 py-2 md:px-4 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
