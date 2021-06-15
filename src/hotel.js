class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
    this.availableRooms = [];
  }

  getUserBookings(customer) {
    return this.bookings.filter(booking => {
      return booking.userID === customer.id;
    });
  }

  getFullRoomInfoForBookings(customer) {
    const bookings = this.getUserBookings(customer);
    let roomsBooked = this.rooms.reduce((roomsBooked, room) => {
      bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          roomsBooked.push({ room, date: booking.date });
        }
      });
      return roomsBooked;
    }, []);

    return roomsBooked;
  }

  getUserExpenses(customer) {
    const matchedRooms = this.getFullRoomInfoForBookings(customer);

    let totalExpenses = matchedRooms
      .reduce((total, currentRoom) => {
        const rate = currentRoom.room.costPerNight;
        total += rate;
        return total;
      }, 0)
      .toFixed(2);

    return totalExpenses;
  }

  findBookedRooms(date) {
    return this.bookings
      .filter(booking => {
        return date === booking.date;
      })
      .map(booking => booking.roomNumber);
  }

  setRoomAvailability(date) {
    const bookedRooms = this.findBookedRooms(date);

    this.rooms.forEach(room => {
      room.isAvailable = true;
      if (bookedRooms.includes(room.number)) {
        room.isAvailable = false;
      }
    });
  }

  findAvailableRooms(date) {
    this.setRoomAvailability(date)
    this.availableRooms = this.rooms.filter(room => room.isAvailable);
    return this.availableRooms;
  }

  getRoomTypes() {
    return this.rooms.reduce((acc, room) => {
      if (!acc.includes(room.type)) {
        acc.push(room.type);
      }
      return acc;
    }, []);
  }

  filterAvailableRoomsByType(type) {
    return this.availableRooms.filter(room => {
      return room.type === type;
    });
  }

  returnRoomDetails(roomNumber) {
    return this.rooms.find(room => {
      return room.number === roomNumber;
    });
  }
}

export default Hotel


