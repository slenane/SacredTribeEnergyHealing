const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JewellerySchema = new Schema({
    title: String,
    price: String,
    description: String,
    material: String,
});

module.exports = mongoose.model('Jewellery', JewellerySchema);