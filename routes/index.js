const express = require('express')
const router = express.Router()
const mw = require('../middlewares/auth');

const login = require('../models/login');

router.get('/', mw.isAuth, (req, res)=>{
    res.render('index');
});

router.get('/login', mw.hasSession, (req, res)=>{
    res.render('login');
});

router.post('/post', mw.isAuthAPI, (req, res)=>{
    login.siginIn(req.body).then(data=>{
        req.session.user = data;
        res.status(200).json({
            message: 'Success'
        });
    }).catch(error=>{
        res.status(400).json({
            message: 'BAD REQUEST',
            error: error
        });
    });
});

router.get('/logout', (req, res)=>{
    if(req.session.user) delete req.session.user;
    res.redirect('/login');
});

router.get('/signup', mw.hasSession, (req, res)=>{
    res.render('signup');
});

module.exports = router;
