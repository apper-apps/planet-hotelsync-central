// Mock reservation data
const mockReservations = [
  {
    Id: 1,
    guestName: "John Smith",
    roomId: 101,
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guests: 2,
    status: "confirmed",
    color: "#3B82F6"
  },
  {
    Id: 2,
    guestName: "Sarah Johnson",
    roomId: 102,
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    guests: 1,
    status: "confirmed",
    color: "#10B981"
  },
  {
    Id: 3,
    guestName: "Mike Wilson",
    roomId: 103,
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    guests: 3,
    status: "confirmed",
    color: "#F59E0B"
  },
  {
    Id: 4,
    guestName: "Emma Davis",
    roomId: 201,
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    guests: 2,
    status: "confirmed",
    color: "#8B5CF6"
  },
  {
    Id: 5,
    guestName: "Robert Brown",
    roomId: 202,
    checkIn: "2024-01-22",
    checkOut: "2024-01-25",
    guests: 1,
    status: "confirmed",
    color: "#EF4444"
  }
];

// Simple delay function for simulating API calls
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate colors for new reservations
const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4", "#84CC16"];
let colorIndex = 0;

class ReservationService {
  constructor() {
    this.reservations = [...mockReservations];
    this.nextId = Math.max(...this.reservations.map(r => r.Id)) + 1;
  }

  async getAll() {
    await delay(100);
    return [...this.reservations];
  }

  async getById(id) {
    await delay(50);
    if (typeof id !== 'number') {
      throw new Error('Reservation ID must be a number');
    }
    const reservation = this.reservations.find(r => r.Id === id);
    return reservation ? { ...reservation } : null;
  }

  async create(reservationData) {
    await delay(200);
    const newReservation = {
      ...reservationData,
      Id: this.nextId++,
      color: colors[colorIndex % colors.length],
      status: 'confirmed'
    };
    colorIndex++;
    this.reservations.push(newReservation);
    return { ...newReservation };
  }

  async update(id, reservationData) {
    await delay(150);
    if (typeof id !== 'number') {
      throw new Error('Reservation ID must be a number');
    }
    const index = this.reservations.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Reservation not found');
    }
    this.reservations[index] = { ...this.reservations[index], ...reservationData };
    return { ...this.reservations[index] };
  }

  async delete(id) {
    await delay(100);
    if (typeof id !== 'number') {
      throw new Error('Reservation ID must be a number');
    }
    const index = this.reservations.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Reservation not found');
    }
    this.reservations.splice(index, 1);
    return true;
  }

  async getByDateRange(startDate, endDate) {
    await delay(100);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.reservations.filter(reservation => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);
      return checkIn <= end && checkOut >= start;
    }).map(r => ({ ...r }));
  }

  async getTodayArrivals() {
    await delay(50);
    const today = new Date().toISOString().split('T')[0];
    return this.reservations.filter(r => r.checkIn === today).map(r => ({ ...r }));
  }

  async getTodayDepartures() {
    await delay(50);
    const today = new Date().toISOString().split('T')[0];
    return this.reservations.filter(r => r.checkOut === today).map(r => ({ ...r }));
  }
}

const reservationService = new ReservationService();
export { reservationService };