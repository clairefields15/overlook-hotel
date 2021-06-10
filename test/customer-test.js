import chai from 'chai';
import Customer from '../src/customer' 
import { customers, rooms, bookings } from './test-data'
const expect = chai.expect;

describe.only('Customer', () => {
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

  

});
