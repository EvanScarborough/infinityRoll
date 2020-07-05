const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  color: {
    type: String,
    required: true
  }
});

const Tag = mongoose.model('tag',TagSchema);
module.exports = {Tag:Tag, TagSchema:TagSchema};
