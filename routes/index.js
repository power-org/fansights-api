const express = require('express')
const router = express.Router()
const mw = require('../middlewares/auth');

router.get('/', mw.isAuth, (req, res)=>{
    res.render('index');
});

router.get('/login', mw.hasSession, (req, res)=>{
    res.send('login');
});

router.get('/logout', (req, res)=>{
    if(req.session.user) delete req.session.user;
    res.redirect('/login');
});

router.get('/signup', mw.hasSession, (req, res)=>{
    res.send('signup');
});

module.exports = router;
