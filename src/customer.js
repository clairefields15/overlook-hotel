import Hotel from "./hotel";

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

}

export default Customer