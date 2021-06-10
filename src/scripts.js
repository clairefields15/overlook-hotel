// imports
import './css/index.scss';
import './images/hotel-logo.png';
import './images/hotel-image.jpg';
import './images/hamburger.png';
import './images/hamburger-close.png';
import './images/1-bed-room.jpg';
import domUpdates from './domUpdates'

// query selectors
let hamburgerBtn = document.getElementById('hamburger');
let mobileBookBtn = document.getElementById('mobileBook');
let bookNowBtn = document.getElementById('bookNowBtn');
let checkAvailBtn = document.getElementById('checkAvailBtn');
let navBookBtn = document.getElementById('navBook');
let bookRoomBtn = document.getElementById('bookRoomButton')
let mobileLogInBtn = document.getElementById('mobileLogIn');
let mobileViewTripsBtn = document.getElementById('mobileViewTrips');
let mobileViewProfileBtn = document.getElementById('mobileViewProfile');
let navLogInBtn = document.getElementById('navLogIn');
let navTripsBtn = document.getElementById('navTrips');
let navProfileBtn = document.getElementById('navProfile');
let desktopNavSection = document.getElementById('desktopNav');
let landingPage = document.getElementById('landingPage');
let selectPage = document.getElementById('selectPage');
let searchResultsPage = document.getElementById('searchResultsPage');
let bookingPage = document.getElementById('bookingPage');
let confirmationPage = document.getElementById('confirmationPage');
  
// variables
let dayjs = require('dayjs')


// event listeners
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
bookNowBtn.addEventListener('click', domUpdates.showBookingView);
navBookBtn.addEventListener('click', domUpdates.showBookingView);
// instead of just changing the view, later check avail will run a whole bunch of other stuff
checkAvailBtn.addEventListener('click', domUpdates.checkAvailability);
// this will actually do a lot of logic, should be called selectRoom
// event listener on the window will be looking for which room you clicked on
searchResultsPage.addEventListener('click', () => selectRoom(event))
bookRoomBtn.addEventListener('click', domUpdates.showConfirmationView)


//event handlers and functions

function selectRoom(event) {
  let target = event.target.closest('.room-card').id
  if (target === '1') {
    domUpdates.showRoomDetails()
  }

}



