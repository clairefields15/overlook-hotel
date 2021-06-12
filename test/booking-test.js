import chai from 'chai';
import Customer from '../src/customer' 
import Booking from '../src/booking' 
import Room from '../src/room' 

import { customers, rooms, bookings } from './test-data'
const expect = chai.expect;

describe.only('Booking', () => {
  let booking1, booking2;

  beforeEach(() => {
    booking1 = new Booking(bookings[0])
    booking2 = new Booking(bookings[1])
  })

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should instantiate a booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should have an id', () => {
    expect(booking1).to.have.a.property('id');
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz')
  })

  it('should have a user ID associated with it', () => {
    expect(booking1).to.have.a.property('userID');
    expect(booking1.userID).to.equal(1);
  });

  it('should have a date', () => {
    expect(booking1).to.have.a.property('date');
    expect(booking1.date).to.equal('2020/04/22');
  });

  it('should have a room number', () => {
    expect(booking1).to.have.a.property('roomNumber');
    expect(booking1.roomNumber).to.equal(1);
  });

  it('should have a user ID associated with it', () => {
    expect(booking1).to.have.a.property('userID');
    expect(booking1.userID).to.equal(1);
  });

  it('should have room service charges', () => {
    expect(booking1).to.have.a.property('roomServiceCharges');
    expect(booking1.roomServiceCharges).to.deep.equal([]);
  });

  it('should be able to instantiate a different booking', () => {
    expect(booking2).to.be.an.instanceOf(Booking);
    expect(booking2.id).to.equal('5fwrgu4i7k55hl6t5');
    expect(booking2.userID).to.equal(2);
    expect(booking2.date).to.equal('2020/04/23');
    expect(booking2.roomNumber).to.equal(2);
    expect(booking2.roomServiceCharges).to.deep.equal([]);



  })

})