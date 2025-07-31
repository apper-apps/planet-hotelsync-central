const mockGuests = [
  {
    Id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    roomNumber: "301",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-18",
    status: "checked-in",
    vip: true,
    specialRequests: ["Late checkout", "Extra towels"]
  },
  {
    Id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com", 
    phone: "+1-555-0124",
    roomNumber: "205",
    checkInDate: "2024-01-14",
    checkOutDate: "2024-01-17",
    status: "checked-in",
    vip: false,
    specialRequests: []
  },
  {
    Id: 3,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0125", 
    roomNumber: "412",
    checkInDate: "2024-01-16",
    checkOutDate: "2024-01-19",
    status: "checked-out",
    vip: false,
    specialRequests: ["Early checkin"]
  },
  {
    Id: 4,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1-555-0126",
    roomNumber: "156",
    checkInDate: "2024-01-13", 
    checkOutDate: "2024-01-16",
    status: "checked-out",
    vip: true,
    specialRequests: ["VIP welcome basket"]
  },
  {
    Id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1-555-0127",
    roomNumber: "503",
    checkInDate: "2024-01-17",
    checkOutDate: "2024-01-20",
    status: "no-show",
    vip: false,
    specialRequests: []
  },
  {
    Id: 6,
    name: "Lisa Martinez",
    email: "lisa.martinez@email.com",
    phone: "+1-555-0128",
    roomNumber: "234",
    checkInDate: "2024-01-16",
    checkOutDate: "2024-01-17",
    status: "checked-in",
    vip: false,
    specialRequests: ["Ground floor room"]
  }
]

class GuestService {
  constructor() {
    this.guests = [...mockGuests]
  }

  async getAll() {
    await this.delay(300)
    return [...this.guests]
  }

  async getById(id) {
    await this.delay(200)
    const guest = this.guests.find(guest => guest.Id === parseInt(id))
    if (!guest) {
      throw new Error(`Guest with Id ${id} not found`)
    }
    return { ...guest }
  }

  async create(guestData) {
    await this.delay(400)
    const newId = Math.max(...this.guests.map(guest => guest.Id)) + 1
    const newGuest = {
      Id: newId,
      ...guestData,
      status: guestData.status || "checked-in",
      vip: guestData.vip || false,
      specialRequests: guestData.specialRequests || []
    }
    this.guests.push(newGuest)
    return { ...newGuest }
  }

  async update(id, guestData) {
    await this.delay(300)
    const index = this.guests.findIndex(guest => guest.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Guest with Id ${id} not found`)
    }
    
    this.guests[index] = { ...this.guests[index], ...guestData }
    return { ...this.guests[index] }
  }

  async delete(id) {
    await this.delay(250)
    const index = this.guests.findIndex(guest => guest.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Guest with Id ${id} not found`)
    }
    
    const deletedGuest = this.guests.splice(index, 1)[0]
    return { ...deletedGuest }
  }

  async checkIn(id) {
async checkIn(id) {
    const guest = await this.update(id, { status: "checked-in" })
    // Dispatch custom event for room status updates
    if (typeof window !== 'undefined' && window.CustomEvent) {
      window.dispatchEvent(new window.CustomEvent('guestStatusChanged', { 
        detail: { guestId: id, roomNumber: guest.roomNumber, status: 'checked-in' } 
      }))
    }
    return guest

async checkOut(id) {
    const guest = await this.update(id, { status: "checked-out" })
    // Dispatch custom event for room status updates
    if (typeof window !== 'undefined' && window.CustomEvent) {
      window.dispatchEvent(new window.CustomEvent('guestStatusChanged', { 
        detail: { guestId: id, roomNumber: guest.roomNumber, status: 'checked-out' } 
      }))
    }
    return guest
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const guestService = new GuestService()