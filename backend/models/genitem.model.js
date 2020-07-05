const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenItemSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  list:{
    type: String,
    required: true
  },
  creator: {
    type: mongoose.ObjectId,
    ref: 'user'
  },
  multiplicity: {
    type: Number
  },
  upvotes: {
    type: [mongoose.ObjectId]
  },
  downvotes: {
    type: [mongoose.ObjectId]
  }
});

const GenItem = mongoose.model('genitem',GenItemSchema);
module.exports = GenItem;
