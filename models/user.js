const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avarta: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now()
    },
});
const Users = mongoose.model('Users', userSchema);
module.exports = {Users}