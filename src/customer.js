import Hotel from "./hotel";

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  getBookings() {
    return this.bookings
  }

  setBookings(booking) {
    this.bookings.push(booking)

  }


}

export default Customer