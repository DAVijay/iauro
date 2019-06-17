'use strict';
var UserModel = require('../models/user');
var ProductModel = require('../models/product');
const Joy = require('joi');
exports.register = function (server, options, next) {

    //All functions are here
    //1:GET all users
    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {

            var user = UserModel.find(function (err) {

                if (err) {
                    return reply('Internal MongoDB error');
                }
            });
            return reply(user);
        }
    });

    //2:GET specific user
    server.route({
        method: 'GET',
        path: '/users/{email}',
        handler: function (request, reply) {

            UserModel.findOne({
                email: request.params.email
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

    //3:Create new users
    server.route({
        method: 'POST',
        path: '/users',
        handler: function (request, reply) {

            var product = new UserModel(JSON.parse(JSON.stringify(request.payload)));
            console.log(product);
            product.save(function (err,doc) {
                if (err) {
                    return reply('Internal MongoDB error')
                }
                else if(!doc){
                    reply("somthing goes wrong..")
                }
            });
            return reply('user saved');
        },
        config: {
            validate: {
                payload: {
                    uname: Joy.string().min(2).max(40).required(),
                    email: Joy.string().email().required(),
                    add: Joy.string().min(2).max(40),
                    pass:Joy.string().alphanum().min(4).max(30).required()
                }
            }
        }
    });

    //4:Delete user specific
    server.route({
        method: 'DELETE',
        path: '/users/{email}',
        handler: function (request, reply) {

            UserModel.deleteOne({
                email: request.params.email
            }, function (err, result) {

                if (err) {
                    return reply('Internal MongoDB error');
                }

                if (result === null) {
                    return reply('notFound');
                }
                return reply('User deleted...!!');
            });
        }
    });

    //4:Update user specific
    server.route({
        method: 'PUT',
        path: '/users/{email}',
        handler: function (request, reply) {

            UserModel.findOneAndUpdate({
                email: request.params.email
            }, request.payload,
                function (err, result) {

                    if (err) {
                        return reply('Internal MongoDB error');
                    }

                    if (result === null) {
                        return reply('notFound');
                    }
                    return reply('users updated...!!');
                })
        }
    });

    //5:Add product to specific user
    server.route({
        method: 'Post',
        path: '/users/{email}/{name}',
        handler: function (request, reply) {
            let user;
            let product;

            ProductModel.findOne({
                pname: request.params.name
            }, (err, doc) => {
                if (err) {
                    return reply('Internal MongoDB error');
                }

                if (doc === null) {
                    return reply('Product not Exit');
                }
                product = doc;

                UserModel.findOne({
                    email: request.params.email
                }, (err, doc) => {
                    if (err) {
                        return reply('Internal MongoDB error');
                    }
    
                    if (doc === null) {
                        return reply('User not exit..');
                    }
                    user = doc;
                    user.product.push(product);
                    user.save();
                });
                reply('succeessfully added....');
            });
        }
    });

    //6:Delete specific product from user
    server.route({
        method: 'Delete',
        path: '/users/{email}/{name}',
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

                    UserModel.findOne({ email: request.params.email },
                        function (err, me) {
                            if (err) {
                                return reply('Internal MongoDB error');
                            }
            
                            if (doc === null) {
                                return reply('User not exit..');
                            }
                            for (var i = 0; i <= me.product.length; i++) {
                                if (String(me.product[i]) == String(product)) {
                                    me.product.splice(i, 1);
                                    break;
                                }
                            }
                            me.save();
                        });
                    reply('succeessfully Deleted....');
                });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-users'
};