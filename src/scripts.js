// imports
import './css/index.scss';
import './images/hotel-logo.png';
import './images/hotel-image.jpg';
import './images/hamburger.png';
import './images/hamburger-close.png';
import './images/1-bed-room.jpg';
import domUpdates from './domUpdates'
import apiCalls from './apiCalls';
import Customer from './customer';
import Booking from './booking';
import Hotel from './hotel';
import Room from './room';

// query selectors
const hamburgerBtn = document.getElementById('hamburger');
const mobileBookBtn = document.getElementById('mobileBook');
const bookNowBtn = document.getElementById('bookNowBtn');
const checkAvailBtn = document.getElementById('checkAvailBtn');
const navBookBtn = document.getElementById('navBook');
const bookRoomBtn = document.getElementById('bookRoomButton')
const filteredResults = document.getElementById('filteredResults');
const searchResultsPage = document.getElementById('searchResultsPage');
const mobileViewProfileBtn = document.getElementById('mobileViewProfile');
const modalOverlay = document.getElementById('modalOverlay');
const arrivalDate = document.getElementById('arrivalDate');
const searchAgainBtn = document.getElementById('searchAgain')
const selectRoomType = document.getElementById('selectRoomType');
const roomTypeForm = document.getElementById('roomTypeForm');
const goBackButton = document.getElementById('goBackButton')
const selectedRoom = document.getElementById('selectedRoom');
const changeDates = document.getElementById('changeDates');
export const errorTag = document.getElementById('errorTag');
const mobileLogInBtn = document.getElementById('mobileLogIn');
const goHomeBtn = document.getElementById('mobileGoHome');
const logInBtn = document.getElementById('logInBtn');
const usernameField = document.getElementById('usernameField');
const passwordField = document.getElementById('passwordField');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError')

// const mobileViewTripsBtn = document.getElementById('mobileViewTrips');
// const navLogInBtn = document.getElementById('navLogIn');
// const navTripsBtn = document.getElementById('navTrips');
// const navProfileBtn = document.getElementById('navProfile');
// const desktopNavSection = document.getElementById('desktopNav');
// const landingPage = document.getElementById('landingPage');
// const selectPage = document.getElementById('selectPage');
// const bookingPage = document.getElementById('bookingPage');
// const confirmationPage = document.getElementById('confirmationPage');
  
// variables
let dayjs = require('dayjs')

let customer, booking, room, hotel, currentDate;
let customersData, roomsData, bookingsData

// event listeners
window.addEventListener('load', fetchHotelData);
goHomeBtn.addEventListener('click', domUpdates.showLandingPage)
mobileLogInBtn.addEventListener('click', domUpdates.showLogInView)
searchAgainBtn.addEventListener('click', domUpdates.showBookingView);
changeDates.addEventListener('click', domUpdates.showBookingView)
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
modalOverlay.addEventListener('click', domUpdates.hideOverlay);
bookNowBtn.addEventListener('click', isCustomerLoggedIn);
navBookBtn.addEventListener('click', domUpdates.showBookingView);
checkAvailBtn.addEventListener('click', checkAvailability);
checkAvailBtn.addEventListener('click', getRoomTypes);
filteredResults.addEventListener('click', () => selectRoom(event));
mobileViewProfileBtn.addEventListener('click', domUpdates.showUserProfile);
selectRoomType.addEventListener('change', filterRoomsByType);
selectedRoom.addEventListener('click', () => goBackToSearchResults(event))
selectedRoom.addEventListener('click', () => bookRoom(event));
logInBtn.addEventListener('click', () => logIn(event));



//event handlers and functions
export function fetchHotelData() {
  apiCalls.fetchHotelData();
}

export function assignVariables(data) {
  roomsData = data[0].rooms;
  bookingsData = data[1].bookings;
}

export function pageLoad() {
  const allBookings = makeBookingInstances()
  const allRooms = makeRoomInstances()
  hotel = new Hotel(allBookings, allRooms)
  getDate()
}

function makeRoomInstances() {
  const allRooms = []
  roomsData.forEach(roomObj => {
    room = new Room (roomObj)
    allRooms.push(room)
  })
  return allRooms
}

function makeBookingInstances() {
  const allBookings = [];
  bookingsData.forEach(bookingObj => {
    booking = new Booking(bookingObj);
    allBookings.push(booking);
  });
  return allBookings;
}

function getDate() {
  currentDate = dayjs(Date.now()).format('YYYY-MM-DD');
  arrivalDate.value = currentDate;
  arrivalDate.min = currentDate;
}

function logIn(event) {
  event.preventDefault()
  const username = usernameField.value;
  const password = passwordField.value;
  checkEmptyFields(username, password);

  try {
    setUser(username, password)
  } catch (error) {
    passwordError.innerText = error;
    hideError()
  }
}

function hideError() {
  setTimeout(() => passwordError.innerText = '', 2700)
}

function checkEmptyFields(username, password) {
  if (username === '') {
    usernameField.setAttribute('placeholder', '*username is required*')
  }
  if (password === '') {
    passwordField.setAttribute('placeholder', '*password is required*');
  }
}

function setUser(username, password) {
  checkPassword(password)
  checkUsername(username)
  usernameField.value = '';
  passwordField.value = '';
  let id = username.slice(8);
  if (id) {
    apiCalls.fetchCustomerData(id);
  } else {
    domUpdates.showLogInError();
    errorTag.innerText = 'User does not exist, please try again.';
    throw new Error('User does not exist');
  }
}

function checkPassword(password) {
  if (password !== 'overlook2021') {
    passwordField.value = ''
    throw new Error('Incorrect password');
  }
}

function checkUsername(username) {
  if (!username.startsWith('username')) {
    usernameField.value = ''
    throw new Error ('Incorrect username')
  }
}

export function instantiateUser(data) {
  customer = new Customer(data);
  const userBookings = hotel.getFullRoomInfoForBookings(customer);
  const userExpenses = hotel.getUserExpenses(customer);
  const sortedBookings = sortUserBookingsByDate(userBookings);
  domUpdates.renderUserDashboard(
    customer,
    sortedBookings,
    userExpenses,
    currentDate
  );

  domUpdates.showLandingPageAfterLogIn(customer)
}

function sortUserBookingsByDate(bookings) {
  return bookings.sort((a, b) => {
    return dayjs(a.booking.date) - dayjs(b.booking.date);
  });
}

//username: customer50 (where 50 is the ID of the user)

// startsWith(customer)
// makes sense to fetch all the customers to update the data source

// checking the '50' against the users API, does a user with this ID exist
// if the id exists, fetch a single customer

// on authentication you can fetch just the single customer
// whatever number they put in, try to fetch from the API

// try not to rely on users that are in storage to check the userIDs
// you could see all of the users inside of the dev tools/browser
// try to make a fetch request for a single user, based on the id
// if 404 that user doesn't exist

// within the manager class you might need to fetch all the customers but generally, not

function isCustomerLoggedIn() {
  if (customer) {
    domUpdates.showBookingView()
  } else if (!customer) {
    domUpdates.showLogInView()
  }
}

function checkAvailability() {
  const input = dayjs(arrivalDate.value).format('YYYY/MM/DD');
  const results = hotel.findAvailableRooms(input);
  domUpdates.showSearchResultsPage();

  if (results.length === 0) {
    domUpdates.renderApology();
  } else {
    domUpdates.renderAvailableRooms(results);
    domUpdates.renderYourDates(input)
  }
}

function getRoomTypes() {
  const results = hotel.getRoomTypes()
  domUpdates.populateRoomTypeSelector(results)
}

function filterRoomsByType() {
  const selection = roomTypeForm.value;
  const results = hotel.filterAvailableRoomsByType(selection)

  if (results.length === 0) {
    domUpdates.renderApology();
  } else {
    domUpdates.renderAvailableRooms(results);
  }
}

function selectRoom(event) {
  const date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
  const roomNumber = parseInt(event.target.closest('.room-card').id)
  const roomDetails = hotel.returnRoomDetails(roomNumber)
  domUpdates.showRoomDetails()
  domUpdates.renderSelectedRoom(roomDetails, date);
}

function goBackToSearchResults(event) {
  if (event.target.id === 'goBackButton') {
    domUpdates.showSearchResultsPage();
  }
}

function bookRoom(event) {
  if (event.target.classList.contains('book-room-btn')) {
    const user = customer
    const date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
    const roomNumber = parseInt(event.target.id)

    apiCalls.bookRoom(user, date, roomNumber)
  }
}





