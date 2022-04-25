const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = fs.readFileSync('./keys/public.pem');
const {schemas} = require('./../schemas/matches');

const create = (req, res, next) => {
    const { error, value } = schemas.create.validate(req.body); // validation for the request
    error ? res.status(422).json({error: error.details[0].messages}) : next(); // if not an error, just pass to the next step
};

module.exports = { create };