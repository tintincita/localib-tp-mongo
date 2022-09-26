const locationRouter = require("express").Router();
const locationController = require("../controllers/location.controller");

locationRouter.get("/", locationController.getAllLocations);
locationRouter.get("/:id", locationController.getLocationByID);
locationRouter.post("/", locationController.createLocation);
locationRouter.put("/:id", locationController.updateLocationByID);
locationRouter.delete("/:id", locationController.deleteLocationByID);

module.exports = locationRouter;
