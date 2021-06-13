import domUpdates from './domUpdates';
import {
  assignVariables,
  pageLoad,
  errorTag,
  instantiateUser
} from './scripts';

const fetchCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(error => console.error(`Customers API Error: ${error.message}`));
};

const fetchRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => console.error(`Room API Error: ${error.message}`));
};

const fetchBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.error(`Booking API Error: ${error.message}`));
}

const fetchHotelData = () => {
  Promise.all([fetchRooms(), fetchBookings()])
    .then(data => assignVariables(data))
    .then(() => pageLoad());
};

const fetchCustomerData = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(handleLogInError)
    .then(data => instantiateUser(data))
    .catch(error => console.error(`Customer API Error: ${error.message}`));
};

//post request booking
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
    .then(handleError)
    .then(() => fetchHotelData(user.id))
    .then(() => domUpdates.showConfirmationView())
    .catch(err => console.error(`POST Request Error: ${err.message}`));
}


function handleError(response) {
  if (!response.ok) {
    domUpdates.showPostError()
    errorTag.innerText = 'Something went wrong, please try again.';
    throw new Error('Something went wrong');
  } else {
    return response.json()
  }
}

function handleLogInError(response) {
  if (!response.ok) {
    domUpdates.showLogInError();
    errorTag.innerText = 'User does not exist, please try again.';
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
  fetchCustomerData
};
