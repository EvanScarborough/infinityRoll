const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TagSchema = require('./tag.model').TagSchema;

const GenListSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  tags:{
    type: [String]
  },
  description: {
    type: String
  },
  background: {
    type: String
  },
  example: {
    type: String
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user'
  },
  private: {
    type: Boolean
  },
  contributors: {
    type: [mongoose.ObjectId]
  },
  likes: {
    type: [mongoose.ObjectId]
  }
});

const GenList = mongoose.model('genlist',GenListSchema);
module.exports = GenList;
