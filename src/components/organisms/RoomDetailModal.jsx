import { useState } from "react"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import StatusBadge from "@/components/molecules/StatusBadge"
import ApperIcon from "@/components/ApperIcon"
import { roomService } from "@/services/api/roomService"

const RoomDetailModal = ({ room, onClose, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus) => {
    setLoading(true)
    try {
      const updatedRoom = await roomService.update(room.Id, { ...room, status: newStatus })
      onStatusUpdate(updatedRoom)
      toast.success(`Room ${room.number} status updated to ${newStatus}`)
    } catch (error) {
      toast.error("Failed to update room status")
    } finally {
      setLoading(false)
    }
  }

  const statusActions = [
    { status: "vacant", label: "Mark Vacant", icon: "CheckCircle", variant: "secondary" },
    { status: "occupied", label: "Check In", icon: "User", variant: "primary" },
    { status: "cleaning", label: "Send to Cleaning", icon: "Sparkles", variant: "accent" },
    { status: "maintenance", label: "Maintenance Required", icon: "Wrench", variant: "outline" }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <Card className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Room {room.number}</CardTitle>
            <p className="text-gray-600">{room.type} • Floor {room.floor}</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <ApperIcon name="X" className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Current Status</span>
            <StatusBadge status={room.status} />
          </div>

          {room.status === "occupied" && room.guestName && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <ApperIcon name="User" className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Guest Information</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {room.guestName}</p>
                {room.checkIn && (
                  <p><strong>Check-in:</strong> {new Date(room.checkIn).toLocaleDateString()}</p>
                )}
                {room.checkOut && (
                  <p><strong>Check-out:</strong> {new Date(room.checkOut).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <ApperIcon name="Info" className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-900">Room Details</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Room Type</p>
                <p className="font-medium">{room.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Floor</p>
                <p className="font-medium">{room.floor}</p>
              </div>
              {room.rate && (
                <div className="col-span-2">
                  <p className="text-gray-600">Rate</p>
                  <p className="font-medium text-navy-600">${room.rate}/night</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {statusActions
                .filter(action => action.status !== room.status)
                .map((action) => (
                  <Button
                    key={action.status}
                    variant={action.variant}
                    size="sm"
                    onClick={() => handleStatusChange(action.status)}
                    disabled={loading}
                    className="justify-start gap-2"
                  >
                    <ApperIcon name={action.icon} className="h-4 w-4" />
                    {action.label}
                  </Button>
                ))
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoomDetailModal