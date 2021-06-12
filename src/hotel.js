class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
    this.availableRooms = [];
  }

  getUserBookings(customer) {
    let userBookings = this.bookings.filter(booking => {
      return booking.userID === customer.id
    })
    return userBookings
  }
  
  getFullRoomInfoForBookings(customer) {
    let bookings = this.getUserBookings(customer)
    let roomsBooked = this.rooms.reduce((acc, room) => {
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
    let matchedRooms = this.getFullRoomInfoForBookings(customer);

    let totalExpenses = matchedRooms.reduce((total, currentRoom) => {
      let rate = currentRoom.room.costPerNight
      total += rate
      return total
    }, 0).toFixed(2)

    return totalExpenses;
  }

  findBookedRooms(date) {
    return this.bookings.filter(booking => {
      return date === booking.date
    }).map(room => room.roomNumber)
  }

  findAvailableRooms(date) {
    let bookedRooms = this.findBookedRooms(date)

    this.rooms.forEach(room => {
      if (bookedRooms.includes(room.number)) {
        room.isAvailable = false
      }
    })

    let availableRooms = this.rooms.filter(room => room.isAvailable)

    return availableRooms;
  }
  

}

export default Hotel