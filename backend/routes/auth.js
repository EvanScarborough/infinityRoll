const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');


router.post('/',(req, res) => {
  let {username, password} = req.body;
  // make sure fields exist
  if(!username || !password){
    return res.status(400).json({msg:'One or more fields missing.'});
  }
  // always save email as lowercase
  email = username.toLowerCase();
  // check for existing user by username or email
  User.findOne({$or: [{username:username},{email:email}]})
    .then(user => {
      if(!user){
        return res.status(400).json({msg:'No user found.'});
      }
      // validate password
      bcrypt.compare(password,user.password)
        .then(match => {
          if(!match){
            return res.status(400).json({msg:'Invalid password.'});
          }
          jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            {},
            (err, token) => {
              return res.json({
                token:token,
                user:{
                  id: user.id,
                  username: user.username
                }
              });
            }
          );
        })
        .catch(err => {
          return res.status(401).json(err);
        });
    });
});


router.get('/user',auth,(req,res)=>{
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});



module.exports = router;
