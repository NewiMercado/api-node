const {pool} = require('./../utils/db');


// data entry
const create = async ({ goalsFor, goalsAgainst, date, rival, points }) =>
    (await pool()).collection('teams').insertOne({
        goalsFor,
        goalsAgainst,
        date: new Date(date), // because of the date format
        rival,
        points
    }) // create the teams collection

// call to return the teams collection, find any data by parameters, sort it, establish the objects limit (50 if the limit parameter is empty) and then convert it to an array because of the find() method.
const find = async ({conditions = {}, projection = {}, sort = {}, limit = 50}) => {
    try {
        return(await pool())
        .collection('teams')
        .find(conditions, {projection})
        .sort(sort)
        .limit(limit)
        .toArray();
    } catch (error) {
        console.log(error);
    }
}

// query to return all the elements in the collection (althought you can limit the quantity of objects) 
const all = () => find({});

// query to return the last match, it sorts the object by descending and takes just 1
const last = () => 
    find({
        sort : {_id : -1}, 
        limit : 1});

// query to find a match by date
const findByDate = (start, end) => 
    find({
        conditions : {
            date : {
                $gte : new Date(start), // ISOString
                $lte : new Date(end) || new Date(start), // if end is empty, it returns the matches from start date
            }
        }
    })

module.exports = { findByDate, all, last, create };