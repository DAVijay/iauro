'use strict';

const Hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers')
var cors = require('cors');
//mongo connection 
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user-product'); // connect to local database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("WE ARE CONNECTED ....!!!!");
});

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.ext('onPreResponse', corsHeaders)

const products = require('./routes/products')
const users = require('./routes/users')
//server.route(routes);
//Add the route
server.register([
    products,users 
], (err) => {

    if (err) {
        console.error("NOt connected..")
    }
}
);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});