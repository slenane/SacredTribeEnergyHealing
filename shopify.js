const fetch = require('node-fetch');
const Client = require('shopify-buy');
const materialsObj = require('./materials');
// Set the global fetch variable
global.fetch = fetch;

// console.log(Object.keys(materialsObj));

const client = Client.buildClient({
    domain: 'Sacred-Tribe-Energy-Healing.myshopify.com',
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

// Create a customer checkout
let createCheckout = async () => {
    let newCheckout = {};
    // Create the new checkout
    await client.checkout.create()
        .then(async (checkout) => {
            newCheckout = checkout;
        })
        .catch((err) => {
            console.log(err);
        });
    // Return the new Checkout
    return newCheckout.id;
}


let getCart = async (session) => {
    let cart = {};

    if (!session.checkoutID) session.checkoutID = await createCheckout();

    await client.checkout.fetch(session.checkoutID)
        .then((foundCart) => {
            cart = foundCart;
        })
        .catch ((err) => console.log(err));

            // let obj = {};
            // let keys = Object.keys(cart);
            // for (key of keys) {
            //     obj[key] = cart[key];
            // }
            // console.log(obj);

    return cart;
}

// Get all products
let getAllProducts = async () => {
    let products, custom;
    await client.product.fetchAll(50)
            .then((foundProducts) => {
                products = foundProducts;
            })
            .catch((err) => {
                console.log(err);
            });
    // return Jewellery only
    custom = products.filter(item => item.productType === "Custom Jewellery")[0];
    products = products
        .filter(item => item.productType !== "Energy Treatment")
        .filter(item => item.productType !== "Absentee Treatment")
        .filter(item => item.productType !== "Custom Jewellery");
    
    return [products, custom]; 
}

let getTreatment = async (type) => {
    // Collection ID for treatments
    let collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzMyMzc4OTUyMTA5Ng==";
    let collection = {};

    await client.collection
        .fetchWithProducts(collectionID)
        .then((foundCollection) => {
            collection = foundCollection.products;
        })
        .catch((err) => {
            console.log(err);
        });
    
    return collection.filter(treatment => treatment.productType === type);
}

// Get featured products for homepage
let getFeaturedProducts = async () => {
    let featuredItems = {}, featuredImages = [];
    // Fetch all collections and get the first product from each
    await client.collection.fetchAllWithProducts().then((collections) => {
        for (let collection of collections) {
            if (collection.products[0].productType === "Bracelet & Earring Set") featuredItems[0] = collection.products[0];
            else if (collection.products[0].productType === "Bracelet, Necklace & Earring Set") featuredItems[1] = collection.products[0];
            else if (collection.products[0].productType === "Necklace & Earring Set") featuredItems[2] = collection.products[0];
        }

        // REDO THIS BUT BETTERRRRRRR
        for (let i = 0; i < 6; i++) {
            featuredImages.push(collections[0].products[0].images[0]?.src);
        }
    })
    .catch((err) => {
        console.log(err);
    });

    return [featuredItems, featuredImages];
}

// Get collection information
// client.collection.fetchAllWithProducts().then((collections) => {
//         // Do something with the collections
//         collections.forEach(collection => {
//                 console.log(collection.id, collection.title);
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//         });
      
// Get the collection based on the type argument
let getCollection = async (type) => {
    let collectionID, collection = {};

    if (type === "bracelet-earring" || type === "Bracelet & Earring Set") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzMyMzM3NDAyMjg1Ng=="; 
    else if (type === "necklace-earring" || type === "Necklace & Earring Set") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzMyMzM3NDM1MDUzNg==";
    else if (type === "bracelet-necklace-earring" || type === "Bracelet, Necklace & Earring Set") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzMyMzM3NDMxNzc2OA==";
    else return;
    
    await client.collection
        .fetchWithProducts(collectionID)
        .then((foundCollection) => {
            collection = foundCollection.products;
        })
        .catch((err) => {
            console.log(err);
        });
    return collection;
}

// Get an individual product based on the product ID
let getProduct = async (productID) => {
    let product = {};
    await client.product.fetch(productID)
        .then((foundProduct) => {
            product = foundProduct;
        })
        .catch((err) => {
        console.log(err);
        });
    // let obj = {};
    // let keys = Object.keys(product);
    // for (key of keys) {
    //     obj[key] = product[key];
    // }
    // console.log(obj);
    return product;
} 

// Parse the product description to get materials and description
let getMaterials = async (productDescription) => {
    let materials = {};
    let materialsArr = productDescription.split(" and ")
                        .join(", ")
                        .split(", ")
                        .map(material => material.toLowerCase());

    // If the materials listed match the materialsObj then add it to the new materials array
    for (let i = 0; i < materialsArr.length; i++) {
        if (materialsObj[materialsArr[i]]) {
            materials[materialsArr[i]] = materialsObj[materialsArr[i]];
        } 
    }
    // Add the feather to all materials
    materials["feather"] = materialsObj["feather"];
    materials["reclaimed"] = materialsObj["reclaimed"];
    materials["earrings"] = materialsObj["earrings"];
    // return materials list
    return materials;
}

let getCustomJewelleryItem = async (checkoutID, lineItemID) => {
    let custom;
    await client.checkout.fetch(checkoutID)
        .then((checkout) => {
            checkout.lineItems.forEach(item => {
                if (item.id === lineItemID) custom = item;
            });
        });
    return custom;
}

let getLineItem = async (checkoutID, productID) => {
    let lineItem;
    await client.checkout.fetch(checkoutID)
        .then((checkout) => {
            checkout.lineItems.forEach(item => {
                if (item.variant.product.id === productID) lineItem = item;
            });
        });
    return lineItem;
}

let getLineItemIDs = async (checkoutID) => {
    let IDs = [];

    await client.checkout.fetch(checkoutID)
        .then((checkout) => {
            checkout.lineItems.forEach(item =>  IDs.push(item.id));
        });

    return IDs;
}

let isProductInCart = async (checkoutID, productID) => {
    let answer;
    await client.checkout.fetch(checkoutID)
        .then((foundCart) => {
            for (let item of foundCart.lineItems) {
                if (productID === item.variant.product.id) answer = true;
            }
        })
        .catch ((err) => console.log(err));

    return answer === true ? true : false;
}

// Add an item to the checkout
let addLineItem = async (checkoutID, productID, jewelleryOptions, customOptions) => {
    // Get the current product from it's ID
    let product = await getProduct(productID);
    // Provide the options of the item
    let lineItem;
    if (customOptions) {
        let variantID;
        product.variants.forEach((item) => {
            if (item.title === customOptions.type) variantID = item.id;
        });
        if (!variantID) return;

        let additionalItems = Object.keys(customOptions).filter(item => item.match("Item ") || item.match("Size"));
        
        let custom = [];

        for (let i = 0; i < additionalItems.length; i++) {
            custom.push({key: additionalItems[i], value: customOptions[additionalItems[i]]});
        }
        custom.push({key: "Message", value: customOptions.Message});

        lineItem = {
            variantId: variantID,
            quantity: Number(customOptions.quantity),
            customAttributes: [...custom]
        }
    } else {
        lineItem = {
            variantId: product.variants[0].id,
            quantity: 1,
            customAttributes: [{key: "Size", value: jewelleryOptions["Size"]}]
        }
    }
    // Add the item to the checkout
    await client.checkout.addLineItems(checkoutID, lineItem)
        .then(checkout => {
            return checkout;
        })
        .catch(err => { return err; }); 
}

let updateLineItem =  async (checkoutID, lineItemID, customOptions) => {
    let lineItems, variantID;
    let lineItem = await getCustomJewelleryItem(checkoutID, lineItemID);
    let product = await getProduct(lineItem.variant.product.id);

    product.variants.forEach((item) => {
        if (item.title === customOptions.type) variantID = item.id;
    });
    if (!variantID) return;

    let additionalItems = Object.keys(customOptions).filter(item => item.match("Item ") || item.match("Size"));
        
    let custom = [];

    for (let i = 0; i < additionalItems.length; i++) {
        custom.push({key: additionalItems[i], value: customOptions[additionalItems[i]]});
    }
    custom.push({key: "Message", value: customOptions.Message});

    let lineItemToUpdate = [
        {
            id: lineItemID, 
            variantId: variantID,
            quantity: Number(customOptions.quantity),
            customAttributes: [...custom]
        }
    ];

    await client.checkout.updateLineItems(checkoutID, lineItemToUpdate)
        .then((checkout) => {
            lineItems = checkout.lineItems;
        })
        .catch(err => { return err });

    return lineItems;
}

// Remove an item from the checkout
let removeLineItem = async (checkoutID, productID) => {
    await client.checkout.removeLineItems(checkoutID, [productID])
        .then((checkout) => {
            return checkout;
        })
        .catch(err => { return err; });
}

module.exports = {
    getAllProducts,
    getTreatment,
    getFeaturedProducts,
    getCollection,
    getProduct,
    getMaterials,
    getCustomJewelleryItem,
    getLineItem,
    createCheckout,
    getCart,
    getLineItemIDs,
    isProductInCart,
    addLineItem,
    updateLineItem,
    removeLineItem
}