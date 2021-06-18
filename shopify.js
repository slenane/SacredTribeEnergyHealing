const fetch = require('node-fetch');
const Client = require('shopify-buy');
const materialsObj = require('./materials');

// console.log(Object.keys(materialsObj));

let client = Client.buildClient({
    domain: 'test-store-8192.myshopify.com',
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
}, fetch);


module.exports.getAllProducts = client.product
.fetchAll()
.then((products) => {
    return products;
});

module.exports.getFeaturedProducts = async () => {
    let featuredItems = {}, featuredImages = [];
    // Fetch all collections and get the first product from each
    await client.collection.fetchAllWithProducts().then((collections) => {
        for (let collection of collections) {
            if (collection.products[0].productType === "Bracelet & Earring set") featuredItems[0] = collection.products[0];
            else if (collection.products[0].productType === "Bracelet, Necklace & Earring set") featuredItems[1] = collection.products[0];
            else if (collection.products[0].productType === "Necklace & Earring set") featuredItems[2] = collection.products[0];
        }

        for (let i = 0; i < 6; i++) {
            featuredImages.push(collections[0].products[i].images[0].src);
        }
    });
    return [featuredItems, featuredImages];
}

// client.collection.fetchAllWithProducts().then((collections) => {
    //     // Do something with the collections
    //     collections.forEach(collection => {
        //         console.log(collection.id, collection.title);
        //     })
        // });
        
module.exports.getCollection = async (type) => {
    let collectionID, collection = {};

    if (type === "bracelet-earring" || type === "Bracelet & Earring set") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MjQzOTYwNzQ1Ng=="; 
    else if (type === "necklace-earring" || type === "Necklace & Earring set") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MjY0MjM3NTg0MA==";
    else if (type === "bracelet-necklace-earring" || type === "Bracelet, Necklace & Earring set") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3Mjc5NTE0MDI1Ng==";
    else return;
    
    await client.collection
        .fetchWithProducts(collectionID, {productsFirst: 10})
        .then((foundCollection) => {
            collection = foundCollection.products;
        });
    return collection;
}

module.exports.getProduct = async (productID) => {
    let product = {};
    await client.product
        .fetch(productID).then((foundProduct) => {
            product = foundProduct;
        });
    let obj = {};
    let keys = Object.keys(product);
    for (key of keys) {
        obj[key] = product[key];
    }
    console.log(obj);
    return product;
} 

module.exports.parseDescription = async (productDescription, productDescriptionHTML) => {
    let materialsRegex = /MATERIALS/;
    // Find the index of where the materials list starts in description and descriptionHTML (+/- "materials:")
    let indexDescription = (productDescription).match(materialsRegex)?.index + 11;
    let indexDescriptionHTML = (productDescriptionHTML).match(materialsRegex)?.index - 4;
    // If there's no material list, then return
    if (indexDescription === -1 || indexDescription === undefined) return;
    if (indexDescriptionHTML === -1 || indexDescriptionHTML === undefined) return;
    // Get an array of the materials from the description
    let materialsArr = (productDescription).slice(indexDescription).split(", ");
    // Get the material data from the materialsObj
    let materials = getMaterials(materialsArr);
    // Get the description with the materials removed
    let description = (productDescriptionHTML).slice(0, indexDescriptionHTML);

    return [materials, description];
}

let getMaterials = (materialsArr) => {
    let materials = {};
    // If the materials listed match the materialsObj then add it to the new materials array
    for (let i = 0; i < materialsArr.length; i++) {
        console.log(materialsArr[i]);
        if (materialsObj[materialsArr[i]]) {
            materials[materialsArr[i]] = materialsObj[materialsArr[i]];
        } 
    }
    return materials;
}