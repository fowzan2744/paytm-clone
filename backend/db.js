
let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
})

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
 },
  password: {
    type : String,
    required: true,
    minlength: 8,
    maxlength: 100,
  }
  ,
  firstName: 
  {
    type : String,
    required: true,
  },
  lastName:
  {
    type : String,
    required: true,
  }
});

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
const User = mongoose.model('User',userSchema);

module.exports = {
    User,Account
};