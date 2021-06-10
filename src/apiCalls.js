import { assignVariables, pageLoad } from './scripts';

// how to make dynamic, pass in URL??
// especially with the fetch single customer

const fetchCustomersData = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(error => console.error(`Users API Error: ${error.message}`));
};

// iteration 3 log in??
const fetchSingleCustomer = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => response.json())
    .catch(error => console.error(`Ingredients API Error: ${error.message}`));
};

const fetchAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => console.error(`Recipes API Error: ${error.message}`));
};

const fetchAllBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.error(`Recipes API Error: ${error.message}`));
}

const getData = () => {
  Promise.all([fetchCustomersData(), fetchAllRooms(), fetchAllBookings()])
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
  fetchCustomersData,
  fetchAllRooms,
  fetchAllBookings,
  getData
};
