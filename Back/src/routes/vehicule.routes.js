const vehiculeRouter = require("express").Router();
const vehiculeController = require("../controllers/vehicule.controller");

vehiculeRouter.get("/", vehiculeController.getAllVehicules);
vehiculeRouter.get("/disponibility",vehiculeController.getVehiculeByDates)
vehiculeRouter.get("/:id", vehiculeController.getVehiculeByID);
vehiculeRouter.post("/", vehiculeController.createVehicule);
vehiculeRouter.put("/:id", vehiculeController.updateVehiculeByID);
vehiculeRouter.delete("/:id", vehiculeController.deleteVehiculeByID);

module.exports = vehiculeRouter;
