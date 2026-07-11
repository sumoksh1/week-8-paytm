// backend/db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:Sumoksh123@cluster0.qcesoic.mongodb.net/')
    .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User,
    Account
};