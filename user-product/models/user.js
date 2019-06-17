var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: "",
        unique : true
    },
    add: {
        type: String,
        default: ""
    },
    pass:{
        type:String
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,  //REFERENCING :D
        ref: "Product"
    }]
});

module.exports = mongoose.model('User', userSchema);