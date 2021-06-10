import chai from 'chai';
import Customer from '../src/customer' 
import { customers, rooms, bookings } from './test-data'
const expect = chai.expect;

describe('Customer', () => {
  let customer1, customer2;

  beforeEach(() => {
    customer1 = new Customer(customers[0])
    customer2 = new Customer(customers[1])
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

  it.skip('should have a way to hold onto bookings', () => {
    //have a property of an array of bookings
  })

  it.skip('should be able to book a room', () => {
    customer1.bookRoom(rooms[0])
    // so you click on the room, you click all the way though, pay
    // the room is then booked
    // wtf does that mean
    // you have selected a particular room with a particular id/properties
    // this method needs access to the room you have chosen as well as the date chosen
    // 
    // need to create a new Booking object

    // POST :

    // { "userID": 48, "date": "2019/09/23", "roomNumber": 4 }
    expect(customer1)

  })

  it.skip('should be able to get total expenses', () => {
    //total money spend on bookings past/present/future

  })

  

});
