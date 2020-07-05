const router = require('express').Router();
let GenItem = require('../models/genitem.model');
let GenList = require('../models/genlist.model');


function getRandom(min,max){
  return Math.floor((Math.random() * max) + min);
}


function pick(items){
  let max = 0;
  items.forEach(item => {max += item.multiplicity});
  let n = getRandom(0,max);
  var item = {};
  for(let i = 0; i < items.length; i++){
    item = items[i];
    n -= item.multiplicity;
    if(n < 0){
      return item.value;
    }
  }
}

var evaluate = function(item){
  return new Promise(function(resolve, reject) {
    if(item.indexOf('{') < 0){
      // nothing to evaluate, so you're done!
      resolve(item);
    }
    else{
      let s = item.indexOf('{'),
          e = item.indexOf('}'),
          cmd = item.substring(s+1,e);
      GenItem.find({list:cmd})
        .then(items => {
          //let newitem = item.substring(0,s) + pick(items) + item.substring(e+1);
          resolve(evaluate(item.substring(0,s) + pick(items) + item.substring(e+1)));
        })
        .catch(err => reject(err));
    }
  });
}


// var evaluate = function(command) {
//   return new Promise(function(resolve, reject) {
//     GenItem.find({list:command})
//       .then(items => {
//         resolve(pick(items));
//       })
//       .catch(err => reject(err));
//   });
// }
//
//
// var evaluateAll = function(item) {
//   return new Promise(function(resolve, reject) {
//     if(item.indexOf('{') < 0){
//       // nothing to evaluate, so you're done!
//       resolve(item);
//     }
//     // there's at least one set of {} to evaluate
//     let s = item.indexOf('{'),
//         e = item.indexOf('}');
//     evaluate(item.substring(s+1,e))
//       .then(evaluated => {
//         item = item.substring(0,s) + evaluated + item.substring(e+1);
//         resolve(evaluateAll(item));
//       });
//   });
// }

// function evaluate(command){
//   GenItem.find({list:command})
//     .then(items => {
//       return pick(items);
//     })
//     .catch(err => {return command;});
// }
//
// function evaluateAll(item){
//   while(item.indexOf('{') >= 0){
//     if(item.indexOf('}') < 0) break;
//     let s = item.indexOf('{'),
//         e = item.indexOf('}');
//
//     item = item.substring(0,s) + evaluate(item.substring(s+1,e)) + item.substring(e+1);
//   }
//   return item;
// }



router.route('/:uid').get((req, res) => {
  GenItem.find({list:req.params.uid})
    .then(items => {
      evaluate(pick(items))
        .then(item => {return res.json(item);})
        .catch(err => {return res.status(400).json('Error');})
    })
    .catch(err => res.status(400).json('Error'));
});

module.exports = router;
