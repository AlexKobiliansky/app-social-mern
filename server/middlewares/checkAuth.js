const verifyJWToken = require('../utils/verifyJWToken');

module.exports = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ message: "No token found" });
  }

  verifyJWToken(token)
    .then((user) => {
      req.user = user.data._doc;
      // console.log('checkAuth', req.user);
      next();
    })
    .catch(() => {
      console.error("Invalid auth token provided.");
      res.status(403).json({ message: "Invalid auth token provided." });
    });
}