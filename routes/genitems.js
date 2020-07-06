const router = require('express').Router();
let GenItem = require('../models/genitem.model');
let GenList = require('../models/genlist.model');

const auth = require('../middleware/auth');

router.route('/:uid').get((req, res) => {
  GenItem.find({list:req.params.uid})
    .populate('creator','-email -password')
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',auth,(req, res) => {
  let {itemText, generator, multiplicity} = req.body;
  let ownerId = req.user.id;

  // check for required info
  if(!itemText || !generator){
    return res.status(400).json({msg:'Missing required information!'});
  }
  if(!multiplicity){
    multiplicity = 1;
  }
  // generator names must always be uppercase
  generator = generator.toUpperCase();

  GenList.findOne({name:generator})
    .then(listfound => {
      if(!listfound){
        return res.status(400).json({msg:'Invalid Generator Name!'});
      }
      const newitem = new GenItem({value:itemText,list:generator,multiplicity:multiplicity,creator:ownerId});
      newitem.save()
        .then(item => {
          return res.json(item);
        })
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
