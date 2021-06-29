/*******************
 *  PROGRESS BAR
*******************/
let html = document.documentElement,
    body = document.body,
    progress = document.querySelector('.progress'),
    scroll;


document.addEventListener('scroll', function() {
  scroll = (html.scrollTop || body.scrollTop) / ((html.scrollHeight || body.scrollHeight) - html.clientHeight) * 100;
  progress?.style.setProperty('--scroll', scroll + '%');
});

/*******************
 * TREATMENTS CODE
*******************/
const energyTreatment = document.querySelector(".treatments_hero_grid--1");
const absenteeTreatment = document.querySelector(".treatments_hero_grid--2");
const energyButton = document.querySelector(".energy-button");
const absenteeButton = document.querySelector(".absentee-button");

// Open treatment when div is clicked
energyTreatment?.addEventListener("click", () => {
  energyButton.click();
});

// Open treatment when div is clicked
absenteeTreatment?.addEventListener("click", () => {
    absenteeButton.click();
});

/*******************
 * BLOGS CODE
*******************/
const blogItem = document.querySelectorAll(".blog_index_grid--item");

// Open blog when div is clicked
blogItem?.forEach(item => item.addEventListener("click", () => {
    // Click the current blogs button to open
    item.querySelector(".blog-button").click();
}));

/*******************
 * SIDE NAVBAR
*******************/
const sideNavbar = document.querySelector(".side_navbar");
/* Set the width of the side navigation to 250px */
function openNav() {
  if (sideNavbar.style.width === "250px") {
    // If the sidebar is already open, close it
    sideNavbar.style.width = "0";
  } else {
    sideNavbar.style.width = "250px";
  }
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sideNavbar.style.width = "0";
}

/*****************************
 *     SCROLL FUNCTIONS
*****************************/
// When the user scrolls down 600px from the top of the document, show the button
window.onscroll = function() {
  toggleNavbarBackground();
  scrollFunction();
};

/*****************************
 * NAVBAR BACKGROUND ON SCROLL
*****************************/
const navbarWhite = document.querySelector(".navbar_white");
const navbarBlack = document.querySelector(".navbar_black");
const mobileNavbar = document.querySelector(".mobile_navbar");

function toggleNavbarBackground() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbarWhite?.classList.add("background-color");
    navbarBlack?.classList.add("background-color");
    mobileNavbar?.classList.add("background-color");
  } else {
    navbarWhite?.classList.remove("background-color");
    navbarBlack?.classList.remove("background-color");
    mobileNavbar?.classList.remove("background-color");
  }
}

/*******************
 *   BACK TO TOP
*******************/
let topButton = document.getElementById("back-to-top"),
    socialBar = document.querySelector(".social_bar");

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}