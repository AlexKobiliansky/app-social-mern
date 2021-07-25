const {check} = require("express-validator");

module.exports = [
  check('name').not().isEmpty().withMessage('The Last name is required'),
  check('email').isEmail().normalizeEmail().withMessage('incorrect email'),
  check('password').not().isEmpty().trim().escape().withMessage('Enter password')
    .isLength({min: 5}).withMessage('password must be at least 5 chars long'),
]