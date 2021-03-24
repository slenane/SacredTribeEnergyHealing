// BACK TO TOP BUTTON
let topButton = document.getElementById("back-to-top"),
    socialBar = document.querySelector(".social_bar");

// When the user scrolls down 600px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topButton.style.display = "block";
    //socialBar.style.display = "block";
  } else {
    topButton.style.display = "none";
    //socialBar.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// PROGRESS BARS
let html = document.documentElement,
    body = document.body,
    progress = document.querySelector('.progress'),
    scroll;

if (progress) {
  document.addEventListener('scroll', function() {
    scroll = (html.scrollTop || body.scrollTop) / ((html.scrollHeight || body.scrollHeight) - html.clientHeight) * 100;
    progress.style.setProperty('--scroll', scroll + '%');
  });
}

/*******************
 * TREATMENTS CODE
*******************/
const energyTreatment = document.querySelector(".treatments_hero_grid--1");
const absenteeTreatment = document.querySelector(".treatments_hero_grid--2");
const energyButton = document.querySelector(".energy-button");
const absenteeButton = document.querySelector(".absentee-button");

// Open treatment when div is clicked
if (energyTreatment) {
  energyTreatment.addEventListener("click", () => {
    energyButton.click();
  });
}


// Open treatment when div is clicked
if (absenteeTreatment) {
  absenteeTreatment.addEventListener("click", () => {
      absenteeButton.click();
  });
}

/*******************
 * BLOGS CODE
*******************/
const blogItem = document.querySelectorAll(".blog_index_grid--item");

// Open blog when div is clicked
blogItem.forEach(item => item.addEventListener("click", () => {
    // Click the current blogs button to open
    item.querySelector(".blog-button").click();
}));

/*******************
 * SIDE NAVBAR CODE
*******************/
const sideNavbar = document.querySelector(".side_navbar");
/* Set the width of the side navigation to 250px */
function openNav() {
  console.log(sideNavbar);
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
