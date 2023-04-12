const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const url =
  'mongodb+srv://metin:3LNYtJQFyaDPHlYK@nodejsblog.miwle5d.mongodb.net/?retryWrites=true&w=majority';


app.use(bodyParser.json());

app.use(cors());

//co

// app.use('/', blogRoutes);
// app.use('/add', add);
app.use('/blog', blogRoutes);
// app.use('/blog', blogRoutes);
// app.use(authRoutes);
app.use('/admin', adminRoutes);

// app.use((req, res) => {
//   res.status(404).render('404');
// });
mongoose
  .connect(url)
  .then((result) => {
    console.log('DB Bağlandı');
    app.listen(3000);
  })
  .catch((err) => console.log(err.message));