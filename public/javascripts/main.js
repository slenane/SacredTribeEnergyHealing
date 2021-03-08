// BACK TO TOP BUTTON
let topButton = document.getElementById("back-to-top"),
    socialBar = document.querySelector(".social_bar");

// When the user scrolls down 600px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topButton.style.display = "block";
    socialBar.style.display = "block";
  } else {
    topButton.style.display = "none";
    socialBar.style.display = "none";
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

document.addEventListener('scroll', function() {
  scroll = (html.scrollTop || body.scrollTop) / ((html.scrollHeight || body.scrollHeight) - html.clientHeight) * 100;
  progress.style.setProperty('--scroll', scroll + '%');
});