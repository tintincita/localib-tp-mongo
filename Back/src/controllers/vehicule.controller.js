const Vehicule = require("../models/vehicule.model");

module.exports.getAllVehicules = async (request, response) => {
  const vehicules = await Vehicule.find({});
  response.json(vehicules);
};

module.exports.getVehiculeByID = async (request, response) => {
  const vehicule = await Vehicule.findById(request.params.id);
  if (vehicule) {
    response.json(vehicule);
  } else {
    response.status(404).end();
  }
};

module.exports.createVehicule = async (request, response) => {};
module.exports.updateVehiculeByID = async (request, response) => {};
module.exports.deleteVehiculeByID = async (request, response) => {};
