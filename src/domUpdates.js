let dayjs = require('dayjs');
// console.log(dayjs().format('MMM D YYYY'));
// bookings.forEach(booking => {
//   const date = dayjs(booking.dataset.date).format('MMM D YYYY');
//   bookingElement.innerText = date;
// });
let mobileLogInBtn = document.getElementById('mobileLogIn');
let mobileBookBtn = document.getElementById('mobileBook');
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

const domUpdates = {
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  openMobileNav() {
    let hamburgerBtn = document.getElementById('hamburger');
    let hamburgerImg = document.querySelector('.ham-img');
    let closeButton = document.querySelector('.close-btn');
    let attr = hamburgerBtn.getAttribute('aria-expanded');
    let menuDropdown = document.getElementById('menuDropdown');

    if (attr === 'false') {
      hamburgerBtn.setAttribute('aria-expanded', true);
      domUpdates.show([menuDropdown, closeButton]);
      domUpdates.hide([hamburgerImg]);
    } else {
      hamburgerBtn.setAttribute('aria-expanded', false);
      domUpdates.hide([menuDropdown, closeButton]);
      domUpdates.show([hamburgerImg]);
    }
  },

  showBookingView() {
    console.log('hi')
    domUpdates.show([selectPage])
    domUpdates.hide([landingPage])
  }
};

export default domUpdates;
