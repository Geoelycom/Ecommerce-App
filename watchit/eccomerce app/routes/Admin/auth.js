const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repository/users');
const signUpTemplate = require('../../Views/Admin/Auth/signup');
const signInTemplate = require('../../Views/Admin/Auth/sign');
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signUpTemplate({ req }));
});

router.post('/signup', [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],


    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(signUpTemplate({ req, errors }));
        }


        const { email, password, passwordConfirmation } = req.body;

        const user = await usersRepo.create({ email, password });

        req.session.userId = user.id;

        res.send('account created!!!!')

    });

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
});

router.get('/signin', (req, res) => {
    res.send(signInTemplate());
});

router.post('/signin', [
        check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a Valid Email')
        .custom(async(email) => {
            const user = usersRepo.getOneBy({ email })
            if (!user) {
                throw new Error('Email not found!')
            }
        }),
        check('password').trim()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        console.log(errors)


        const { email, password } = req.body;

        const user = await usersRepo.getOneBy({ email });
        if (!user) {
            return res.send('Email not found');
        }
        const validPassword = await usersRepo.comparePasswords(
            user.password,
            password
        );

        if (!validPassword) {
            return res.send('Invalid password')
        }
        req.session.userId = user.id;
        res.send('You are signed in!!!')
    });

module.exports = router;