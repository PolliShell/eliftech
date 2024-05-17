// const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

// const {HttpError} = require("../helpers");

// const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
  try {
    // const { authorization = "" } = req.headers;
    // const [bearer, token] = authorization.split(" ");
    // if (bearer !== "Bearer") {
    //     throw HttpError(401, "Invalid authorization format");
    // }
    // const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ email: "polliandfibi@gmail.com" });
    // if (!user || !user.token || user.token !== token) {
    //     throw HttpError(401, "Invalid token");
    // }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
