/* eslint-disable max-len */
let dayjs = require('dayjs');
const mobileLogInBtn = document.getElementById('mobileLogIn');
const mobileBookBtn = document.getElementById('mobileBook');
const mobileViewProfileBtn = document.getElementById('mobileViewProfile');
const mobileLogOutBtn = document.getElementById('mobileLogOut');
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
const selectedRoom = document.getElementById('selectedRoom');
const yourDates = document.getElementById('yourDates');
const confirmationMsg = document.getElementById('confirmationMsg');
const logInPage = document.getElementById('logInPage');
const goHomeBtn = document.getElementById('mobileGoHome')
const landingMsg = document.getElementById('landingMsg');
const errorMessage = document.getElementById('errorMessage');
const errorTag = document.getElementById('errorTag');
const postErrorMsg = document.getElementById('postErrorMsg');
const apologyMessage = document.getElementById('apologyMessage');


const domUpdates = {
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  openMobileNav() {
    const attr = hamburgerBtn.getAttribute('aria-expanded');
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
    domUpdates.hide([modalOverlay, menuDropdown, closeButton]);
    domUpdates.show([hamburgerImg]);
  },

  showLandingPage() {
    landingMsg.innerText = '';
    domUpdates.show([landingPage, mobileLogInBtn]);
    domUpdates.hide([
      selectPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      profilePage,
      logInPage,
      goHomeBtn,
      mobileLogOutBtn,
      mobileViewProfileBtn,
      mobileBookBtn
    ]);
  },

  showLandingPageAfterLogIn(user) {
    landingMsg.innerText = `Welcome ${user.name}`;
    domUpdates.show([
      landingPage,
      mobileBookBtn,
      mobileViewProfileBtn,
      mobileLogOutBtn
    ]);
    domUpdates.hide([
      selectPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      profilePage,
      logInPage,
      goHomeBtn,
      mobileLogInBtn
    ]);
  },

  showUserProfile() {
    domUpdates.show([profilePage, mobileBookBtn, goHomeBtn]);
    domUpdates.hide([
      landingPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      selectPage,
      logInPage,
      mobileLogInBtn,
      mobileViewProfileBtn
    ]);
  },

  showBookingView() {
    domUpdates.show([selectPage, goHomeBtn]);
    domUpdates.hide([
      landingPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      profilePage,
      logInPage,
      mobileLogInBtn,
      mobileBookBtn
    ]);
    postErrorMsg.innerText = '';
  },

  showLogInView() {
    domUpdates.show([logInPage, goHomeBtn]);
    domUpdates.hide([
      landingPage,
      searchResultsPage,
      bookingPage,
      confirmationPage,
      profilePage,
      mobileLogInBtn,
      mobileBookBtn
    ]);
  },

  showSearchResultsPage() {
    domUpdates.show([searchResultsPage, goHomeBtn]);
    domUpdates.hide([
      selectPage,
      landingPage,
      bookingPage,
      profilePage,
      confirmationPage,
      logInPage,
      mobileLogInBtn,
      mobileBookBtn
    ]);
  },

  showRoomDetails() {
    domUpdates.show([bookingPage, goHomeBtn]);
    domUpdates.hide([
      searchResultsPage,
      selectPage,
      landingPage,
      confirmationPage,
      profilePage,
      logInPage,
      mobileLogInBtn,
      mobileBookBtn
    ]);
  },

  showConfirmationView() {
    domUpdates.show([confirmationPage, confirmationMsg]);
    domUpdates.hide([
      bookingPage,
      searchResultsPage,
      profilePage,
      selectPage,
      landingPage,
      logInPage,
      mobileLogInBtn,
      mobileBookBtn,
      errorTag
    ]);
  },

  showPostError(response) {
    if (response.status === 404) {
      postErrorMsg.innerText =
        'Something went wrong while booking, please try again.';
    } else if (response.status === 500) {
      postErrorMsg.innerText =
        'So sorry, our servers are down, try again later.';
    } else {
      postErrorMsg.innerText = 'Something went wrong.';
    }
  },

  showLogInError(response) {
    errorMessage.style.opacity = 1;
    if (response.status === 404) {
      errorMessage.innerText = 'Username does not exist';
    } else if (response.status === 500) {
      errorMessage.innerText =
        'So sorry, our servers are down, try again later.';
    } else {
      errorMessage.innerText = 'Something went wrong.';
    }
  },

  renderUserDashboard(user, expenses, currentDate) {
    const welcomeMsg = document.getElementById('welcomeMsg');
    const totalSpent = document.getElementById('totalSpent');

    welcomeMsg.innerText = `Welcome ${user.name}`;
    totalSpent.innerText = `Thanks for staying with us! You have spent $${expenses} on bookings.`;

    domUpdates.renderUpcomingBookings(user, currentDate);
    domUpdates.renderPastBookings(user, currentDate);
  },

  renderPastBookings(user, currentDate) {
    const pastStays = document.getElementById('pastStays');
    let noPastStays = document.getElementById('noPastStays')
    pastStays.innerHTML = '';
    noPastStays.innerHTML = '';

    let pastBookings = user.getPastBookings(currentDate);
    let sortedPastBookings = user.sortBookingsAscendingDates(pastBookings);

    if (pastBookings.length === 0) {
      noPastStays.innerHTML = `
      <article class="no-stays-card">
        <p>You have no past stays.</p>
      </article>
      `;
    }

    sortedPastBookings.forEach(booking => {
      const bookingDate = dayjs(booking.date);
      const formattedDate = bookingDate.format('MMM D YYYY');


      pastStays.innerHTML += `
        <article class="past-booking-card">
          <div class="image-area">
            <div class="image-container">
              <img src="${booking.room.imageURL}" class="past-room-photo" alt="Light and airy room with double bed">
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
    });
  },

  renderUpcomingBookings(user, currentDate) {
    const upcomingStays = document.getElementById('upcomingStays');
    const noUpcomingStays = document.getElementById('noUpcomingStays')
    upcomingStays.innerHTML = '';
    noUpcomingStays.innerHTML = '';

    let upcomingBookings = user.getUpcomingBookings(currentDate);
    let sortedUpcomingBookings =
      user.sortBookingsAscendingDates(upcomingBookings);

    if (upcomingBookings.length === 0) {
      noUpcomingStays.innerHTML = `
      <article class="no-stays-card">
        <p>You have no upcoming stays.</p>
      </article>
      `;
    }

    sortedUpcomingBookings.forEach(booking => {
      const bookingDate = dayjs(booking.date);
      const formattedDate = bookingDate.format('MMM D YYYY');

      upcomingStays.innerHTML += `
        <article class="past-booking-card">
          <div class="image-area">
            <div class="image-container">
              <img src="${booking.room.imageURL}" class="past-room-photo" alt="Light and airy room with double bed">
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
    });
  },

  renderAvailableRooms(availableRooms) {
    domUpdates.hide([searchAgainBtn]);
    filteredResultsArea.innerHTML = '';
    availableRooms.forEach(room => {
      filteredResultsArea.innerHTML += `
        <article class="room-card" id="${room.number}">
          <div class="image-area">
            <div class="image-container">
              <img src="${room.imageURL}" class="room-photo" alt="Light and airy room with double bed">
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
    });
  },

  renderYourDates(date) {
    yourDates.innerText = '';
    const formattedDate = dayjs(date).format('MMM DD YYYY');
    yourDates.innerText = `You are viewing rooms available on ${formattedDate}`;
  },

  renderApology() {
    filteredResultsArea.innerHTML = '';
    apologyMessage.innerHTML = '';
    apologyMessage.innerHTML = `
      <p>This is terribly unfortunate, but there are no rooms available that match your search parameters.</p> 
      <p>Please select a different room type, or change your dates.</p>
      `;
  },

  populateRoomTypeSelector(roomTypes) {
    roomTypeForm.innerHTML = '';
    roomTypeForm.innerHTML = `
      <option value="">--Please choose an option--</option>
    `;
    roomTypes.forEach(type => {
      roomTypeForm.innerHTML += `
        <option value="${type}">${type}</option>
      `;
    });
  },

  renderSelectedRoom(room, date) {
    const formattedDate = dayjs(date).format('MMM DD YYYY');

    selectedRoom.innerHTML = '';

    selectedRoom.innerHTML = `
      <div class="room-image-container">
        <img src="${room.imageURL}" class="room-photo" alt="Light and airy room with double bed">
      </div>
      <div class="text-area" id="${room.number}">
        <h3 id="roomType" class="room-type">${room.type}</h3>
        <p id="typeOfBed">${room.numBeds} ${room.bedSize}</p>
        <p id="datesOfStay">Date of Stay: ${formattedDate}</p>
        <p id="costPerNight">$${room.costPerNight} per night x 1 night</p>
        <p id="totalCost">Total: $${room.costPerNight}</p><br>
        <p>Money is fake anyway, so let's pretend you pay here.</p>

        <div class="button-container">
        <button id="${room.number}" class="book-room-btn">Book Your Stay!</button>
      <button id="goBackButton" class="go-back-btn">
        View other rooms on this date
      </button>
    </div>
      </div>
    `;
  }
};

export default domUpdates;
