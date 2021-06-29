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
  cart.querySelector(".checkout--submit").disabled = true;
  cart.querySelector(".checkout--submit").style.backgroundColor = "var(--deep-purple)";
}

removeLineItem.forEach(button => button.addEventListener("click", removeButtonClicked));