// eventRegistration.js
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const eventRegistration = new Schema(
  {
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user_fullname: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    user_birth_date: {
      type: Date,
      required: true,
    },
    referral_source: {
      type: String,
      maxlength: 255,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const eventRegistrationSchemaValidator = Joi.object({
  event_id: Joi.string().required(),
  user_fullname: Joi.string().required(),
  user_email: Joi.string().pattern(emailRegexp).required(),
  user_birth_date: Joi.date().required(),
  referral_source: Joi.string().max(255).required(),
});

module.exports = {
  EventRegistration: model("EventRegistration", eventRegistration),
  eventRegistrationSchemaValidator,
};
