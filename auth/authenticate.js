const jwt = require("jsonwebtoken");

const jwtKey =
  process.env.JWT_SECRET ||
  "You cannot overestimate the unimportance of practically everything.";

module.exports = {
  authorize
};

// custom authorization middleware for protected content
function authorize(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: "There was an error verifying the authorization token."
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "Please provide the web token via the Authorization header."
    });
  }
}
