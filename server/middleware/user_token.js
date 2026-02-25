const jwt  = require("jsonwebtoken");

const verify_user_token = (req, res, next) => {

  const token = req.cookies.user_jwt_token;

  if (!token) {
      req.user = null;   // Allow guest
      res.locals.user= null;
      return next();     // Continue to home
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          req.user = null;   // Invalid token = treat as guest
          res.locals.user = null;
      } else {
          req.user = decoded;
          res.locals.user = decoded;
      }
      next();
  });
};

module.exports = verify_user_token;
