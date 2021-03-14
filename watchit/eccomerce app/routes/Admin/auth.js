const express = require('express');


const { handleErrors } = require('./middleware');
const usersRepo = require('../../repository/users');
const signUpTemplate = require('../../Views/Admin/Auth/signup');
const signInTemplate = require('../../Views/Admin/Auth/sign');
const { requireEmail, requirePassword, requirePasswordConfirmation, requiredEmailExists, requiredValidPasswordForUser } = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signUpTemplate({ req }));
});

router.post('/signup', [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signUpTemplate),

    async(req, res) => {
        const { email, password } = req.body;

        const user = await usersRepo.create({ email, password });

        req.session.userId = user.id;

        res.redirect('/admin/product')
    });

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
});

router.get('/signin', (req, res) => {
    res.send(signInTemplate({}));
});

router.post('/signin', [requiredEmailExists, requiredValidPasswordForUser],
    handleErrors(signInTemplate),
    async(req, res) => {
        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email });
        req.session.userId = user.id;

        res.redirect('/admin/product');
    }

);

module.exports = router;