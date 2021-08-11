const jwt = require("jsonwebtoken");
const config = require('config');
const {reduce} = require("lodash");

module.exports = (user) => {
  return jwt.sign(
    {
      data: reduce(
        user,
        (result, value, key) => {
          if (key !== "password") {
            result[key] = value;
          }
          return result;
        },
        {}
      )
    },
    config.get('JWT_SECRET') || "",
    {
      expiresIn: config.get('JWT_MAX_AGE'),
      algorithm: "HS256"
    }
  );
};