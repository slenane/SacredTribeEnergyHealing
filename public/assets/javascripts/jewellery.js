let infobar = document.querySelector(".hero_infobar");
let infobarText = document.querySelector(".hero_infobar--text");
let buyingGuide = document.querySelector(".hero_infobar--grid");
let buyingGuideBtn = document.querySelector(".buying_guide-button");


let toggleShowDropdown = async (e) => {
    if (buyingGuide.classList.contains("hide")) {
        // Remove the infobar text and button
        infobarText.classList.add("hide");
        buyingGuideBtn.classList.add("hide");
        // Show the buying guide
        buyingGuide.classList.remove("hide"); 
        buyingGuide.classList.remove("fade-out");
        buyingGuide.classList.add("fade-in");
        setTimeout(() => {
            buyingGuide.classList.add("active");  
        }, 1000);

        // Resize the infobar
        infobar.classList.remove("dropup"); 
        infobar.classList.add("dropdown");
        // Add an active class to set the new div height 
        setTimeout(() => {
            infobar.classList.add("active");  

            // Show and change the text content of the button
            buyingGuideBtn.classList.remove("hide");
            buyingGuideBtn.textContent = "Read Less";
        }, 500);


    } else {
        // Hide the button 
        buyingGuideBtn.classList.add("hide");

        // Hide the buying guide
        buyingGuide.classList.remove("fade-in");
        buyingGuide.classList.add("fade-out");
        setTimeout(() => {
            buyingGuide.classList.remove("active");
            buyingGuide.classList.add("hide");   

            // Display infobar text
            infobarText.classList.remove("hide");
        }, 500);

        // Resize the infobar
        infobar.classList.remove("dropdown"); 
        infobar.classList.add("dropup"); 
        // Remove active class to set the div height to initial
        setTimeout(() => {
            infobar.classList.remove("active");  

            // Show and change the text content of the button
            buyingGuideBtn.classList.remove("hide");
            buyingGuideBtn.textContent = "Read More";
        }, 500);
    }
};

buyingGuideBtn?.addEventListener("click", toggleShowDropdown);

// ###################################
//             SHOW PAGE
// ###################################

let jewelleryAddToCart = document.querySelector(".jewellery_buy_button");
let productID = document.querySelector(".jewellery--product_id");
let productSize = document.querySelector("#size_option--medium-preset");
let checkoutID = document.querySelector(".user--checkout_id");
let buyButton = document.querySelector(".buy_button");
let boughtButton = document.querySelector(".bought_button");
let showSizeOptions = document.querySelectorAll(".jewellery_show--size_option");
let jewellerySizeBody = document.querySelector(".jewellery_size-body");
let showOptionsDiv = document.querySelector(".jewellery_size--radio_buttons");
// let cartBody = document.querySelector(".cart--body");
// let cartCheckout = document.querySelector(".cart--checkout");

jewelleryAddToCart?.addEventListener('submit', (e) => {
    // Prevent the page from reloading
    e.preventDefault();

    buyButton.classList.add("cart--adding_to_cart");
    buyButton.classList.add("flash");
    buyButton.innerHTML = "ADDING TO BAG";
    buyButton.setAttribute("disabled", true);

    let selectedSize = Array.from(showSizeOptions).filter(option => option.checked)[0]?.value;
    if (!selectedSize) selectedSize = '7.5"';

    // Add the item to the cart 
    socket.emit("add jewellery item", {
        checkoutID: checkoutID.textContent,
        id: productID.textContent,
        Size: selectedSize
    });
});

// When the message comes back then update the UI
socket.on("jewllery item added", (checkout, lineItem) => {
    // Add the item to the UI
    updateCartHTMLAdd(checkout, lineItem);
});

// Add item to cart
let updateCartHTMLAdd = async (checkout, lineItem) => {
    // If the empty cart is shown - remove it
    if ((cartBody.children).length === 1  && cartBody.children[0].classList.contains("empty_cart")) {
        cartBody.removeChild(cartBody.children[0]);
    }

    // Add the item to the cart
    cartBody.insertAdjacentHTML("beforeend", `
        <div class="cart--line_item" data-id="${lineItem.id}">
            <a href="/jewllery/show/${lineItem.variant.product.id}">
                <img class="line_item--thumbnail" src="${lineItem.variant.image.src}" alt="Product thumbnail">
            </a>
            <div class="line_items--body">
                <p class="line_item--title"><a href="/jewllery/show/${lineItem.variant.product.id}">${lineItem.title}</a></p>
                <p class="line_item--price">${lineItem.customAttributes[0].value} | €${lineItem.variant.price}</p>
            </div>
            <button class="line_item--remove_item">&times;</button>
        </div>
    `);

    // // Update the checkout information
    if (cartCheckout.children.length > 0) cartCheckout.innerHTML = "";
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

    if (lineItemCount.children > 0) lineItemCount.innerHTML = "";
    lineItemCount.innerHTML = `My bag <span class="cart_top--message_item_count">(${(cartBody.children).length} item${(cartBody.children).length > 1 ? "s" : ""})</span>`;
    navLineItemCount.textContent = (cartBody.children).length;

    // Show cart
    cart.classList.add("show_cart");
    arrow.classList.add("show_cart");
    // Update button state
    buyButton.classList.remove("flash");
    buyButton.innerHTML = "ADDED TO BAG";  
    // Update size body text
    jewellerySizeBody.textContent =  `Selected size: ${lineItem.customAttributes[0].value}`;
    showOptionsDiv.classList.add("closed");
}

// Jewellery size radio buttons
let jewellerySize = document.querySelector('#jewellery--size');
let jewellerySizeDiv = document.querySelector('.jewellery_size--radio_buttons');


jewellerySize?.addEventListener("click", (e) => {
    if (e.target.classList.contains("radio_option")) {
        radioOptions.forEach(option => option.classList.remove("active"));
        e.target.classList.add("active");
        productSize = e.target;
    }
});

jewellerySizeBody?.addEventListener("click", (e) => {
    if (e.target.classList.contains("jewellery_size--adjust")) {
        if (jewellerySizeDiv.classList.contains("closed")) jewellerySizeDiv.classList.remove("closed");
        else jewellerySizeDiv.classList.add("closed");
    }
});

// Image gallery
const swiperThumbnails = new Swiper(".swiper-thumbnails", {
    slidesPerView: 6.5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical'
});
const swiperMainImage = new Swiper(".swiper-main-image", {
    loop: true,
    zoom: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiperThumbnails,
    },
});
let radioOptions = document.querySelectorAll(".radio_option");

//  Swiper styles
let productImages = document.querySelectorAll('.product_image--main');
let paginationNext = document.querySelector('.swiper-button-next');
let paginationPrev = document.querySelector('.swiper-button-prev');

productImages?.forEach(img => img.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement.classList.contains("swiper-slide-zoomed")) {
        paginationNext.classList.add("zoomed");
        paginationPrev.classList.add("zoomed");
    } else {
        paginationNext.classList.remove("zoomed");
        paginationPrev.classList.remove("zoomed");
    }
}));

// Product options toggle
let productDetailOptions = document.querySelectorAll('.product_details--option');
let productDetailBody = document.querySelectorAll('.product_details--body');
let bioDiv = document.querySelector('.body--bio');
let materialsDiv = document.querySelector('.body--materials');
let deliveryDiv = document.querySelector('.body--delivery');

let toggleOption = (e) => {
    // If the target is already active
    if (e.target.classList.contains("active")) return;
    // Remove display of everything before setting the new one if the current is different
    productDetailOptions.forEach(option => {
        if (option.classList.contains("active")) option.classList.remove("active")
    });
    productDetailBody.forEach(option => {
        if (!option.classList.contains("hide")) option.classList.add("hide");
    });
    // Update active tab
    e.target.classList.add("active");

    if (e.target.classList.contains('option--bio')) {
        bioDiv.classList.remove("hide");
    } else if (e.target.classList.contains('option--materials')) {
        materialsDiv.classList.remove("hide");
    } else {
        deliveryDiv.classList.remove("hide");
    }
}

productDetailOptions?.forEach(option => option.addEventListener("click", toggleOption));


// ###################################
//           CUSTOM ITEMS
// ###################################

let customQuantityElem = document.querySelector('#custom--quantity');
let customSizeElem = document.querySelector('#custom--size');
let productType = document.querySelector('#custom--product_type');
let customQuantityLabel = document.querySelector('.custom--quantity_label');
let customSizeLabel = document.querySelector('.custom--size_label');
let additionalSizesDiv = document.querySelector('.additional_sizes');
let customSizeDiv = document.querySelector('.custom_size--div');
let oneSizeOption = document.querySelector('.one_size--option');
let sizeOptions = document.querySelectorAll('.size--option');

let customOrder = document.querySelector('.custom_order_div');

let getFilteredNodes = () => {
    let filteredNodes = [];
    if (additionalSizesDiv?.childNodes.length > 0) {
        filteredNodes = [...additionalSizesDiv.childNodes].filter(node => node.classList?.contains("row"));
    }
    return filteredNodes;
}

let updateQuantityHTML = () => {
    let filteredNodes = getFilteredNodes();

    let customQuantity = Number(customQuantityElem.value);
    
    if (customQuantity === 1 || (productType.value === "Necklace" || productType.value === "Earrings" || productType.value === "Necklace & Earring Set")) {
        customQuantityLabel.innerHTML = "Quantity:";
        customSizeLabel.innerHTML = "Size:";
        customSizeElem.name = "custom[Size]";
    } else if (customQuantity === 1 && !(productType.value === "Necklace" || productType.value === "Earrings" || productType.value === "Necklace & Earring Set")) {
        customQuantityLabel.innerHTML = "Quantity:";
        customSizeLabel.innerHTML = "Bracelet size:";
        customSizeElem.name = "custom[Size]";
    } else if (customQuantity > 10) {
        customQuantityLabel.innerHTML = "Quantity: <span class='text-muted'>(max. 10 items)</span>";
        customQuantityElem.value = 10;
        customQuantity = 10;
        return;
    } else if (customQuantity < 0) {
        customQuantityElem.value = 0;
        customQuantity = 0;
    } else {
        customQuantityLabel.innerHTML = "Quantity:";
        customSizeLabel.innerHTML = "Item 1 size:";
        customSizeElem.name = "custom[Item 1 size]";
    }

    let itemLength = filteredNodes.length;
    let additionalItems = customQuantity - 1;

    if (productType.value === "Necklace" || productType.value === "Earrings" || productType.value === "Necklace & Earring Set") return;

    if (additionalItems > itemLength) {
        for (let i = itemLength; i < additionalItems; i++) {
            additionalSizesDiv.insertAdjacentHTML('beforeend', 
            `<div class="row mb-2">
                <div class="col-6">
                    <label class="form-label" for="custom--size_${i + 2}">Item ${i + 2} size:</label>
                    <select class="form-control" name="custom[Item ${i + 2} size]" id="custom--size_${i + 2}" required>
                        <option value="" disabled selected>Jewellery Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>`
            );
        }
    } else if (additionalItems < itemLength) {
        for (let i = itemLength; i > additionalItems; i--) {
            additionalSizesDiv.removeChild(additionalSizesDiv.lastElementChild);
        }
    }
};

let updateSizeHTML = () => {
    if (productType.value === "Necklace" || productType.value === "Earrings" || productType.value === "Necklace & Earring Set") {
        customSizeElem.setAttribute("readonly", true);
        oneSizeOption.style.display = "block";
        sizeOptions.forEach(option => option.style.display = "none");
        customSizeElem.value = "One size";
        customSizeLabel.innerHTML = "Size:";
        customSizeElem.name = "custom[Size]";
        // Remove size inputs
        let filteredNodes = getFilteredNodes();
        
        for (let i = 0; i < filteredNodes.length; i++) {
            additionalSizesDiv.removeChild(additionalSizesDiv.lastElementChild);
        }   

    } else if (customSizeElem.value === "One size") {
        customSizeElem.removeAttribute("readonly");
        sizeOptions.forEach(option => option.style.display = "block");
        oneSizeOption.style.display = "none";
        customSizeElem.value = "";
        customSizeLabel.innerHTML = "Bracelet Size:";
        // Update the quantity inputs
        updateQuantityHTML();
    } 
}

let jewelleryContentDiv = document.querySelector('.jewellery_content_div');
let jewelleryLoader = document.querySelector('.jewellery-loader-div');
let jewelleryContent = document.querySelector('.jewellery_content');

// Display loader until the page has fully loaded
if (jewelleryContentDiv) {
    window.addEventListener("load", () => {
        setTimeout(() => {
            jewelleryLoader.classList.add("hide");
            jewelleryContent.classList.remove("hide");
        }, 500);
    });
}

let jewelleryShowDiv = document.querySelector('.jewellery_show_content');
let jewelleryShowLoader = document.querySelector('.jewellery-show-loader');
let jewelleryShowOverlay = document.querySelector('.jewellery-show-overlay');

if (jewelleryShowDiv) {
    window.addEventListener("load", () => {
        jewelleryShowLoader.classList.add("hide");
        jewelleryShowOverlay.style.opacity = 1;
    }); 
}

// Ensure the HTML is up to date when the page loads
if (customOrder) {
    window.addEventListener("load", updateSizeHTML);
}
customQuantityElem?.addEventListener('change', updateQuantityHTML);
productType?.addEventListener('change', updateSizeHTML);