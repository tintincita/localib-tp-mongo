const Vehicule = require("../models/vehicule.model");

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

module.exports.getVehiculeByDates = async (request, response) => {

  queryEndDate = request.params.endDate+"00:00:00.000Z";
  queryStartDate = request.params.startDate+"00:00:00.000Z";
  console.log(queryEndDate);
  console.log(queryStartDate);

  Vehicule.find({ locations: [] }, function(err,docs){
    console.log("veh with no loc", docs);
    return docs
  });
  // Vehicule.find(
  //   { "locations.prixTotal": "3600" },
  //   function (err, docs) {
  //     console.log("there");
  //     console.log("otherdocs", docs);
  //     console.log("err",err);
  //   }
  // );
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
