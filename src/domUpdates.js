let dayjs = require('dayjs');
// console.log(dayjs().format('MMM D YYYY'));
// bookings.forEach(booking => {
//   const date = dayjs(booking.dataset.date).format('MMM D YYYY');
//   bookingElement.innerText = date;
// });

let domUpdates = {
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
  }
};

export default domUpdates;
