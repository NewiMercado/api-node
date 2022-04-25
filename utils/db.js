const MongoClient = require('mongodb').MongoClient;

const pool = async () => {
    try {
        // connection to db by the default port
        return (await MongoClient.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}`)).db('matches');
    } catch (e) {
        // log the error if db cant connect
        console.error(e.stack);
    }
};

module.exports = { pool };