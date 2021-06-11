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
    customer.bookings.push(userBookings)
    return userBookings
  }

  matchBookingsToRooms(customer) {
    let roomNumsBooked = this.getUserBookings(customer).map(booking => {
      return booking.roomNumber
    })
  
    let roomsBooked = this.rooms.reduce((acc, room) => {
      roomNumsBooked.forEach(roomBooked => {
        if (roomBooked === room.number) {
          acc.push(room)
        }
      })
      return acc
    }, [])
  
    return roomsBooked;
  }

  getUserExpenses(customer) {
    let matchedRooms = this.matchBookingsToRooms(customer).map(room => room.costPerNight)

    let totalExpenses = matchedRooms.reduce((total, currentRoom) => {
      total += currentRoom
      return total
    }, 0).toFixed(2)

    return totalExpenses
  }

}

export default Hotel