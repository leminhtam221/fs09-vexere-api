const express = require("express");
const router = express.Router();
const stationController = require("./station.controller");
const {authenticate, authorize} = require("../../../../middlewares/auth");

router.use(express.json());
router.get("/:id", authenticate, stationController.getStationsById);
router.get("", authenticate, stationController.getStations);
router.post("", authenticate, authorize(["admin"]), stationController.postStation);
router.put("/:id", authenticate, stationController.putStation);
router.delete("/:id", authenticate, stationController.deleteStationById);
router.patch("/:id", authenticate, stationController.patchStationById);

module.exports = router;
