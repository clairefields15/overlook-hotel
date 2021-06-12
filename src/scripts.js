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
let hamburgerBtn = document.getElementById('hamburger');
let mobileBookBtn = document.getElementById('mobileBook');
let bookNowBtn = document.getElementById('bookNowBtn');
let checkAvailBtn = document.getElementById('checkAvailBtn');
let navBookBtn = document.getElementById('navBook');
let bookRoomBtn = document.getElementById('bookRoomButton')
let searchResultsPage = document.getElementById('searchResultsPage');
let mobileViewProfileBtn = document.getElementById('mobileViewProfile');
let modalOverlay = document.getElementById('modalOverlay');
let arrivalDate = document.getElementById('arrivalDate');

// let mobileLogInBtn = document.getElementById('mobileLogIn');
// let mobileViewTripsBtn = document.getElementById('mobileViewTrips');
// let navLogInBtn = document.getElementById('navLogIn');
// let navTripsBtn = document.getElementById('navTrips');
// let navProfileBtn = document.getElementById('navProfile');
// let desktopNavSection = document.getElementById('desktopNav');
// let landingPage = document.getElementById('landingPage');
// let selectPage = document.getElementById('selectPage');
// let bookingPage = document.getElementById('bookingPage');
// let confirmationPage = document.getElementById('confirmationPage');
  
// variables
let dayjs = require('dayjs')

let customer, booking, room, hotel, currentDate;
let customersData, roomsData, bookingsData

// event listeners
window.addEventListener('load', fetchHotelData);
window.addEventListener('load', getDate)
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
modalOverlay.addEventListener('click', domUpdates.hideOverlay);
bookNowBtn.addEventListener('click', domUpdates.showBookingView);
navBookBtn.addEventListener('click', domUpdates.showBookingView);
// instead of just changing the view, later check avail will run a whole bunch of other stuff
checkAvailBtn.addEventListener('click', checkAvailability);
searchResultsPage.addEventListener('click', () => selectRoom(event))
bookRoomBtn.addEventListener('click', domUpdates.showConfirmationView)
mobileViewProfileBtn.addEventListener('click', domUpdates.showUserProfile);

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
  let allBookings = makeBookingInstances()
  let allRooms = makeRoomInstances()
  hotel = new Hotel(allBookings, allRooms)
  let userBookings = hotel.getFullRoomInfoForBookings(customer);
  let userExpenses = hotel.getUserExpenses(customer)
  domUpdates.renderUserDashboard(customer, userBookings, userExpenses);
}

function makeRoomInstances() {
  let allRooms = []
  roomsData.forEach(roomObj => {
    room = new Room (roomObj)
    allRooms.push(room)
  })
  return allRooms
}

function makeBookingInstances() {
  let allBookings = [];
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
  let input = dayjs(arrivalDate.value).format('YYYY/MM/DD');
  let results = hotel.findAvailableRooms(input);

  domUpdates.showSearchResultsPage();
  domUpdates.renderAvailableRooms(results);
}


function selectRoom(event) {
  let target = event.target.closest('.room-card').id
  // will have to pass target to some class file to render the appropriate card on the next page
  if (target === '1') {
    domUpdates.showRoomDetails()
  }
}






/// you should not be able to book if you're not logged in!!! 
// so maybe when you click book now it prompts you to log in

