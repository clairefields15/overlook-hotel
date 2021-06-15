import dayjs from 'dayjs';
import Hotel from './hotel'
class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.expenses = null;
  }

  setBookings(hotel) {
    this.bookings = hotel.getFullRoomInfoForBookings(this);
    return this.bookings;
  }

  getExpenses(hotel) {
    this.expenses = hotel.getUserExpenses(this);
    return this.expenses;
  }

  getUpcomingBookings(currentDate) {
    return this.bookings.filter(booking => {
      return (
        dayjs(booking.date).isAfter(currentDate) ||
        dayjs(booking.date).isSame(currentDate)
      );
    });
  }

  getPastBookings(currentDate) {
    return this.bookings.filter(booking => {
      return dayjs(booking.date).isBefore(currentDate);
    });
  }

  sortBookingsAscendingDates(bookings) {
    return bookings.sort((a, b) => {
      return dayjs(a.date) - dayjs(b.date);
    });
  }

  sortBookingsDescendingDates(bookings) {
    return bookings.sort((a, b) => {
      return dayjs(b.date) - dayjs(a.date);
    });
  }
}

export default Customer