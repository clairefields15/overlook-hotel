let dayjs = require('dayjs');
const currentDate = dayjs('2020/2/15');

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
let profilePage = document.getElementById('profilePage')
let hamburgerBtn = document.getElementById('hamburger');
let hamburgerImg = document.querySelector('.ham-img');
let closeButton = document.querySelector('.close-btn');
let attr = hamburgerBtn.getAttribute('aria-expanded');
let menuDropdown = document.getElementById('menuDropdown');
let modalOverlay = document.getElementById('modalOverlay');

const domUpdates = {
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  openMobileNav() {
    if (attr === 'false') {
      hamburgerBtn.setAttribute('aria-expanded', true);
      domUpdates.show([menuDropdown, closeButton, modalOverlay]);
      domUpdates.hide([hamburgerImg]);
    } else {
      hamburgerBtn.setAttribute('aria-expanded', false);
      domUpdates.hide([menuDropdown, closeButton, modalOverlay]);
      domUpdates.show([hamburgerImg]);
    }
  },

  hideOverlay() {
    hamburgerBtn.setAttribute('aria-expanded', false);
    domUpdates.hide([modalOverlay, menuDropdown])
  },

  showLandingPage() {
    domUpdates.show([landingPage]);
    domUpdates.hide([
      selectPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      profilePage
    ]);
  },

  showUserProfile() {
    domUpdates.show([profilePage]);
    domUpdates.hide([
      landingPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      selectPage
    ]);
  },

  showBookingView() {
    domUpdates.show([selectPage]);
    domUpdates.hide([
      landingPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      profilePage
    ]);
  },

  renderUserDashboard(user, bookings) {
    let welcomeMsg = document.getElementById('welcomeMsg');
    let upcomingStays = document.getElementById('upcomingStays');
    let pastStays = document.getElementById('pastStays');
    let totalSpent = document.getElementById('totalSpent');

    welcomeMsg.innerText = `Welcome ${user.name}`;
    
    bookings.forEach(booking => {
      let bookingDate = dayjs(booking.date)
      console.log(bookingDate.isSame(currentDate))

      if (bookingDate.isBefore(currentDate)) {
        pastStays.innerHTML += `
        <div class="past-booking-card">
          <h4>Date: ${booking.date}</h4>
          <ul>Room: ${booking.roomNumber}</ul>
        </div>
          `;
      } else if (bookingDate.isAfter(currentDate) || bookingDate.isSame(currentDate)) {
        upcomingStays.innerHTML += `
          <div class="past-booking-card">
            <h4>Date: ${booking.date}</h4>
            <ul>Room: ${booking.roomNumber}</ul>
          </div>
          `;
      } 
    })

    // run method in user class to get total spent
    totalSpent.innerHTML = `
        <ul>Thanks for staying with us!</ul>
        <ul>$50000000</ul>
          `;
  },

  checkAvailability() {
    domUpdates.show([searchResultsPage]);
    domUpdates.hide([
      selectPage,
      landingPage,
      bookingPage,
      profilePage, 
      confirmationPage
    ]);
  },

  showRoomDetails() {
    domUpdates.show([bookingPage]);
    domUpdates.hide([
      searchResultsPage,
      selectPage,
      landingPage,
      confirmationPage,
      profilePage
    ]);
  },

  showConfirmationView() {
    domUpdates.show([confirmationPage]);
    domUpdates.hide([
      bookingPage,
      searchResultsPage,
      profilePage,
      selectPage,
      landingPage
    ]);
    setTimeout(function() {
      domUpdates.showLandingPage()
    }, 2000);
  }
};

export default domUpdates;
