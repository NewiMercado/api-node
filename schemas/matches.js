const Joi = require('@hapi/joi');

const numbers = Joi.number().positive().required(); // just a shortcut

const schemas = {
    create: Joi.object().keys({
        date: Joi.date().required(),
        rival: Joi.string().required(),
        points: numbers,
        goalsFor : numbers,
        goalsAgainst: numbers
    })
};

module.exports = { schemas };