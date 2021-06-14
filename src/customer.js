import Hotel from './hotel'
class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  setBookings(hotel) {
    this.bookings = hotel.getFullRoomInfoForBookings(this)
    return this.bookings
  }

}

export default Customer