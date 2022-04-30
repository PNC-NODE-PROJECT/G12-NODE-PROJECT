// ToDo
const mongoose = require("./database");

//real data--------------------
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
});



// Create the Model for the Tasks collection from Schema

const users = mongoose.model('users', usersSchema);


module.exports.users = users;