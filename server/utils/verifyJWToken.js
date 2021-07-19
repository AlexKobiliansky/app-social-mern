const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.get('JWT_SECRET') || "", (err, decodedData) => {
      if (err || !decodedData) {
        return reject(err);
      }

      resolve(decodedData);
    });
  });

