const express = require('express');
const router = express.Router();
const model = require('./../models/matches');
const { route } = require('../app');
// points

/* CALLS
-- When execute the call, it resolves with a json. In production the error shouldn't be sended.
*/

const all = (req, res) => 
    model
        .all()
        .then(response => res.json(response))
        .catch((e) => res.status(500).json({ message: "Error", e }));

const last = (req, res) => 
    model
        .last()
        .then(response => res.json(response))
        .catch((e) => res.status(500).json({ message: "Error", e }));

const dates = async (req, res) => {
    try {
        const { start, end } = req.query;
        const matches = await model.findByDate(start, end);
        res.json({ matches });
    } catch(e) {
        res.status(500).json({ message: 'An error occurred', e });
    }
};

// ROUTES

router.get('/all', all);
router.get('/last', last);
router.get('/dates', dates);

module.exports = router;