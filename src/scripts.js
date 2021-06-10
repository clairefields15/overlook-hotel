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
let mobileLogInBtn = document.getElementById('mobileLogIn');
let mobileViewTripsBtn = document.getElementById('mobileViewTrips');
let mobileViewProfileBtn = document.getElementById('mobileViewProfile');
let navLogInBtn = document.getElementById('navLogIn');
let navBookBtn = document.getElementById('navBook');
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
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav)
mobileBookBtn.addEventListener('click', domUpdates.showBookingView)
bookNowBtn.addEventListener('click', domUpdates.showBookingView);

//event handlers and functions



