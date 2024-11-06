const express = require('express');
const HWID = require('../models/HWID');
const Log = require('../models/Log');
const { ensureAuthenticated } = require('../config/authConfig');
const router = express.Router();

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const hwids = await HWID.find();
  const logs = await Log.find().sort({ timestamp: -1 });
  res.render('dashboard', { hwids, logs });
});

router.post('/add', ensureAuthenticated, async (req, res) => {
  const { hwid } = req.body;
  const newHwid = new HWID({ hwid });
  await newHwid.save();

  const log = new Log({ action: 'Added HWID', hwid });
  await log.save();

  res.redirect('/hwid/dashboard');
});

router.post('/delete', ensureAuthenticated, async (req, res) => {
  const { hwid } = req.body;
  await HWID.deleteOne({ hwid });

  const log = new Log({ action: 'Deleted HWID', hwid });
  await log.save();

  res.redirect('/hwid/dashboard');
});

module.exports = router;