const clientRouter = require("express").Router();
const clientController = require("../controllers/client.controller");

clientRouter.get("/", clientController.getAllClients);
clientRouter.get("/:id", clientController.getClientByID);
clientRouter.post("/", clientController.createClient);
clientRouter.put("/:id", clientController.updateClientByID);
clientRouter.delete("/:id", clientController.deleteClientByID);

module.exports = clientRouter;
