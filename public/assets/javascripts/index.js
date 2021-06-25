// ARROW BOUNCE
window.addEventListener("load", () => {
  const heroArrow = document.querySelector(".fa-angle-double-down");
  heroArrow.classList.add("active");
})

// ANIMATIONS
const slideInImg = document.querySelector(".slide-in");
const slideUpImg = document.querySelector(".slide-up");
const jewelleryDiv = document.querySelector("#jewellery_div");
const overlay = document.querySelector(".overlay");
const FadeInImg = document.querySelector(".step-fade-in");


function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return () => {
    let context = this, args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let slideIn = () => {
    // Halfway through the image
    const slideInAt = (window.scrollY + window.innerHeight) + 100;
    const isShown = slideInAt > slideInImg.offsetTop;
    
    if (isShown) {
      slideInImg.classList.add("slide-in-active");
    }
} 

let slideUp = () => {
    const slideInAt = (window.scrollY + window.innerHeight) + 100;
    const isShown = slideInAt > slideUpImg.offsetTop;
    
    if (isShown) {
      slideUpImg.classList.add("slide-up-active");
    }
} 

let overlaySlide = () => {
  const slideInAt = (window.scrollY + window.innerHeight);
  const isShown = slideInAt > jewelleryDiv.offsetTop;

  if (isShown) {
    overlay.classList.add("overlay-active");
  }
}

let fadeIn = () => {
  // Create array of paragraph nodes
  let stepFadeChildren = Array.from(FadeInImg.childNodes).filter(node => node.nodeName == "P" || node.nodeName == "H2");
  
  stepFadeChildren.forEach(child => {
    const slideInAt = (window.scrollY + window.innerHeight);
    const isShown = slideInAt > child.offsetTop;
  
    if (isShown) {
      child.classList.add("step-fade-in-active");
    }
  })
}

// If the screen width is larger than 1024 then show the following animations
if (window.innerWidth > 1024) {
  window.addEventListener("scroll", debounce(slideIn));
  window.addEventListener("scroll", debounce(fadeIn));
}

// Always show these animations
window.addEventListener("scroll", debounce(overlaySlide));
window.addEventListener("scroll", debounce(slideUp));

// SWIPERJS
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    autoplay: {
      delay: 5000,
    },
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// CSS custom property that knows the percentage of the page scrolled
window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

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

/*****************************
 *     SCROLL FUNCTIONS
*****************************/
// Call the following functions on scroll
window.onscroll = function() {
  scrollFunction();
  toggleNavbarBackground();
};

/*****************************
 * NAVBAR BACKGROUND ON SCROLL
*****************************/
const navbarHome = document.querySelector(".navbar_home");
const mobileNavbar = document.querySelector(".mobile_navbar");

function toggleNavbarBackground() {
  // While the hero section is on screen show a dark navbar, then show a purple one
  if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
    navbarHome.classList.remove("background-color-hero");
    navbarHome.classList.add("background-color");
  } else if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbarHome.classList.remove("background-color");
    navbarHome.classList.add("background-color-hero");
    mobileNavbar.classList.add("background-color");
  } else {
    navbarHome.classList.remove("background-color-hero");
    navbarHome.classList.remove("background-color");
    mobileNavbar.classList.remove("background-color");
  }
}

/*******************
 *   BACK TO TOP
*******************/
topButton = document.getElementById("back-to-top");
socialBar = document.querySelector(".social_bar");

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

/*******************
 *      CART
*******************/
const cart = document.querySelector("#cart");
const arrow = document.querySelector("#arrow");
let removeLineItem = cart.querySelectorAll(".line_item--remove_item");

// Toggle cart open/close
function toggleCart() {
  if (cart.classList.contains("show_cart")) {
    cart.classList.remove("show_cart");
    arrow.classList.remove("show_cart");
  } else {
    cart.classList.add("show_cart");
    arrow.classList.add("show_cart");
  }
}

/* Set the width of the side navigation to 0 */
function closeCart() {
  cart.classList.remove("show_cart");
  arrow.classList.remove("show_cart");
  
}

let removeButtonClicked = (e) => {
  cart.querySelector(".cart-loader").classList.add("active");
  cart.querySelector(".cart-overlay").classList.add("active");
}

removeLineItem.forEach(button => button.addEventListener("click", removeButtonClicked));