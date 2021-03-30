const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/user");

module.exports = {
    Mutation: {
       async  register(_, { registerInput : {username, email, password, confirmPassword}}, context, info){
            //TODO Validate user data
            //TODO Make sure user doesn't already exist
            //TODO hash password and create auth token
            password = await buildSchemaFromTypeDefinitions.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, {expiresIn: "1h"} );
        return{
            ...res._doc,
            id: res_id,
            token
        }
        }
    }
};