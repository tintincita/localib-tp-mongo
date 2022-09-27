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
  const { marque, model, immatriculation, disponibility, etat, prixJournee, type } = request.body;
  console.log("yoohoo");
  const newVehicule = new Vehicule({
    marque: marque,
    model: model,
    immatriculation: immatriculation,
    disponibility: disponibility,
    etat: etat,
    prixJournee: prixJournee,
    type: type,
  })
  console.log(newVehicule);

  const savedVehicule = await newVehicule.save();
  console.log(savedVehicule);
  savedVehicule
    ? response.json(savedVehicule)
    : response.status(400).end()

};

module.exports.updateVehiculeByID = async (request, response) => {
  const { marque, model, immatriculation, disponibility, etat, prixJournee, type } = request.body;

  const vehiculeNewInfo = {
    marque: marque,
    model: model,
    immatriculation: immatriculation,
    disponibility: disponibility,
    etat: etat,
    prixJournee: prixJournee,
    type: type,
  }

  const updatedVehicule = await Vehicule.findByIdAndUpdate(request.params.id, vehiculeNewInfo, { new: true })

  updatedVehicule
    ? response.json(updatedVehicule)
    : response.status(400).end()
};

module.exports.deleteVehiculeByID = async (request, response) => {
  const target = request.params.id;
  const vehiculeToDelete = await Vehicule.findById(target);
  if (vehiculeToDelete) {
    await Vehicule.findByIdAndDelete(target)
    response.status(204).send('Vehicule deleted: ${vehiculeToDelete.immatriculation}')
  } else {
    response.status(400).end()
  }
};
