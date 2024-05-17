// authRouter.js
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { validateBody, upload, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../models/user");
const path = require("path");

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.get("/register", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "controllers", "register.html")
  );
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "controllers", "login.html"));
});

module.exports = router;
