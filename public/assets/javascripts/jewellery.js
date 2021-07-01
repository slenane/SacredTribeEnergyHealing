let infobar = document.querySelector(".hero_infobar");
let infobarText = document.querySelector(".hero_infobar--text");
let buyingGuide = document.querySelector(".hero_infobar--grid");
let buyingGuideBtn = document.querySelector(".buying_guide-button");
let buyButton = document.querySelector(".buy_button");
let addToBagLoader = document.querySelector(".add_to_bag_loader");

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

// ###################################
//             SHOW PAGE
// ###################################

// Image gallery
const swiperThumbnails = new Swiper(".swiperThumbnails", {
    slidesPerView: 7,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical'
});
const swiperMainImage = new Swiper(".swiperMainImage", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiperThumbnails,
    },
});

// Add item to cart
let addingToCart = () => {
    buyButton.classList.add("cart--adding_to_cart");
    buyButton.classList.add("flash");
    buyButton.innerHTML = "ADDING TO BAG";
}

buyingGuideBtn?.addEventListener("click", toggleShowDropdown);
buyButton?.addEventListener("click", addingToCart);

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
    } else {
        customSizeLabel.innerHTML = "Bracelet Size:";
    }
}

// Ensure the HTML is up to date when the page loads

if (customOrder) {
    window.addEventListener("load", updateSizeHTML);
}
customQuantityElem?.addEventListener('change', updateQuantityHTML);
productType?.addEventListener('change', updateSizeHTML);