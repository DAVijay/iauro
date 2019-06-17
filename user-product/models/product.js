var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    pname: {
        type: String
    },
    price: {
        type: Number,
        default: 100
    }
});

module.exports = mongoose.model('Product', productSchema);