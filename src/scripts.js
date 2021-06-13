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
const checkAvailBtn = document.getElementById('checkAvailBtn');
const navBookBtn = document.getElementById('navBook');
const filteredResults = document.getElementById('filteredResults');
const mobileViewProfileBtn = document.getElementById('mobileViewProfile');
const modalOverlay = document.getElementById('modalOverlay');
const arrivalDate = document.getElementById('arrivalDate');
const searchAgainBtn = document.getElementById('searchAgain')
const selectRoomType = document.getElementById('selectRoomType');
const roomTypeForm = document.getElementById('roomTypeForm');
const selectedRoom = document.getElementById('selectedRoom');
const changeDates = document.getElementById('changeDates');
export const errorTag = document.getElementById('errorTag');

  
// variables
let dayjs = require('dayjs')

let customer, booking, room, hotel, currentDate;
let customersData, roomsData, bookingsData

// event listeners
window.addEventListener('load', fetchHotelData);
window.addEventListener('load', getDate)
searchAgainBtn.addEventListener('click', domUpdates.showBookingView);
changeDates.addEventListener('click', domUpdates.showBookingView)
hamburgerBtn.addEventListener('click', domUpdates.openMobileNav);
mobileBookBtn.addEventListener('click', domUpdates.showBookingView);
modalOverlay.addEventListener('click', domUpdates.hideOverlay);
// bookNowBtn.addEventListener('click', domUpdates.showBookingView);
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

export function fetchCustomer(id) {
  apiCalls.fetchCustomerData(id)
}

export function assignVariables(data) {
  customersData = data[0].customers;
  roomsData = data[1].rooms;
  bookingsData = data[2].bookings;
}

export function pageLoad() {
  const allBookings = makeBookingInstances()
  const allRooms = makeRoomInstances()
  hotel = new Hotel(allBookings, allRooms)
  customer = new Customer(customersData[6])
  const userBookings = hotel.getFullRoomInfoForBookings(customer);
  const userExpenses = hotel.getUserExpenses(customer)
  const sortedBookings = sortUserBookingsByDate(userBookings)
  domUpdates.renderUserDashboard(customer, sortedBookings, userExpenses, currentDate);
}

function sortUserBookingsByDate(bookings) {
  return bookings.sort((a,b) => {
    return dayjs(a.booking.date) - dayjs(b.booking.date) 
  })
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
  currentDate = dayjs(Date.now()).format('YYYY-MM-DD');
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
    domUpdates.renderYourDates(input)
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
    const user = customer
    const date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
    const roomNumber = parseInt(event.target.id)

    apiCalls.bookRoom(user, date, roomNumber)
  }
}
