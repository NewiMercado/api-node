const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = fs.readFileSync('./keys/public.pem');

// just a step to verify the token and the credentials, if fails, it goes to by the catch and throw an err
const secured = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const { _id } = jwt.verify(authorization, key);
        req.id = _id; // put the user ObjectId into req.id
        next();
    } catch(e) {
        console.error(e);
        res.status(401).json({ message : 'You shall not pass' });
    }
};

module.exports = { secured };