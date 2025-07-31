import { useState, useEffect } from "react"
import Sidebar from "@/components/organisms/Sidebar"
import Header from "@/components/organisms/Header"
import { roomService } from "@/services/api/roomService"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [occupancyData, setOccupancyData] = useState({ occupied: 0, total: 0 })

  useEffect(() => {
    const loadOccupancyData = async () => {
try {
        const rooms = await roomService.getAll()
        const occupiedCount = rooms.filter(room => room.status === "occupied").length
        setOccupancyData({ occupied: occupiedCount, total: rooms.length })
      } catch (error) {
        console.error("Failed to load occupancy data:", error)
      }
    }

    loadOccupancyData()
    
    // Listen for guest status changes to refresh room data
    const handleGuestStatusChange = () => {
      loadOccupancyData()
    }
    
    window.addEventListener('guestStatusChanged', handleGuestStatusChange)
    
    // Refresh occupancy data every 30 seconds
    const interval = setInterval(loadOccupancyData, 30000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('guestStatusChanged', handleGuestStatusChange)
    }
  }, [])
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
<Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          occupiedRooms={occupancyData.occupied}
          totalRooms={occupancyData.total}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
export default Layout