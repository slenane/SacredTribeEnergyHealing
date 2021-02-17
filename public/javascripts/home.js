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
    const slideInAt = (window.scrollY + window.innerHeight);
    const isShown = slideInAt > slideInImg.offsetTop;
    
    if (isShown) {
      slideInImg.classList.add("slide-in-active");
    }
} 

let slideUp = () => {
    const slideInAt = (window.scrollY + window.innerHeight);
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

window.addEventListener("scroll", debounce(slideIn));
window.addEventListener("scroll", debounce(slideUp));
window.addEventListener("scroll", debounce(overlaySlide));
window.addEventListener("scroll", debounce(fadeIn));

// SWIPERJS
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    autoplay: {
      delay: 5000,
    },
});