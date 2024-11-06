const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const HWID = require('./models/HWID')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error: ', err));

const authRoutes = require('./routes/authRoutes');
const hwidRoutes = require('./routes/hwidRoutes');

app.use('/auth', authRoutes);
app.use('/hwid', hwidRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/verify-hwid', async (req, res) => {
  const { hwid } = req.body;

  if (!hwid) {
    return res.status(400).json({ error: 'HWID is required' });
  }

  const hwidExists = await HWID.findOne({ hwid });

  if (hwidExists) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.listen(3000)