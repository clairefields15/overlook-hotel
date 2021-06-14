import chai from 'chai';
import Customer from '../src/customer' 
import Hotel from '../src/hotel'
import Booking from '../src/booking'
import Room from '../src/room'
import { customers, rooms, bookings } from './test-data'
const expect = chai.expect;

describe('Customer', () => {
  let hotel,
    booking1,
    booking2,
    booking3,
    booking4,
    allBookings,
    room1,
    room2,
    room3,
    allRooms,
    customer1,
    customer2;

  beforeEach(() => {
    customer1 = new Customer(customers[0])
    customer2 = new Customer(customers[1])
    hotel = new Hotel(allBookings, allRooms);
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
    booking3 = new Booking(bookings[2]);
    booking4 = new Booking(bookings[3]);
    allBookings = [booking1, booking2, booking3, booking4];
    room1 = new Room(rooms[0]);
    room2 = new Room(rooms[1]);
    room3 = new Room(rooms[2]);
    allRooms = [room1, room2, room3];
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should instantiate a customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should have an id', () => {
    expect(customer1).to.have.a.property('id');
    expect(customer1.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(customer1).to.have.a.property('name');
    expect(customer1.name).to.equal('Leatha Ullrich');
  });

  it('should be able to instantiate a different customer', () => {
    expect(customer2).to.be.an.instanceOf(Customer);
    expect(customer2.id).to.equal(2);
    expect(customer2.name).to.equal('Rocio Schuster');
  })

  it('should start out with no bookings', () => {
    expect(customer1).to.have.a.property('bookings');
    expect(customer1.bookings).to.deep.equal([]);
  })

  describe('setBookings()', () => {
    
    it('should be able to store all bookings', () => {
      let booking = [
        {
          room: {
            number: 1,
            type: 'residential suite',
            hasBidet: true,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 358.4,
            isAvailable: true
          },
          date: '2020/04/22'
        },
        {
          room: {
            number: 1,
            type: 'residential suite',
            hasBidet: true,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 358.4,
            isAvailable: true
          },
          date: '2020/04/23'
        }
      ]
  
      customer1.setBookings(hotel)
      expect(customer1.bookings).to.deep.equal(booking);
    })

  })

  describe('getExpenses()', () => {

    it('should be able to return a users expenses', () => {

      expect(customer1.expenses).to.equal(null)
      expect(customer1.getExpenses(hotel)).to.equal('716.80');
    })

  })

});
