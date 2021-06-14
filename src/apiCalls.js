import domUpdates from './domUpdates';
import {
  assignVariables,
  pageLoad,
  errorTag,
  instantiateUser
} from './scripts';

// Endpoints

const endpoints = {
  rooms: 'http://localhost:3001/api/v1/rooms',
  bookings: 'http://localhost:3001/api/v1/bookings',
  customers: 'http://localhost:3001/api/v1/customers'
}


const fetchRooms = () => {
  return fetch(endpoints.rooms)
    .then(response => response.json())
    .catch(error => console.error(`Room API Error: ${error.message}`));
};

const fetchBookings = () => {
  return fetch(endpoints.bookings)
    .then(response => response.json())
    .catch(error => console.error(`Booking API Error: ${error.message}`));
}

const fetchCustomers = () => {
  return fetch(endpoints.customers)
    .then(response => response.json())
    .catch(error => console.error(`Customers API Error: ${error.message}`));
};

const fetchCustomer = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(handleLogInError)
    .then(data => instantiateUser(data))
    .catch(error => console.error(`Customer API Error: ${error.message}`));
};

// fetch rooms and bookings
const fetchHotelData = () => {
  Promise.all([fetchRooms(), fetchBookings()])
    .then(data => assignVariables(data))
    .then(() => pageLoad());
};


//post request booking

// might want to just run instantiate user after booking?
const bookRoom = (user, dateSelected, roomNum) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: user.id,
      date: dateSelected,
      roomNumber: roomNum
    })
  })
    .then(handlePostError)
    .then(()=> domUpdates.showConfirmationView())
    .then(() => fetchHotelData())
    .then(() => pageLoad())
    .catch(err => console.error(`POST Request Error: ${err.message}`));
}


function handlePostError(response) {
  if (!response.ok) {
    domUpdates.showPostError(response)
    throw new Error('Something went wrong');
  } else {
    return response.json()
  }
}

function handleLogInError(response) {
  if (!response.ok) {
    domUpdates.showLogInError(response);
    throw new Error('User does not exist');
  } else {
    return response.json();
  }
}

export default {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
  fetchHotelData,
  bookRoom,
  fetchCustomer
};
