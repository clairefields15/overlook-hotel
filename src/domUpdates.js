/* eslint-disable max-len */
let dayjs = require('dayjs');
const currentDate = dayjs('2020/2/15');

// console.log(dayjs().format('MMM D YYYY'));
// bookings.forEach(booking => {
//   const date = dayjs(booking.dataset.date).format('MMM D YYYY');
//   bookingElement.innerText = date;
// });
const mobileLogInBtn = document.getElementById('mobileLogIn');
const mobileBookBtn = document.getElementById('mobileBook');
const mobileViewTripsBtn = document.getElementById('mobileViewTrips');
const mobileViewProfileBtn = document.getElementById('mobileViewProfile');
const navLogInBtn = document.getElementById('navLogIn');
const navBookBtn = document.getElementById('navBook');
const navTripsBtn = document.getElementById('navTrips');
const navProfileBtn = document.getElementById('navProfile');
const desktopNavSection = document.getElementById('desktopNav');
const landingPage = document.getElementById('landingPage');
const selectPage = document.getElementById('selectPage');
const searchResultsPage = document.getElementById('searchResultsPage');
const bookingPage = document.getElementById('bookingPage');
const confirmationPage = document.getElementById('confirmationPage');
const profilePage = document.getElementById('profilePage')
const hamburgerBtn = document.getElementById('hamburger');
const hamburgerImg = document.querySelector('.ham-img');
const closeButton = document.querySelector('.close-btn');
const menuDropdown = document.getElementById('menuDropdown');
const modalOverlay = document.getElementById('modalOverlay');
const filteredResultsArea = document.getElementById('filteredResults');
const searchAgainBtn = document.getElementById('searchAgain');
const roomTypeForm = document.getElementById('roomTypeForm');

const domUpdates = {
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  openMobileNav() {
    const attr = hamburgerBtn.getAttribute("aria-expanded")
    if (attr === 'false') {
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      domUpdates.show([menuDropdown, closeButton, modalOverlay]);
      domUpdates.hide([hamburgerImg]);
    } 
    if (attr === 'true') {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      domUpdates.hide([menuDropdown, closeButton, modalOverlay]);
      domUpdates.show([hamburgerImg]);
    }
  },

  hideOverlay() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    domUpdates.hide([modalOverlay, menuDropdown, closeButton])
    domUpdates.show([hamburgerImg])
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

  renderUserDashboard(user, bookings, expenses) {
    const welcomeMsg = document.getElementById('welcomeMsg');
    const upcomingStays = document.getElementById('upcomingStays');
    const pastStays = document.getElementById('pastStays');
    const totalSpent = document.getElementById('totalSpent');

    welcomeMsg.innerText = `Welcome ${user.name}`;

    pastStays.innerHTML = '';
    upcomingStays.innerHTML = '';

    bookings.forEach(booking => {
      const bookingDate = dayjs(booking.booking.date);
      if (bookingDate.isBefore(currentDate)) {
        const formattedDate = bookingDate.format('MMM D YYYY')
        pastStays.innerHTML += `
          <article class="past-booking-card">
            <div class="image-area">
              <div class="image-container">
                <img src="./images/1-bed-room.jpg" class="past-room-photo" alt="Light and airy room with double bed">
                <div class="past-date">
                  <p id="date" class="date">${formattedDate}</p>
                  <h3 id="past-roomType" class="room-type">${booking.room.type}</h3>
                </div>
              </div>
            </div>
            <div class="past-text-area">
              <p id="typeOfBed">${booking.room.numBeds} ${booking.room.bedSize}</p>
              <p id="costPerNight">$${booking.room.costPerNight} per night</p>
            </div>
          </article>
        `;
      } else if (
        bookingDate.isAfter(currentDate) ||
        bookingDate.isSame(currentDate)
      ) {
        const formattedDate = bookingDate.format('MMM D YYYY');

        upcomingStays.innerHTML += `
          <article class="past-booking-card">
            <div class="image-area">
              <div class="image-container">
                <img src="./images/1-bed-room.jpg" class="past-room-photo" alt="Light and airy room with double bed">
                <div class="past-date">
                  <p id="date" class="date">${formattedDate}</p>
                  <h3 id="past-roomType" class="room-type">${booking.room.type}</h3>
                </div>
              </div>
            </div>
            <div class="past-text-area">
              <p id="typeOfBed">${booking.room.numBeds} ${booking.room.bedSize}</p>
              <p id="costPerNight">$${booking.room.costPerNight} per night</p>
            </div>
          </article>
        `;
      }
    });

    totalSpent.innerText = `Thanks for staying with us! You have spent $${expenses} on bookings.`;
  },

  showSearchResultsPage() {
    domUpdates.show([searchResultsPage]);
    domUpdates.hide([
      selectPage,
      landingPage,
      bookingPage,
      profilePage, 
      confirmationPage
    ]);
  },

  renderAvailableRooms(availableRooms) {
    domUpdates.hide([searchAgainBtn])
    filteredResultsArea.innerHTML = '';
    availableRooms.forEach(room => {
      filteredResultsArea.innerHTML += `
        <article class="room-card" id="${room.number}">
          <div class="image-area">
            <div class="image-container">
              <img src="./images/1-bed-room.jpg" class="room-photo" alt="Light and airy room with double bed">
              <button id="selectRoomButton" class="select-room-btn">Select this room</button>
            </div>
          </div>
          <div class="text-area">
            <h3 id="roomType" class="room-type">${room.type}</h3>
            <p id="typeOfBed">${room.numBeds} ${room.bedSize}</p>
            <p id="costPerNight">$${room.costPerNight} per night</p>
          </div>
        </article>
      `;
    })
  },

  renderApology() {
    domUpdates.show([searchAgainBtn])
    filteredResultsArea.innerHTML = '';
    filteredResultsArea.innerHTML = `
      <p>This is terribly unfortunate, but there are no rooms available that match your search parameters.</p> 
      <p>Please try selecting a different room type above, or change your dates.</p>
      `;
  },

  populateRoomTypeSelector(roomTypes) {
    roomTypeForm.innerHTML = '';
    roomTypes.forEach(type => {
      roomTypeForm.innerHTML += `
        <option value="${type}">${type}</option>
      `;
    })
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
