// ###################################
//           WISHLIST
// ###################################

let wishlistDiv = document.querySelector('.wishlist_div');
let wishlistIcons = document.querySelectorAll('.wishlist_add');
let wishlistItems = document.querySelectorAll('.wishlist_item');
let emptyWishlistDiv = document.querySelector('.empty_wishlist')

let wishlistLoader = document.querySelector('.wishlist-loader-div');
let wishlistContent = document.querySelector('.wishlist_content');

let showEmptyWishlist = () => {
    emptyWishlistDiv.classList.remove("hide");
    wishlistLoader.classList.add("hide");
    wishlistContent.classList.add("hide");
}

let toggleWishlist = (e) => {
    let item = e.target;
    let id = item.dataset.id;

    // If there are no products on localStorage then create it
    if (!JSON.parse(localStorage.getItem("products"))) {
        let products = [];
        localStorage.setItem("products", JSON.stringify(products));
    }

    let products = JSON.parse(localStorage.getItem("products"));
    
    let index = products.indexOf(id);
    // If it is not in the wishlist
    if (index === -1) {
        products.push(id);
        item.classList.remove("far");
        item.classList.add("fas");
        item.classList.add("added");
    } else {
        // Else remove it from the wishlist
        products.splice(index, 1);
        item.classList.remove("fa-heart");
        item.classList.add("fa-heart-broken");
        setTimeout(() => {
            item.classList.remove("added");
            setTimeout(() => {
                item.classList.remove("fas");
                item.classList.remove("fa-heart-broken");
                item.classList.add("far");
                item.classList.add("fa-heart");
            }, 300);
        }, 200);
    }

    localStorage.setItem("products", JSON.stringify(products));
}

let removeWishlist = (e) => {
    let item = e.target;
    let productDiv = item.closest(".wishlist_item");
    let id = item.dataset.id;

    let products = JSON.parse(localStorage.getItem("products"));
    let index = products.indexOf(id);

    if (index !== -1) {
        products.splice(index, 1);
    
        item.classList.remove("fa-heart");
        item.classList.add("fa-heart-broken");
        setTimeout(() => {
            item.classList.remove("added");
            setTimeout(() => {
                item.classList.remove("fas");
                item.classList.remove("fa-heart-broken");
                item.classList.add("far");
                item.classList.add("fa-heart");
                setTimeout(() => {
                    productDiv.parentElement.removeChild(productDiv);
                    if (products.length === 0) showEmptyWishlist();
                }, 500);
            }, 300);
        }, 200); 

        localStorage.setItem("products", JSON.stringify(products));
    }
}

let loadWishlistCollection = () => {
    window.addEventListener("load", () => {
        if (!JSON.parse(localStorage.getItem("products"))) return;
        let products = JSON.parse(localStorage.getItem("products"));
        
        if (products.length === 0) {
            showEmptyWishlist();
        } else {
            wishlistIcons.forEach(icon => {
                if (products.indexOf(icon.dataset.id) !== -1) {
                    icon.classList.remove("far");
                    icon.classList.add("fas");
                    icon.classList.add("added");
                } else {
                    let productDiv = icon.closest(".wishlist_item");
                    productDiv.parentElement.removeChild(productDiv);
                }
            });
            
            wishlistLoader.classList.add("hide");
            wishlistContent.classList.remove("hide");
        }
    });
}

let loadWishlist = () => {
    window.addEventListener("load", () => {
        if (!JSON.parse(localStorage.getItem("products"))) return;
        let products = JSON.parse(localStorage.getItem("products"));
    
        wishlistIcons.forEach(icon => {
            if (products.indexOf(icon.dataset.id) !== -1) {
                icon.classList.remove("far");
                icon.classList.add("fas");
                icon.classList.add("added");
            }
        });

    });
}


if (wishlistDiv) {
    // If you they are on the wishlist/index page
    loadWishlistCollection();
    // Add eventlisteners to remove the item from the wishlist
    wishlistIcons.forEach(icon => icon.addEventListener("click", removeWishlist));
} else if (wishlistIcons && wishlistIcons.length > 0) {
    // If they are on any other page
    loadWishlist();
    // Add event listeners to toggle the wishlist icon
    wishlistIcons.forEach(icon => icon.addEventListener("click", toggleWishlist));
}

