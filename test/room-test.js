import chai from 'chai';
import Customer from '../src/customer' 
import Room from '../src/room'
import { customers, rooms, bookings } from './test-data'
const expect = chai.expect;

describe.only('Customer', () => {
  let customer1, customer2, room1, room2, room3;

  beforeEach(() => {
    room1 = new Room(rooms[0])
    room2 = new Room(rooms[1]);
    room3 = new Room(rooms[2]);
    customer1 = new Customer(customers[0]);
    customer2 = new Customer(customers[1]);

  })

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should instantiate a room', () => {
    expect(room1).to.be.an.instanceOf(Room);
  });

  it('should have a room number', () => {
    expect(room1).to.have.a.property('number');
    expect(room1.number).to.equal(1);
  });

  it('should have a type', () => {
    expect(room1).to.have.a.property('type');
    expect(room1.type).to.equal('residential suite');
  });

  it('should have a bidet, or not', () => {
    expect(room1).to.have.a.property('hasBidet');
    expect(room1.hasBidet).to.equal(true);
  });

  it('should have a bed size', () => {
    expect(room1).to.have.a.property('bedSize');
    expect(room1.bedSize).to.equal('queen');
  });

  it('should have a number of beds', () => {
    expect(room1).to.have.a.property('numBeds');
    expect(room1.numBeds).to.equal(1);
  });

  it('should have a cost per night', () => {
    expect(room1).to.have.a.property('costPerNight');
    expect(room1.costPerNight).to.equal(358.4);
  });


});
