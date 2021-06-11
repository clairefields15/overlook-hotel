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
}

export default Hotel