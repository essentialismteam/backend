const jwt = require("jsonwebtoken");

const jwtKey =
  process.env.JWT_SECRET ||
  "You cannot overestimate the unimportance of practically everything.";

module.exports = {
  authenticate
};

// custom authentication middleware for protected content

function authenticate(req, res, next) {

  const token = req.get("Authorization");

  if (token) {

    jwt.verify(token, jwtKey, (err, decoded) => {

      if (err)

        return res
          .status(401)
          .json({
            error: "There was an error verifying the authorization token."
          });

      req.decoded = decoded;

      next();

    });
    
  } else {

    return res
      .status(401)
      .json({
        error: "Please provide the web token via the Authorization header."
      });

  }
}
