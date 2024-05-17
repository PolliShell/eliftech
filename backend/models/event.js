const { Schema, model } = require("mongoose");
const Joi = require("joi");

const event = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    event_date: {
      type: Date,
      required: true,
    },
    organizer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const eventSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  event_date: Joi.date().required(),
  organizer_id: Joi.string().required(),
});

module.exports = {
  Event: model("Event", event),
  eventSchemaValidator,
};
