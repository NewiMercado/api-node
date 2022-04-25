const {pool} = require ('./../utils/db');

// login call model
const login = async (user, password) => {
    try {
        return (await pool())
            .collection('users')
            .findOne({ user, password });
    } catch(e) {
        console.error(e);
    }
};

module.exports = {login};