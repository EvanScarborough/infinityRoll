const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

router.get('/',auth,(req, res) => {
  User.find()
    .select('-password')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.post('/register',(req, res) => {
  let {username, email, password} = req.body;
  console.log(req.body);
  // make sure fields exist
  if(!username || !email || !password){
    return res.status(400).json({msg:'One or more fields missing.'});
  }
  // check if password is valid
  var passw = /^[A-Za-z]\w{6,14}$/;
  if(!password.match(passw)) {
    return res.status(400).json({msg:'Invalid password.'});
  }
  // always save email as lowercase
  email = email.toLowerCase();
  // check if email is valid
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email)){
    return res.status(400).json({msg:'Invalid email.'});
  }
  // check for existing user by username or email
  User.findOne({$or: [{username:username},{email:email}]})
    .then(user => {
      if(user){
        return res.status(400).json({msg:'User already exists.'});
      }
      const newUser = new User({username,email,password});
      //create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                {id:user.id},
                process.env.JWT_SECRET,
                {expiresIn:86400},
                (err, token) => {
                  return res.json({
                    token:token,
                    user:{
                      id: user.id,
                      username: user.username,
                      email: user.email,
                      premium: false
                    }
                  });
                }
              );
            });
        });
      });
    });
});

module.exports = router;
