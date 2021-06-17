const fetch = require('node-fetch');
const Client = require('shopify-buy');

let client = Client.buildClient({
    domain: 'test-store-8192.myshopify.com',
    storefrontAccessToken: 'fd46ea9a012ae63c832acc34d6a27ee8'
}, fetch);

module.exports.getAllProducts = client.product
    .fetchAll()
    .then((products) => {
        return products;
    });

// client.collection.fetchAllWithProducts().then((collections) => {
//     // Do something with the collections
//     collections.forEach(collection => {
//         console.log(collection.id, collection.title);
        
//     })
// });

module.exports.getCollection = async (type) => {
    let collectionID, collection = {};

    if (type === "bracelet-earring") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MjQzOTYwNzQ1Ng=="; 
    else if (type === "necklace-earring") collectionID = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MjY0MjM3NTg0MA==";
    else if (type === "bracelet-necklace-earring") collectionID = "";
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