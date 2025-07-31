import { useState } from "react"
import RoomCard from "@/components/molecules/RoomCard"
import RoomDetailModal from "@/components/organisms/RoomDetailModal"

const RoomGrid = ({ rooms, onRoomUpdate }) => {
  const [selectedRoom, setSelectedRoom] = useState(null)

  const handleRoomClick = (room) => {
    setSelectedRoom(room)
  }

  const handleCloseModal = () => {
    setSelectedRoom(null)
  }

  const handleRoomStatusUpdate = (updatedRoom) => {
    onRoomUpdate(updatedRoom)
    setSelectedRoom(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.Id}
            room={room}
            onClick={handleRoomClick}
          />
        ))}
      </div>

      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={handleCloseModal}
          onStatusUpdate={handleRoomStatusUpdate}
        />
      )}
    </>
  )
}

export default RoomGrid