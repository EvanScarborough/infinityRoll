const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors);
app.use(express.json());

// connect to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to database');
});

// add routers
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const tagRouter = require('./routes/tags');
const genlistsRouter = require('./routes/genlists');
const genitemsRouter = require('./routes/genitems');
const genRouter = require('./routes/gen');
app.use('/api/users',usersRouter);
app.use('/api/auth',authRouter);
app.use('/api/tags',tagRouter);
app.use('/api/lists',genlistsRouter);
app.use('/api/items',genitemsRouter);
app.use('/api/gen',genRouter);

app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
