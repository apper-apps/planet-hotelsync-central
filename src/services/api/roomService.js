import roomsData from "@/services/mockData/rooms.json"

class RoomService {
  constructor() {
    this.rooms = [...roomsData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.rooms]
  }

  async getById(id) {
    await this.delay(200)
    const room = this.rooms.find(room => room.Id === parseInt(id))
    if (!room) {
      throw new Error(`Room with Id ${id} not found`)
    }
    return { ...room }
  }

async create(roomData) {
    await this.delay(400)
    const newId = Math.max(...this.rooms.map(room => room.Id)) + 1
    const newRoom = {
      Id: newId,
      ...roomData,
      status: roomData.status || "vacant"
    }
    this.rooms.push(newRoom)
    return { ...newRoom }
  }

  async update(id, roomData) {
    await this.delay(300)
    const index = this.rooms.findIndex(room => room.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Room with Id ${id} not found`)
    }
    
    this.rooms[index] = { ...this.rooms[index], ...roomData }
    return { ...this.rooms[index] }
  }

  async delete(id) {
    await this.delay(250)
    const index = this.rooms.findIndex(room => room.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Room with Id ${id} not found`)
    }
    
    const deletedRoom = this.rooms.splice(index, 1)[0]
    return { ...deletedRoom }
}

  async updateRoomStatusFromTask(roomNumber, newStatus) {
    await this.delay(200)
    const room = this.rooms.find(room => room.number === roomNumber)
    if (room) {
      room.status = newStatus
      return { ...room }
    }
    throw new Error(`Room ${roomNumber} not found`)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const roomService = new RoomService()