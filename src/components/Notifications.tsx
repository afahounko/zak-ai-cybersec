import { useState, useRef, useEffect } from 'react'
import { Bell, Check, AlertTriangle, Info, X } from 'lucide-react'

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Security Alert',
      message: 'Unauthorized access attempt detected',
      time: '2 mins ago',
      type: 'alert',
      read: false
    },
    {
      id: 2,
      title: 'System Update',
      message: 'New security patches available',
      time: '1 hour ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Weekly Report',
      message: 'Your weekly security report is ready',
      time: '1 day ago',
      type: 'info',
      read: true
    }
  ])
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

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 md:p-2 rounded-full hover:bg-gray-100 relative focus:outline-none"
      >
        <Bell className="h-4 w-4 md:h-5 md:w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 md:h-2.5 md:w-2.5 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="px-3 py-2 md:px-4 md:py-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-medium">Notifications</h3>
            <button 
              onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, read: true })))
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`px-3 py-2 md:px-4 md:py-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className={`p-1 md:p-2 rounded-full ${
                      notification.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.type === 'alert' ? (
                        <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />
                      ) : (
                        <Info className="h-3 w-3 md:h-4 md:w-4" />
                      )}
                    </div>
                    <div className="ml-2 md:ml-3 flex-1">
                      <p className="text-xs md:text-sm font-medium">{notification.title}</p>
                      <p className="text-xs md:text-sm text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5 md:mt-1">{notification.time}</p>
                    </div>
                    <div className="flex items-center">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-0.5 md:p-1 text-gray-400 hover:text-gray-600"
                          title="Mark as read"
                        >
                          <Check className="h-2.5 w-2.5 md:h-3 md:w-3" />
                        </button>
                      )}
                      <button className="p-0.5 md:p-1 text-gray-400 hover:text-gray-600 ml-0.5 md:ml-1">
                        <X className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-4 md:py-6 text-center text-xs md:text-sm text-gray-500">
                No new notifications
              </div>
            )}
          </div>
          <div className="px-3 py-1 md:px-4 md:py-2 border-t border-gray-100 text-center">
            <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
