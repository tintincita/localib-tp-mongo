const Location = require('../models/location.model')
const Vehicule = require('../models/vehicule.model')

const daysBetweenTwoDatesInclusive = (date1, date2) => {
    let difference = date2 - date1;
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    console.log("difference", difference);
    console.log("totalDays", totalDays);
    console.log(typeof totalDays);
    return totalDays
}

module.exports.getAllLocations = async (request, response) => {
    const locations = await Location.find({}).populate("vehicule").populate("client");
    response.json(locations);
}

module.exports.getLocationByID = async (request, response) => {
    const location = await Location.findById(request.params.id).populate("vehicule").populate("client");

    location
        ? response.json(location)
        : response.status(404).end()
}


module.exports.createLocation = async (request, response) => {
    const { startDate, endDate, vehicule, client } = request.body;
    const workingStartDate = new Date(startDate).getTime();
    const workingEndDate = new Date(endDate).getTime();

    const vehiculeToRent = await Vehicule.findById(vehicule);

    if (!vehiculeToRent) {
        console.log('Vehicule Not Found');
        response.status(400).end()
    }

    console.log("start:", startDate, "end: ", endDate);
    let dateTest = new Date(startDate).getMonth()
    console.log("startDat month", dateTest);

    if (workingStartDate > workingEndDate) {
        console.log('End Date must be on or after Start Date');
        response.status(400).end()
    }

    const prixTotal = daysBetweenTwoDatesInclusive(workingStartDate, workingEndDate) * vehiculeToRent.prixJournee;

    const newLocation = new Location({
        startDate: startDate,
        endDate: endDate,
        prixTotal: prixTotal,
        vehicule: vehicule,
        client: client,
    })

    const savedLocation = await newLocation.save();

    savedLocation
        ? response.json(savedLocation)
        : response.status(400).end()

}

module.exports.updateLocationByID = async (request, response) => {
    const target = request.params.id
    const { startDate, endDate, vehicule, client } = request.body;
    let prixTotal = 0;

    const oldLocation = await Location.findById(target)
    if (!oldLocation) {
        response.status(400).end()
    }

    const vehiculeID = oldLocation.vehicule.toString();
    if (vehicule && vehiculeID != vehicule) {
        vehiculeID = vehicule
    }

    const vehiculeToRent = await Vehicule.findById(vehiculeID)
    console.log(typeof vehiculeToRent.prixJournee);

    if ((startDate != oldLocation.startDate) || (endDate != oldLocation.endDate) || (vehiculeID != vehicule)) {

        prixTotal = daysBetweenTwoDatesInclusive(startDate, endDate) * vehiculeToRent.prixJournee;
    } else {
        prixTotal = oldLocation.prixTotal;
    }

    const newLocation = {
        startDate: startDate,
        endDate: endDate,
        prixTotal: prixTotal,
        vehicule: vehicule,
        client: client,
    }

    const updatedLocation = await Location.findByIdAndUpdate(target, newLocation, { new: true })

    updatedLocation
        ? response.json(updatedLocation)
        : response.status(400).end()
}

module.exports.deleteLocationByID = async (request, response) => {
    const target = request.params.id
    const locationToDelete = await Location.findById(target)

    // check if vehicle disponibility affected and update

    if (locationToDelete) {
        await Location.findByIdAndDelete(target)
        response.status(204).send(`Location deleted : ${target}`);
    } else {
        response.status(400).end()
    }
}
