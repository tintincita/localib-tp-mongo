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

module.exports.createVehicule = async (request, response) => {
  const {marque, model, immatriculation, disponibility, etat, prixJournee, type} = request.body;

  const newVehicle = new Vehicle ({
    marque: marque,
    model: model,
    immatriculation: immatriculation,
    disponibility: disponibility,
    etat: etat,
    prixJournee: prixJournee,
    type: type,
  })

  const savedVehicle = newVehicle.save();

  savedVehicle
  ? response.json(savedVehicle)
  : response.status(400).end()
  
};

module.exports.updateVehiculeByID = async (request, response) => {
  const {marque, model, immatriculation, disponibility, etat, prixJournee, type} = request.body;
  
  const vehicleNewInfo = new Vehicle ({
    marque: marque,
    model: model,
    immatriculation: immatriculation,
    disponibility: disponibility,
    etat: etat,
    prixJournee: prixJournee,
    type: type,
  })
  
  const updatedVehicle = await Vehicule.findByIdAndUpdate(request.params.id, vehicleNewInfo, {new:true})
  
  updatedVehicle
  ? response.json(updatedVehicle)
  : response.status(400).end()
};

module.exports.deleteVehiculeByID = async (request, response) => {
  const target= request.params.id;
  const vehiculeToDelete = await Vehicle.findById(target);
  if (vehicleToDelete){
    await Vehicule.findByIdAndDelete(target)
    response.status(204).send('Vehicule deleted: ${vehiculeToDelete.immatriculation}')
  } else {
    response.status(400).end()
  }
};
