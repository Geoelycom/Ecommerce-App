const express = require('express');
const { check, validationResult } = require('express-validator');
const usersRepo = require('../../repository/users');
const signUpTemplate = require('../../Views/Admin/Auth/signup');
const signInTemplate = require('../../Views/Admin/Auth/sign');


const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signUpTemplate({ req }));
});

router.post('/signup', [
        check('email').trim().normalizeEmail().isEmail().withMessage('must be a Valid email').custom(async email => {
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) {
                throw new Error('email already in use')
            }

        }),
        check('password').trim().isLength({ min: 4, max: 20 }).isStrongPassword({ min: 8, minNumbers: 1, minUppercase: 1 }),
        check('passwordConfirmation').trim().isLength({ min: 4, max: 20 }).isStrongPassword({ min: 8, minNumbers: 1, minUppercase: 1 })

    ],
    async(req, res) => {
        const errors = validationResult(req);
        console.log(errors)


        const { email, password, passwordConfirmation } = req.body;

        if (password !== passwordConfirmation) {
            return res.send('passwords must match')
        }

        //Create a user in our repo to represent this person
        const user = await usersRepo.create({ email, password });

        // store the id of that useer inside the user cookie
        req.session.userId = user.id;

        res.send('account created')

    });

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
});

router.get('/signin', (req, res) => {
    res.send(signInTemplate());
});

router.post('/signin', async(req, res) => {
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