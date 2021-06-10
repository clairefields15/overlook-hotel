import { assignVariables, pageLoad } from './scripts';

const fetchCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(error => console.error(`Users API Error: ${error.message}`));
};

// iteration 3 log in??
const fetchCustomer = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => response.json())
    .catch(error => console.error(`Ingredients API Error: ${error.message}`));
};

const fetchRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => console.error(`Recipes API Error: ${error.message}`));
};

const fetchBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.error(`Recipes API Error: ${error.message}`));
}

const fetchHotelData = () => {
  Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
    .then(data => assignVariables(data))
    .then(() => pageLoad());
};

const fetchCustomerData = (id) => {
  Promise(fetchCustomer)
    .then(data => assignVariables(data))
    .then(() => pageLoad());
};




//post request booking

const bookRoom = (userID, date, roomNumber) => {
  fetch(url)
}

function handleError(response) {
  if (!response.ok) {
    errorTag.innerText = 'you fucked up';
    throw new Error('you fucked up');
  } else {
    return response => response.json()
  }
}





export default {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
  fetchHotelData
};
