const {check} = require("express-validator");

module.exports = [
  check('website').optional({ checkFalsy: true }).isURL().withMessage('Incorrect Url'),
]