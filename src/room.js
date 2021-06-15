class Room {
  constructor(room) {
    this.number = room.number;
    this.type = room.roomType;
    this.hasBidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
    this.isAvailable = true;
    this.imageURL;
  }

  setImage(images) {
    if (this.numBeds === 2) {
      this.imageURL = images[1]
    } else if (this.type === 'suite') {
      this.imageURL = images[0]
    } else if (this.type === 'single room') {
      this.imageURL = images[2]
    } else {
      this.imageURL = images[3]
    }
  }

}

export default Room