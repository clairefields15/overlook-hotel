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
// let mobileLogInBtn = document.getElementById('mobileLogIn');
// let mobileViewTripsBtn = document.getElementById('mobileViewTrips');
// let mobileViewProfileBtn = document.getElementById('mobileViewProfile');
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
let customer, booking, room, hotel;
let customersData, roomsData, bookingsData

// event listeners
window.addEventListener('load', fetchHotelData);
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
bookNowBtn.addEventListener('click', domUpdates.showBookingView);
navBookBtn.addEventListener('click', domUpdates.showBookingView);
// instead of just changing the view, later check avail will run a whole bunch of other stuff
checkAvailBtn.addEventListener('click', domUpdates.checkAvailability);
searchResultsPage.addEventListener('click', () => selectRoom(event))
bookRoomBtn.addEventListener('click', domUpdates.showConfirmationView)


//event handlers and functions
export function fetchHotelData() {
  apiCalls.fetchHotelData();
}

export function assignVariables(data) {
  customersData = data[0].customers;
  roomsData = data[1].rooms;
  bookingsData = data[0].bookings;
}

export function pageLoad() {
  // instantiate a random user on load (for now, soon there will be log in page)
  customer = new Customer(customersData[0])
  console.log(customer)
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

