import chai from 'chai';
import Customer from '../src/customer';
import Booking from '../src/booking';
import Room from '../src/room';
import Hotel from '../src/hotel';


import { customers, rooms, bookings } from './test-data';
const expect = chai.expect;

describe.only('Hotel', () => {
  let hotel, booking1, booking2, booking3, booking4, allBookings, 
  room1, room2, room3, allRooms, leatha;

  beforeEach(() => {
    hotel = new Hotel (allBookings, allRooms)
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
    booking3 = new Booking(bookings[2]);
    booking4 = new Booking(bookings[3]);
    allBookings = [booking1, booking2, booking3, booking4]
    room1 = new Room(rooms[0])
    room2 = new Room(rooms[1])
    room3 = new Room(rooms[2])
    allRooms = [room1, room2, room3]
    leatha = new Customer(customers[0]);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should instantiate a hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should store booking data', () => {
    expect(hotel.bookings).to.deep.equal(allBookings)
  })

  it('should store all room data', () => {
    expect(hotel.rooms).to.deep.equal(allRooms)
  })

  it('should have a way to store available rooms', () => {
    expect(hotel.availableRooms).to.deep.equal([]);
  });

  
});
