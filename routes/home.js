const express = require('express')
const router = express.Router()
const home = require('../models/home');

router.get('/', (req, res)=>{
  home.getProfileDetails(req.session.user).then(data=>{
    res.status(200).json(data);
  }).catch(error=>{
    res.status(400).json({
      message: "There is problem with your request.",
      error: error
    });
  })
});

module.exports = router;
