const router = require('express').Router();
let GenList = require('../models/genlist.model');
let Tag = require('../models/tag.model').Tag;
let User = require('../models/user.model');

const auth = require('../middleware/auth');


router.get('/',(req, res) => {
  GenList.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/main',(req,res) => {
  GenList.find()
    .then(lists => {
      res.json([{name:'All',generators:lists}]);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:uid',(req, res) => {
  GenList.findOne({name:req.params.uid})
    .populate('owner','-email -password')
    .then(list => {
      res.json(list)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// create a new list
router.post('/add',auth,(req, res) => {
  let {name, tags, description, example} = req.body;
  let ownerId = req.user.id;

  name = name.trim();
  name = name.replace(/ /g,'_');

  // check for required info
  if(!name || name.length == 0 || !description || !ownerId){
    return res.status(400).json({msg:'Missing required information! ' + name + " " + description + " " + ownerId});
  }
  // names must always be uppercase
  name = name.toUpperCase();
  if(!tags) tags = [];
  // find all tags with matching name
  Tag.find({_id: {$in: tags}})
    .then(ftags => {
      // if the list of found tags (ftags) has more or fewer items than the provided list, then the input was invalid
      if(tags.length != ftags.length) return res.status(400).json({msg:'Invalid tags were found'});
      // all tags were valid
      // check that name is unique
      GenList.findOne({name:name})
        .then(list => {
          if(list) return res.status(400).json({msg:'There is already a list with that name. Names must be unique.'});

          const taglist = ftags.map(item => {return item.name});
          const newList = new GenList({name:name,tags:taglist,description:description,example:example,owner:ownerId,background:'https://infinityrollimg.s3.us-east-2.amazonaws.com/DEFAULT_BACKGROUND.png'});
          newList.save()
            .then(list => {
              return res.json(list);
            })
            .catch(err => res.status(400).json({err:err}));
        });
    })
    .catch(err => {return res.status(400).json({err:err})});
});

module.exports = router;
