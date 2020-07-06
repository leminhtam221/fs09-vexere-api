const express = require("express");
const router = express.Router();
const tripController = require("./ticket.controller");
const {authenticate, authorize} = require("../../../../middlewares/auth");

router.use(express.json());
router.post("", authenticate, authorize(["client"]), tripController.createTicket);

module.exports = router;
