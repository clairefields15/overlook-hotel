import chai from 'chai';
import Room from '../src/room'
import { rooms } from './test-data'
const expect = chai.expect;

describe('Room', () => {
  let room1, room2, room3;

  beforeEach(() => {
    room1 = new Room(rooms[0])
    room2 = new Room(rooms[1]);
    room3 = new Room(rooms[2]);
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
    expect(room2.number).to.equal(2)
  });

  it('should have a type', () => {
    expect(room1).to.have.a.property('type');
    expect(room1.type).to.equal('residential suite');
    expect(room3.type).to.equal('single room')
  });

  it('should have a bidet, or not', () => {
    expect(room1).to.have.a.property('hasBidet');
    expect(room1.hasBidet).to.equal(true);
    expect(room2.hasBidet).to.equal(false);

  });

  it('should have a bed size', () => {
    expect(room1).to.have.a.property('bedSize');
    expect(room1.bedSize).to.equal('queen');
    expect(room2.bedSize).to.equal('full');

  });

  it('should have a number of beds', () => {
    expect(room1).to.have.a.property('numBeds');
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
  });

  it('should have a cost per night', () => {
    expect(room1).to.have.a.property('costPerNight');
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);

  });

  it('should be available by default', () => {
    expect(room1).to.have.a.property('isAvailable');
    expect(room1.isAvailable).to.equal(true);
  });


});
