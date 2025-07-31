import { useState, useEffect } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Header = ({ onMenuClick, occupiedRooms, totalRooms }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
      <div className="flex items-center justify-between h-20 px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="lg:hidden p-2"
            onClick={onMenuClick}
          >
            <ApperIcon name="Menu" className="h-6 w-6" />
          </Button>
          
          <div className="hidden sm:block">
            <h2 className="text-2xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent">
              Grand Plaza Hotel
            </h2>
            <p className="text-sm text-gray-600">Luxury Hospitality Management</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-gray-500 uppercase tracking-wide">Date</p>
              <p className="font-semibold text-navy-700">
                {currentTime.toLocaleDateString("en-US", { 
                  weekday: "short", 
                  month: "short", 
                  day: "numeric" 
                })}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-500 uppercase tracking-wide">Time</p>
              <p className="font-semibold text-navy-700 number-transition">
                {currentTime.toLocaleTimeString([], { 
                  hour: "2-digit", 
                  minute: "2-digit" 
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gradient-to-r from-navy-50 to-blue-50 px-4 py-2 rounded-lg border border-navy-100">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-sm" />
              <span className="text-sm font-medium text-navy-700">Occupancy</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold font-display text-navy-700 number-transition">
                {occupancyRate}%
              </p>
              <p className="text-xs text-gray-600">
                {occupiedRooms}/{totalRooms} rooms
              </p>
            </div>
          </div>

          <Button variant="ghost" className="p-2 relative">
            <ApperIcon name="Bell" className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">3</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header