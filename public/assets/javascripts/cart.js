/*******************
 *      CART
*******************/
const cart = document.querySelector("#cart");
const arrow = document.querySelector("#arrow");
let lineItemCount = document.querySelector(".cart_top--message");
let navLineItemCount = document.querySelector(".cart--line_item_count");
let cartBody = document.querySelector(".cart--body");
let cartCheckout = document.querySelector(".cart--checkout");
let cartCheckoutID = document.querySelector(".cart-user--checkout_id");
// let boughtButton = document.querySelector(".bought_button");

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
  // If the button is not a remove line item button
  if (!e.target.classList.contains("line_item--remove_item")) return;

  // Prevent the page from reloading
  e.preventDefault();

  let lineItemID = e.target.closest(".cart--line_item").dataset.id;

  cart.querySelector(".cart-loader").classList.add("active");
  cart.querySelector(".cart-overlay").classList.add("active");
  cart.querySelector(".checkout--submit").disabled = true;
  cart.querySelector(".checkout--submit").style.backgroundColor = "var(--deep-purple)";

  // Add the item to the cart 
  socket.emit("remove line item", {
    checkoutID: cartCheckoutID.textContent,
    id: lineItemID,
  });
}

// When the message comes back then update the UI
socket.on("line item removed", (checkout, lineItemID) => {
  // Add the item to the UI
  updateCartHTMLRemove(checkout, lineItemID);
});

// Add item to cart
let updateCartHTMLRemove = async (checkout, lineItemID) => {
  // Get the HTML element for the line item to be reomved
  let elements = Array.from(cartBody.children);
  let lineItem = elements.filter(elem => elem.dataset.id === lineItemID)[0];
  cartBody.removeChild(lineItem);

  // Get the remaining HTML elements
  let remainingElements = Array.from(cartBody.children);

  // // Update the checkout information
  if (remainingElements.length > 0) {
    // Clear the checkout details
    cartCheckout.innerHTML = "";
    // Update with the new information
    cartCheckout.insertAdjacentHTML("afterbegin", `
        <div class="cart--checkout">
            <div class="checkout--totals">
                <p class="checkout--totals_item checkout--subtotal">
                    <span class="totals_text">SUBTOTAL</span> <span class="totals_price">€${parseFloat(checkout.lineItemsSubtotalPrice.amount).toFixed(2)}</span> 
                </p>
                <p class="checkout--totals_item checkout--shipping">
                    <span class="totals_text">SHIPPING</span> <span class="totals_price">€0.00</span>
                </p>
                <p class="checkout--totals_item checkout--discount ${Number(checkout.lineItemsSubtotalPrice.amount) < 100 ? "hide" : "" }">
                    <span class="totals_text">DISCOUNT</span> <span class="totals_price">€${parseFloat(Number(checkout.lineItemsSubtotalPrice.amount) - Number(checkout.totalPrice)).toFixed(2)}</span> 
                </p>
                <p class="checkout--totals_item checkout--total">
                    <span class="totals_text">TOTAL</span> <span class="totals_price">€${checkout.totalPrice}</span> 
                </p>
            </div>
            <p class="checkout--shopify_disclaimer text-muted">Payments are processed securely through shopify</p>
            <div class="checkout--button">
                <a href="${checkout.webUrl}"><button class="checkout--submit">Checkout</button></a>
            </div>
        </div>  
    `); 

    lineItemCount.innerHTML = "";
    lineItemCount.innerHTML = `My bag <span class="cart_top--message_item_count">(${(remainingElements).length} item${(remainingElements).length > 1 ? "s" : ""})</span>`;
    navLineItemCount.textContent = (remainingElements).length;

  } else {
    // Clear the checkout details
    cartCheckout.innerHTML = "";

    // Add the empty cart UI
    cartBody.insertAdjacentHTML("afterbegin", `
      <div class="empty_cart">
        <img class="empty_cart--img" src="/assets/images/icons/shopping-bag.svg" alt="Empty shopping bag">
        <p class="empty_cart--text">Your bag is empty!</p>
        <a class="empty_cart--jewellery_link" href="/jewellery"><button>View Jewellery</button></a>
        <a class="empty_cart--treatments_link" href="/treatments"><button>View Treatments</button></a>
      </div>
    `); 

    lineItemCount.innerHTML = "";
    navLineItemCount.textContent = "";
  }

  // if button classlist contains bought and there is no match in the datasets

  if (productID) {
    let itemStillInCart = remainingElements.filter(elem => elem.dataset.id === productID.textContent)[0];
  
    if (buyButton.classList.contains("cart--adding_to_cart") && !itemStillInCart) {
      buyButton.removeAttribute("disabled");
      buyButton.classList.remove("cart--adding_to_cart");
      buyButton.innerHTML = "ADD TO BAG";
    } 
  }

  cart.querySelector(".cart-loader").classList.remove("active");
  cart.querySelector(".cart-overlay").classList.remove("active");
  // Update size body text and clear radio options
  jewellerySizeBody.innerHTML =  `All bracelets are made to fit a size 7.5" - <span class="jewellery_size--adjust">Click here to adjust</span>`;
  radioOptions.forEach(option => option.classList.remove("active"));
  showSizeOptions.forEach(option => option.checked = false);
}

cartBody.addEventListener("click", removeButtonClicked);