const express = require('express')
const router = express.Router()
const mw = require('../middlewares/auth');

const login = require('../models/login');
const signup = require('../models/signup');

const { PowerSchema } = require('../helper/SchemaChecker');
const schemas = require('./schemas');

router.get('/',
function(req, res, next){
    req.session.user = {
        id: 1,
        name: 'Saito',
        email: 'saito@email.com',
        password: '1a1dc91c907325c69271ddf0c944bc72',
        profile: null,
        date_created: '2019-04-19T05:19:53.000Z'
    };
    next();
},
mw.isAuth, (req, res)=>{
    res.render('index');
});

router.use('/api/upload', require('./upload'));
router.use('/github', require('./github-webook'));

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
