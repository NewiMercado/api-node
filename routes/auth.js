const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const model = require('./../models/auth');
const signOptions = { expiresIn: '12h', algorithm:'RS256' };
const key = fs.readFileSync('./keys/private.pem');

const createToken = payload => jwt.sign(payload, signOptions);

// validate the login
const auth = async (req, res) => {
    try {
        const { user, password } = req.body;
        // call to the login model
        const userLogin = await model.login(user, sha1(password)); // sha1 encrypts the pw, it generates an string
        if (!userLogin) res.status(401).json({message : 'You shall not pass'}); // unauthorized access
        const { _id } = userLogin; // destructuring the userLogin object
        const token = createToken({ _id, user }); // generates a token with the Mongo ObjectId and the user - {_id: ObjectId, user: 'admin'}
        res.json({ jwt : token });
    } catch(e) {
        console.log(e);
    }
};

// localhost:3000/auth [POSt]
router.post('/', auth);

module.exports = auth;