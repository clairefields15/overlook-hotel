const customers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 2,
    "name": "Rocio Schuster"
  }
]


const rooms = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  }
]

// on the 22nd which rooms are available?
// rooms 2 and 3

// on the 23rd which rooms are available?
// only room 3


const bookings = [
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2020/04/22",
    "roomNumber": 1,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 2,
    "date": "2020/04/23",
    "roomNumber": 2,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 1,
    "date": "2020/04/23",
    "roomNumber": 1,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 2,
    "date": "2020/04/24",
    "roomNumber": 2,
    "roomServiceCharges": []
  }
]

export { customers, rooms, bookings }