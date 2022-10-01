const Vehicule = require("../models/vehicule.model");
const Location = require('../models/location.model')

module.exports.getAllVehicules = async (request, response) => {
  const vehicules = await Vehicule.find({}).populate("locations");
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

module.exports.getVehiculesByDates = async (request, response) => {
  try {
    let locStartDate = request.query.startDate
    let locEndDate = request.query.endDate
    let locType = request.query.type

    // get list of vehicules that ARE rented out in period
    let query = { startDate: { $lte: locEndDate }, endDate: { $gte: locStartDate } }
    const locations = await Location.find(query)

    let vehiculesLouees = locations.map(location => location.vehicule)

    // get list of vehicules of vehicules NOT in previous list
    docs = await (await Vehicule.find().where('_id').nin(vehiculesLouees).where(type)).includes(locType).exec()

    response.json(docs)
  } catch (err) {
    console.log(err)
  }
};

module.exports.createVehicule = async (request, response) => {
  const {
    marque,
    model,
    immatriculation,
    disponibility,
    etat,
    prixJournee,
    type,
  } = request.body;

  const newVehicule = new Vehicule({
    marque: marque,
    model: model,
    immatriculation: immatriculation,
    disponibility: disponibility,
    etat: etat,
    prixJournee: prixJournee,
    type: type,
  });

  const savedVehicule = await newVehicule.save();
  savedVehicule ? response.json(savedVehicule) : response.status(400).end();
};

module.exports.updateVehiculeByID = async (request, response) => {
  const {
    marque,
    model,
    immatriculation,
    disponibility,
    etat,
    prixJournee,
    type,
  } = request.body;

  const vehiculeNewInfo = {
    marque: marque,
    model: model,
    immatriculation: immatriculation,
    disponibility: disponibility,
    etat: etat,
    prixJournee: prixJournee,
    type: type,
  };

  const updatedVehicule = await Vehicule.findByIdAndUpdate(
    request.params.id,
    vehiculeNewInfo,
    { new: true }
  );

  updatedVehicule ? response.json(updatedVehicule) : response.status(400).end();
};

module.exports.deleteVehiculeByID = async (request, response) => {
  const target = request.params.id;
  const vehiculeToDelete = await Vehicule.findById(target);
  if (vehiculeToDelete) {
    await Vehicule.findByIdAndDelete(target);
    response
      .status(204)
      .send("Vehicule deleted: ${vehiculeToDelete.immatriculation}");
  } else {
    response.status(400).end();
  }
};
