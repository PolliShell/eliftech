// events.js
const { Event } = require("../models/event");
const { EventRegistration } = require("../models/eventRegistration");
const { HttpError } = require("../helpers");

const getAllEvents = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;
  const sortType = req.body.sortType || "title";

  try {
    let sortParams = {};

    if (sortType === "title") {
      sortParams = { title: 1 };
    } else if (sortType === "event_date") {
      sortParams = { event_date: 1 };
    } else if (sortType === "organizer") {
      sortParams = { organizer: 1 };
    }

    const totalCount = await Event.countDocuments();
    const events = await Event.find()
        .skip(skip)
        .sort(sortParams)
        .limit(Number(pageSize));

    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({ events, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    throw HttpError(404, "Event not found");
  }

  res.json(event);
};

const getEventMembers = async (req, res) => {
  const { id } = req.params;
  const registrations = await EventRegistration.find({ event_id: id });

  if (!registrations.length) {
    throw HttpError(404, "Event not found");
  }

  const mappedMembers = registrations.map((r) => ({
    user_email: r.user_email,
    user_fullname: r.user_fullname,
  }));

  res.json(mappedMembers);
};

const createEvent = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw HttpError(401, "User not authenticated");
    }

    const { title, description, event_date } = req.body;
    const organizer_id = req.user._id;

    const newEvent = await Event.create({
      title,
      description,
      event_date,
      organizer_id,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

const updateEventById = async (req, res) => {
  const { id } = req.params;
  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedEvent) {
    throw HttpError(404, "Event not found");
  }

  res.json(updatedEvent);
};

const deleteEventById = async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await Event.findByIdAndDelete(id);

  if (!deletedEvent) {
    throw HttpError(404, "Event not found");
  }

  res.json({ message: "Event deleted successfully" });
};

const registerForEvent = async (req, res) => {
  const {
    event_id,
    user_fullname,
    user_email,
    user_birth_date,
    referral_source,
  } = req.body;

  const registration = await EventRegistration.create({
    event_id,
    user_fullname,
    user_email,
    user_birth_date,
    referral_source,
  });

  res.status(201).json(registration);
};

const findParticipantForEvent = async (req, res) => {
  const { eventId } = req.params;
  const queries = req.query;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw HttpError(404, "Event not found");
    }

    const participant = await EventRegistration.findOne({
      event_id: eventId,
      ...queries,
    });
    if (!participant) {
      res.status(404).json({ message: "Participant not found for this event" });
      return;
    }

    res.json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
  registerForEvent,
  getEventMembers,
  findParticipantForEvent,
};
