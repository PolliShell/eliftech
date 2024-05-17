// user.js
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const user = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      maxlength: 250,
    },
    token: {
      type: String,
      default: "",
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  birth_date: Joi.date().required(),
  password: Joi.string().max(250), // Заменено на password
});

// const loginSchema = Joi.object({
//     email: Joi.string().pattern(emailRegexp).required(),
//     password: Joi.string().required()
// });

module.exports = {
  User: model("User", user),
  registerSchema,
};
