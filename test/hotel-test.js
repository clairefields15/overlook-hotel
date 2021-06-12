import chai from 'chai';
import Customer from '../src/customer';
import Booking from '../src/booking';
import Room from '../src/room';
import Hotel from '../src/hotel';


import { customers, rooms, bookings } from './test-data';
const expect = chai.expect;

describe.only('Hotel', () => {
  let hotel, booking1, booking2, booking3, booking4, allBookings, 
    room1, room2, room3, allRooms, leatha, rocio;

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
    rocio = new Customer(customers[1]);
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

  it('should be able to get user bookings', () => {
    let leathaBookings = hotel.getUserBookings(leatha)
    let bookings = [
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 1,
        date: '2020/04/22',
        roomNumber: 1,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6t6',
        userID: 1,
        date: '2020/04/23',
        roomNumber: 1,
        roomServiceCharges: []
      }
    ]
    expect(leathaBookings).to.deep.eq(bookings)
  })

  it('should be able to match rooms with bookings', () => {
    let bookingInfo = hotel.getFullRoomInfoForBookings(leatha)
    let bookingsAndRooms = [
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
        booking: {
          id: '5fwrgu4i7k55hl6sz',
          userID: 1,
          date: '2020/04/22',
          roomNumber: 1,
          roomServiceCharges: []
        }
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
        booking: {
          id: '5fwrgu4i7k55hl6t6',
          userID: 1,
          date: '2020/04/23',
          roomNumber: 1,
          roomServiceCharges: []
        }
      }
    ]
    expect(bookingInfo).to.deep.equal(bookingsAndRooms)
  })

  it('should be able to calculate user expenses', () => {
    let userExpenses = hotel.getUserExpenses(leatha)
    let userExpenses2 = hotel.getUserExpenses(rocio)
    expect(userExpenses).to.equal('716.80');
    expect(userExpenses2).to.equal('954.76');  
  })

  it('should be able to find which rooms are booked on a certain date', () => {
    let roomNum = hotel.findBookedRooms('2020/04/22');
    expect(roomNum).to.deep.equal([1]);
  })

  it('should be able to find which rooms are available on a certain date', () => {
    let availableRooms = hotel.findAvailableRooms('2020/04/22')
    expect(availableRooms).to.deep.equal([room2, room3])
  })

  it('should be able to return all room types', () => {
    let roomTypes = hotel.getRoomTypes()
    expect(roomTypes).to.deep.equal([
      'residential suite',
      'suite',
      'single room'
    ]);
  })

  it('should be able to filter available rooms by type', () => {
    hotel.findAvailableRooms('2020/04/24');
    let availableRooms = hotel.filterAvailableRoomsByType('2020/04/24', 'single room');
    expect(availableRooms).to.deep.equal([room3])

  })

  
});
