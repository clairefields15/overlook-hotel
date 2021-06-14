import Hotel from './hotel'
class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.expenses = null;
  }

  setBookings(hotel) {
    this.bookings = hotel.getFullRoomInfoForBookings(this)
    return this.bookings
  }

  getExpenses(hotel) {
    this.expenses = hotel.getUserExpenses(this) 
    return this.expenses
  }

}

export default Customer