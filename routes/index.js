const express = require('express')
const router = express.Router()
const mw = require('../middlewares/auth');

const login = require('../models/login');
const signup = require('../models/signup');

const { PowerSchema } = require('../helper/SchemaChecker');
const schemas = require('./schemas');

router.get('/', mw.isAuth, (req, res)=>{
    res.render('index');
});

router.use('/api/upload', require('./upload'));
router.use('/api/github', require('./github-webook'));

router.get('/login', mw.hasSession, (req, res)=>{
    res.render('login');
});

router.post('/login', mw.isAfterAuthAPI, PowerSchema().setSchema(schemas.LOGIN).scan, (req, res)=>{
    login.siginIn(req.body).then(data=>{
        console.log('[LOGIN] - Success', data);
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

router.post('/signup', mw.isAfterAuthAPI, PowerSchema().setSchema(schemas.SIGNUP).scan, (req, res)=>{
    signup.account(req.body).then(data=>{
        res.status(200).json({
            message: 'Success'
        });
    }).catch(error=>{
        res.status(400).json({
            message: 'BAD REQUEST',
            error: error
        });
    })
});

module.exports = router;
