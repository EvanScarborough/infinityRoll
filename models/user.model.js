const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: [mongoose.ObjectId]
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  premium: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user',UserSchema);
module.exports = User;
