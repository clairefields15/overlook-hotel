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

// const mobileLogInBtn = document.getElementById('mobileLogIn');
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
window.addEventListener('load', getDate)
searchAgainBtn.addEventListener('click', domUpdates.showBookingView);
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
modalOverlay.addEventListener('click', domUpdates.hideOverlay);
bookNowBtn.addEventListener('click', domUpdates.showBookingView);
navBookBtn.addEventListener('click', domUpdates.showBookingView);
checkAvailBtn.addEventListener('click', checkAvailability);
checkAvailBtn.addEventListener('click', getRoomTypes);
filteredResults.addEventListener('click', () => selectRoom(event));
mobileViewProfileBtn.addEventListener('click', domUpdates.showUserProfile);
selectRoomType.addEventListener('change', filterRoomsByType);
selectedRoom.addEventListener('click', () => goBackToSearchResults(event))
selectedRoom.addEventListener('click', () => bookRoom(event));

//event handlers and functions
export function fetchHotelData() {
  apiCalls.fetchHotelData();
}

export function assignVariables(data) {
  customersData = data[0].customers;
  roomsData = data[1].rooms;
  bookingsData = data[2].bookings;
}


export function pageLoad() {
  customer = new Customer(customersData[1])
  const allBookings = makeBookingInstances()
  const allRooms = makeRoomInstances()
  hotel = new Hotel(allBookings, allRooms)
  const userBookings = hotel.getFullRoomInfoForBookings(customer);
  const userExpenses = hotel.getUserExpenses(customer)
  domUpdates.renderUserDashboard(customer, userBookings, userExpenses);
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
  //use this later:
  //currentDate = dayjs(Date.now()).format('YYYY-MM-DD');
  currentDate = dayjs('2020/2/14').format('YYYY-MM-DD');
  arrivalDate.value = currentDate;
  arrivalDate.min = currentDate;
}


function checkAvailability() {
  const input = dayjs(arrivalDate.value).format('YYYY/MM/DD');
  const results = hotel.findAvailableRooms(input);
  domUpdates.showSearchResultsPage();

  if (results.length === 0) {
    domUpdates.renderApology();
  } else {
    domUpdates.renderAvailableRooms(results);
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
    const roomNumber = event.target.id
    const date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
    console.log('room number', roomNumber);
    console.log('user', customer.id)
    console.log('selected date', date)

  }

  domUpdates.showConfirmationView;
}



/// you should not be able to book if you're not logged in!!! 
// so maybe when you click book now it prompts you to log in?

//username: customer50 (where 50 is the ID of the user)
//password: overlook2021

// passwordField.value === overlook2021
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





