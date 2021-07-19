const jwt = require("jsonwebtoken");
const { reduce } = require("lodash");
const config = require('config');

module.exports = (user) => {
  let token = jwt.sign(
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

  return token;
};