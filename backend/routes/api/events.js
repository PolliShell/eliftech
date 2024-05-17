// eventsRouter.js
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/events");
const { authenticate } = require("../../middlewares");
const { findParticipantForEvent } = require("../../controllers/events");

// GET
router.get("/:id", ctrl.getEventById);
router.get("/:id/members", ctrl.getEventMembers);
router.post("/:eventId/participant", findParticipantForEvent);
// POST
router.post("/", ctrl.getAllEvents);
router.post("/create", authenticate, ctrl.createEvent);
router.post("/:id/register", ctrl.registerForEvent);
// PATCH
router.patch("/:id", ctrl.updateEventById);
// DELETE
router.delete("/:id", ctrl.deleteEventById);

module.exports = router;
