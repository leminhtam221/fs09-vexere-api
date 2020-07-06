const express = require("express");
const router = express.Router();
const tripController = require("./trip.controller");

router.use(express.json());
router.get("/", tripController.getTrip);
router.get("/:id", tripController.getTripById);
router.post("/", tripController.postTrip);
router.delete("/:id", tripController.deleteTrip);
router.patch("/:id", tripController.patchTrip);
router.put("/:id", tripController.putTrip);

module.exports = router;
