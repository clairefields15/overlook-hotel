class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
    this.availableRooms = [];
  }

  getUserBookings(customer) {
    return this.bookings.filter(booking => {
      return booking.userID === customer.id
    })
  }

  // loop within a loop not great for optimization, 25000 operations
  getFullRoomInfoForBookings(customer) {
    const bookings = this.getUserBookings(customer)
    const roomsBooked = this.rooms.reduce((acc, room) => {
      bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          acc.push({ room, booking })
        }
      })
      return acc
    }, [])

    customer.bookings.push(roomsBooked)
    return roomsBooked;
  }

  getUserExpenses(customer) {
    const matchedRooms = this.getFullRoomInfoForBookings(customer);

    const totalExpenses = matchedRooms.reduce((total, currentRoom) => {
      const rate = currentRoom.room.costPerNight
      total += rate
      return total
    }, 0).toFixed(2)

    return totalExpenses;
  }

  findBookedRooms(date) {
    return this.bookings
      .filter(booking => {
        return date === booking.date;
      })
      .map(booking => booking.roomNumber);
  }

  // also not great for optimization, lots of iteratings, 5 loops??
  findAvailableRooms(date) {
    const bookedRooms = this.findBookedRooms(date)

    this.rooms.forEach(room => {
      if (bookedRooms.includes(room.number)) {
        room.isAvailable = false
      }
    })

    // the only place where room avail is altered is when a room is BOOKED
    // when you find available rooms, you're just finding those rooms
    // this is all this method should really do vv
    const availableRooms = this.rooms.filter(room => room.isAvailable)
    this.availableRooms = availableRooms;
    return availableRooms;
  }

  getRoomTypes() {
    return this.rooms.reduce((acc, room) => {
      if (!acc.includes(room.type)) {
        acc.push(room.type)
      }
      return acc
    }, [])
  }

  filterAvailableRoomsByType(date, type) {
    return this.availableRooms.filter(room => {
      return room.type === type
    })
  }



  

}

export default Hotel


