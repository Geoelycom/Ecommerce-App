const { check } = require('express-validator');
const usersRepo = require('../../repository/users');

module.exports = {

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
        })

}