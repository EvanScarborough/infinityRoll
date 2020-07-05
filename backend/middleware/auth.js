require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next){
  const token = req.header('x-auth-token');
  // check for token
  if(!token) res.status(401).json({msg: 'No auth token'});

  try{
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // add user
    req.user = decoded;
    next();
  }catch(e){
    res.status(400).json({msg: 'Bad auth token'});
  }
}

module.exports = auth;
