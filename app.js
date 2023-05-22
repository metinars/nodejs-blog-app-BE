const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const url =
  'mongodb+srv://' +
  process.env.usernameDB +
  ':' +
  process.env.passwordDB +
  '@nodejsblog.miwle5d.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(cors());
app.use('/admin', adminRoutes);
app.use('/', authRoutes);

mongoose
  .connect(url)
  .then((result) => {
    console.log('DB Bağlandı');
    app.listen(process.env.listenPort);
  })
  .catch((err) => console.log(err.message));