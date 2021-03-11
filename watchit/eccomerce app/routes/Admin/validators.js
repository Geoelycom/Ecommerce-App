const { check } = require('express-validator');
const usersRepo = require('../../repository/users');

module.exports = {

    requireTitle: check('title')
        .trim()
        .isLength({ min: 4, max: 30 })
        .withMessage('Must be between 5 and 40 characters long'),

    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage('must be a number greater than one'),

    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('must be a Valid email')
        .custom(async email => {
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) {
                throw new Error('email already in use')
            }

        }),

    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters'),

    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error('passwords must match ')
            }
        }),
    requiredEmailExists: check('email')
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
    requiredValidPasswordForUser: check('password')
        .trim()
        .custom(async(password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error('Invalid email')
            }

            const validPassword = await usersRepo.comparePasswords(
                user.password,
                password
            );
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        })


}