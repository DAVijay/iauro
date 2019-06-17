'use strict';
var ProductModel = require('../models/product');
var UserModel = require('../models/user');
const Joy = require('joi');
exports.register = function (server, options, next) {

    //All functions are here
    //1:GET all product
    server.route({
        method: 'GET',
        path: '/products',
        handler: function (request, reply) {

            var product = ProductModel.find(function (err) {

                if (err) {
                    return reply('Internal MongoDB error');
                }
            });
            return reply(product);
        }
    });

    //2:GET specific product
    server.route({
        method: 'GET',
        path: '/products/{name}',
        handler: function (request, reply) {

            ProductModel.findOne({
                pname: request.params.name
            }, (err, doc) => {

                if (err) {
                    return reply('Internal MongoDB error');
                }
                if (!doc) {
                    return reply('notFound');
                }
                return reply(doc);
            });
        }
    });

    //3:Create new product
    server.route({
        method: 'POST',
        path: '/products',
        handler: function (request, reply) {
            var product = new ProductModel(JSON.parse(JSON.stringify(request.payload)));
            console.log(product);
            product.save(function (err) {
                if (err) {
                    return reply('Internal MongoDB error');
                }
            });
            return reply('Product saved');
        },
        config: {
            validate: {
                payload: {
                    pname: Joy.string().min(2).max(40).alphanum(),
                    price: Joy.number()
                }
            }
        }
    });

    //4:Delete product specific
    server.route({
        method: 'DELETE',
        path: '/products/{name}',
        handler: function (request, reply) {

            let product;

            ProductModel.findOne({ pname: request.params.name },
                (err, doc) => {
                    if (err) {
                        return reply('Internal MongoDB error');
                    }
    
                    if (doc === null) {
                        return reply('Product not Exit');
                    }
                    product = doc.id;
                    
                    UserModel.find(function (err, userdata) {
                        for (var i = 0; i < userdata.length; i++) {
                            for (var j = 0; j <= userdata[i].product.length; j++) {
                                if (String(userdata[i].product[j]) == String(product)) {
                                    userdata[i].product.splice(j, 1);
                                    break;
                                }
                            }
                            userdata[i].save();
                        }
                    })
                })

            ProductModel.deleteOne({
                pname: request.params.name
            }, function (err, result) {

                if (err) {
                    return reply('Internal MongoDB error');
                }

                if (result === null) {
                    return reply('notFound');
                }
                return reply('Product deleted...!!');
            });
        }
    });

    //4:Update product specific
    server.route({
        method: 'PUT',
        path: '/products/{name}',
        handler: function (request, reply) {

            ProductModel.findOneAndUpdate({
                pname: request.params.name
            }, request.payload,
                function (err, result) {

                    if (err) {
                        return reply('Internal MongoDB error');
                    }

                    if (result === null) {
                        return reply('notFound');
                    }
                    return reply('product updated...!!');
                })
        }
    });

    //5:get all products for specific user
    server.route({
        method: 'GET',
        path: '/products/user/{email}',
        handler: function (request, reply) {

            UserModel.findOne({ email: request.params.email })
                .populate('product')    //  pull in product data
                .exec(function (err, usersdata) {
                    if (err) {
                        return console.log(err);
                    }
                    reply(usersdata.product);
                });
        }
    });
    return next();
};

exports.register.attributes = {
    name: 'routes-products'
};