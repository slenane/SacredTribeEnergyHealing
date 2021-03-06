const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    title: String,
    image: String,
    imagePos: String,
    text: String,
    link: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Link', LinkSchema);
