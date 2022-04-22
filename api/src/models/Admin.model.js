const mongoose = require ('mongoose');

const AdminSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model('Admin', AdminSchema)