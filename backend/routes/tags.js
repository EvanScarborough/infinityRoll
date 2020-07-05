const router = require('express').Router();
let Tag = require('../models/tag.model').Tag;

router.get('/',(req, res) => {
  Tag.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add a thing (only development)
// router.post('/add',(req, res) => {
//   const {name,color} = req.body;
//   const newTag = new Tag({name:name,color:color});
//   newTag.save();
//   res.send('Done');
// });

module.exports = router;
