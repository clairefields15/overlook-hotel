// ***** ----- IMPORTS ----- ***** //
import './css/index.scss';
import './images/hotel-logo.png';
import './images/balcony-exterior.jpg';
import './images/hamburger.png';
import './images/hamburger-close.png';
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
let images = null;

// ***** ----- QUERY SELECTORS ----- ***** //
// buttons
const bookNowBtn = document.getElementById('bookNowBtn');
const checkAvailBtn = document.getElementById('checkAvailBtn');
const goHomeBtn = document.getElementById('mobileGoHome');
const hamburgerBtn = document.getElementById('hamburger');
const logInBtn = document.getElementById('logInBtn');
const mobileBookBtn = document.getElementById('mobileBook');
const mobileViewProfileBtn = document.getElementById('mobileViewProfile');
const mobileLogInBtn = document.getElementById('mobileLogIn');
const mobileLogOutBtn = document.getElementById('mobileLogOut');
const navBookBtn = document.getElementById('navBook');
const searchAgainBtn = document.getElementById('searchAgain');

// select room
const filteredResults = document.getElementById('filteredResults');
const selectRoomType = document.getElementById('selectRoomType');
const modalOverlay = document.getElementById('modalOverlay');
const arrivalDate = document.getElementById('arrivalDate');
const roomTypeForm = document.getElementById('roomTypeForm');
const selectedRoom = document.getElementById('selectedRoom');
const changeDates = document.getElementById('changeDates');
const usernameField = document.getElementById('usernameField');
const passwordField = document.getElementById('passwordField');
const errorMessage = document.getElementById('errorMessage');
const postErrorMsg = document.getElementById('postErrorMsg');
const apologyMessage = document.getElementById('apologyMessage');



// ***** ----- EVENT LISTENERS ----- ***** //

// load and log in/out
window.addEventListener('load', apiCalls.fetchHotelData);
logInBtn.addEventListener('click', () => logIn(event));
bookNowBtn.addEventListener('click', () => isCustomerLoggedIn(event));
goHomeBtn.addEventListener('click', () => isCustomerLoggedIn(event));
mobileLogInBtn.addEventListener('click', domUpdates.showLogInView);
mobileLogOutBtn.addEventListener('click', logOut)

// navigation
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
modalOverlay.addEventListener('click', domUpdates.hideOverlay);
mobileViewProfileBtn.addEventListener('click', domUpdates.showUserProfile);
searchAgainBtn.addEventListener('click', domUpdates.showBookingView);
changeDates.addEventListener('click', domUpdates.showBookingView);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
navBookBtn.addEventListener('click', domUpdates.showBookingView);

// search for room and filter rooms
checkAvailBtn.addEventListener('click', checkAvailability);
checkAvailBtn.addEventListener('click', getRoomTypes);
filteredResults.addEventListener('click', () => selectRoom(event));
selectRoomType.addEventListener('change', filterRoomsByType);
selectedRoom.addEventListener('click', () => viewOtherRooms(event));
selectedRoom.addEventListener('click', () => bookRoom(event));

// ***** ----- EVENT HANDLERS ----- ***** //

// --- Unsplash API Photos --- //

export function getPhotoURLs(data) {
  const allPhotos = data[0].preview_photos
  return allPhotos.map(photo => {
    return photo.urls.regular
  })
}

// --- Page load --- //

export function assignVariables(apiData) {
  roomsData = apiData[0].rooms;
  bookingsData = apiData[1].bookings;
  images = getPhotoURLs(apiData[2])
}

export function instantiateUser(data) {
  customer = new Customer(data);
  customer.setBookings(hotel)
  renderDashboard(customer)
  domUpdates.showLandingPageAfterLogIn(customer);
}

function renderDashboard(customer) {
  customer.setBookings(hotel);
  const expenses = customer.getExpenses(hotel);
  domUpdates.renderUserDashboard(customer, expenses, currentDate);
}

export function pageLoad() {
  const allBookings = makeBookingInstances();
  const allRooms = makeRoomInstances();
  hotel = new Hotel(allBookings, allRooms);
  setCalendarDate();

  if (customer) {
    renderDashboard(customer)
    setTimeout(function () {
      domUpdates.showUserProfile();
    }, 1500);
  }
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
    room.setImage(images)
    allRooms.push(room);
  });
  return allRooms;
}

function setCalendarDate() {
  arrivalDate.value = currentDate;
  arrivalDate.min = currentDate;
}

// --- User Log In  --- //

function isCustomerLoggedIn(event) {
  postErrorMsg.innerText = '';
  const target = event.target.id

  if (customer && target === 'bookNowBtn') {
    domUpdates.showBookingView();
  } else if (!customer && target === 'bookNowBtn') {
    domUpdates.showLogInView();
  }

  if (customer && target === 'mobileGoHome') {
    domUpdates.showLandingPageAfterLogIn(customer);
  } else if (!customer && target === 'mobileGoHome') {
    domUpdates.showLandingPage();
  }
}

function logIn(event) {
  event.preventDefault();
  const username = usernameField.value;
  const password = passwordField.value;
  
  if (!checkEmptyFields(username, password)) {
    try {
      setUser(username, password);
    } catch (error) {
      errorMessage.innerText = error;
    }
  }
}

function checkEmptyFields(username, password) {
  let emptyFields = false;
  if (username === '') {
    emptyFields = true;
    usernameField.setAttribute('placeholder', 'Username is required');
  }
  if (password === '') {
    emptyFields = true;
    passwordField.setAttribute('placeholder', 'Password is required');
  }
  return emptyFields
}

function setUser(username, password) {
  passwordField.value = '';
  usernameField.value = '';
  checkPassword(password);
  checkUsername(username);

  let id = username.slice(8);
  if (id.startsWith(0)) {
    throw new Error('Invalid user credentials');
  } else if (id) {
    apiCalls.fetchCustomer(id);
  } else {
    throw new Error('Invalid user credentials');
  }
}

function checkPassword(password) {
  if (password !== 'overlook2021') {
    throw new Error('Invalid user credentials');
  }
}

function checkUsername(username) {
  if (!username.startsWith('username')) {
    throw new Error('Invalid user credentials');
  }
}

// --- User Log Out  --- //

function logOut() {
  customer = null;
  postErrorMsg.innerText = '';
  domUpdates.showLandingPage();
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
  apologyMessage.innerHTML = '';
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
    apiCalls.bookRoom(user, date, roomNumber);
  }
}

function viewOtherRooms(event) {
  if (event.target.id === 'goBackButton') {
    postErrorMsg.innerText = ''
    domUpdates.showSearchResultsPage();
  }
}

