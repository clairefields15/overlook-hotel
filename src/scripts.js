// ***** ----- IMPORTS ----- ***** //
import './css/index.scss';
import './images/hotel-logo.png';
import './images/hotel-image.jpg';
import './images/hamburger.png';
import './images/hamburger-close.png';
import './images/1-bed-room.jpg';
import domUpdates from './domUpdates';
import apiCalls from './apiCalls';
import Customer from './customer';
import Booking from './booking';
import Hotel from './hotel';
import Room from './room';

// ***** ----- EXPORTS ----- ***** //
export const errorTag = document.getElementById('errorTag');


// ***** ----- DEPENDENTS ----- ***** //
let dayjs = require('dayjs');
const currentDate = dayjs(Date.now()).format('YYYY-MM-DD');
let customer = null;
let booking = null;
let room = null;
let hotel = null;
let roomsData = null;
let bookingsData = null;

// ***** ----- QUERY SELECTORS ----- ***** //
const hamburgerBtn = document.getElementById('hamburger');
const mobileBookBtn = document.getElementById('mobileBook');
const bookNowBtn = document.getElementById('bookNowBtn');
const checkAvailBtn = document.getElementById('checkAvailBtn');
const navBookBtn = document.getElementById('navBook');
const filteredResults = document.getElementById('filteredResults');
const mobileViewProfileBtn = document.getElementById('mobileViewProfile');
const modalOverlay = document.getElementById('modalOverlay');
const arrivalDate = document.getElementById('arrivalDate');
const searchAgainBtn = document.getElementById('searchAgain');
const selectRoomType = document.getElementById('selectRoomType');
const roomTypeForm = document.getElementById('roomTypeForm');
const selectedRoom = document.getElementById('selectedRoom');
const changeDates = document.getElementById('changeDates');
const mobileLogInBtn = document.getElementById('mobileLogIn');
const goHomeBtn = document.getElementById('mobileGoHome');
const logInBtn = document.getElementById('logInBtn');
const usernameField = document.getElementById('usernameField');
const passwordField = document.getElementById('passwordField');
const passwordError = document.getElementById('passwordError');

// ***** ----- EVENT LISTENERS ----- ***** //
window.addEventListener('load', apiCalls.fetchHotelData);
goHomeBtn.addEventListener('click', domUpdates.showLandingPage);
mobileLogInBtn.addEventListener('click', domUpdates.showLogInView);
searchAgainBtn.addEventListener('click', domUpdates.showBookingView);
changeDates.addEventListener('click', domUpdates.showBookingView);
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
selectedRoom.addEventListener('click', () => viewOtherRooms(event));
selectedRoom.addEventListener('click', () => bookRoom(event));
logInBtn.addEventListener('click', () => logIn(event));

// ***** ----- EVENT HANDLERS ----- ***** //

// --- Page load --- //

export function assignVariables(apiData) {
  roomsData = apiData[0].rooms;
  bookingsData = apiData[1].bookings;
}

export function instantiateUser(data) {
  customer = new Customer(data);
  renderDashboard(customer)
  domUpdates.showLandingPageAfterLogIn(customer);
}

function renderDashboard(customer) {
  const userBookings = customer.setBookings(hotel);
  const userExpenses = customer.getExpenses(hotel);
  const sortedBookings = sortUserBookingsByDate(userBookings);
  domUpdates.renderUserDashboard(
    customer,
    sortedBookings,
    userExpenses,
    currentDate
  );
}

export function pageLoad() {
  const allBookings = makeBookingInstances();
  const allRooms = makeRoomInstances();
  hotel = new Hotel(allBookings, allRooms);
  setDate();

  // this runs after a successful booking:
  if (customer) {
    renderDashboard(customer)
    setTimeout(function () {
      domUpdates.showUserProfile();
    }, 1500);
  }
}

function sortUserBookingsByDate(bookings) {
  return bookings.sort((a, b) => {
    return dayjs(a.booking.date) - dayjs(b.booking.date);
  });
}

function makeBookingInstances() {
  const allBookings = [];
  bookingsData.forEach(bookingObj => {
    booking = new Booking(bookingObj);
    allBookings.push(booking);
  });
  return allBookings;
}

function makeRoomInstances() {
  const allRooms = [];
  roomsData.forEach(roomObj => {
    room = new Room(roomObj);
    allRooms.push(room);
  });
  return allRooms;
}

function setDate() {
  arrivalDate.value = currentDate;
  arrivalDate.min = currentDate;
}

// --- User Log In  --- //

function isCustomerLoggedIn() {
  if (customer) {
    domUpdates.showBookingView();
  } else if (!customer) {
    domUpdates.showLogInView();
  }
}

function logIn(event) {
  event.preventDefault();
  const username = usernameField.value;
  const password = passwordField.value;
  checkEmptyFields(username, password);

  try {
    setUser(username, password);
  } catch (error) {
    passwordError.innerText = error;
    domUpdates.hideError();
  }
}

function checkEmptyFields(username, password) {
  if (username === '') {
    usernameField.setAttribute('placeholder', '*username is required*');
  }
  if (password === '') {
    passwordField.setAttribute('placeholder', '*password is required*');
  }
}

function setUser(username, password) {
  passwordField.value = '';
  checkPassword(password);
  checkUsername(username);

  let id = username.slice(8);
  if (id.startsWith(0)) {
    domUpdates.showLogInError();
    errorTag.innerText = 'User does not exist, please try again.';
    throw new Error('User does not exist');
  } else if (id) {
    apiCalls.fetchCustomer(id);
  } else {
    domUpdates.showLogInError();
    errorTag.innerText = 'User does not exist, please try again.';
    throw new Error('User does not exist');
  }
}

function checkPassword(password) {
  if (password !== 'overlook2021') {
    passwordField.value = '';
    throw new Error('Incorrect password');
  }
}

function checkUsername(username) {
  if (!username.startsWith('username')) {
    usernameField.value = '';
    throw new Error('Incorrect username');
  }
}

// --- Search for Room  --- //

function checkAvailability() {
  const input = dayjs(arrivalDate.value).format('YYYY/MM/DD');
  const results = hotel.findAvailableRooms(input);
  domUpdates.showSearchResultsPage();

  if (results.length === 0) {
    domUpdates.renderApology();
  } else {
    domUpdates.renderAvailableRooms(results);
    domUpdates.renderYourDates(input);
  }
}

// --- Filter Rooms By Type  --- //

function getRoomTypes() {
  const results = hotel.getRoomTypes();
  domUpdates.populateRoomTypeSelector(results);
}

function filterRoomsByType() {
  const selection = roomTypeForm.value;
  const results = hotel.filterAvailableRoomsByType(selection);

  if (results.length === 0) {
    domUpdates.renderApology();
  } else {
    domUpdates.renderAvailableRooms(results);
  }
}


// --- Book a Room  --- //

function selectRoom(event) {
  const date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
  const roomNumber = parseInt(event.target.closest('.room-card').id);
  const roomDetails = hotel.returnRoomDetails(roomNumber);
  domUpdates.showRoomDetails();
  domUpdates.renderSelectedRoom(roomDetails, date);
}

function bookRoom(event) {
  if (event.target.classList.contains('book-room-btn')) {
    const user = customer;
    const date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
    const roomNumber = parseInt(event.target.id);
    console.log('before', hotel)
    apiCalls.bookRoom(user, date, roomNumber);
  }
}

function viewOtherRooms(event) {
  if (event.target.id === 'goBackButton') {
    domUpdates.showSearchResultsPage();
  }
}

