const Location = require('../models/location.model')
const Vehicule = require('../models/vehicule.model')


module.exports.getAllLocations = async (request, response) => {
    try {
        const locations = await Location.find({}).populate("vehicule").populate("client");
        response.json(locations);
    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports.getLocationByID = async (request, response) => {
    try {
        const location = await Location.findById(request.params.id).populate("vehicule").populate("client");

        location
            ? response.json(location)
            : response.status(404).end()
    } catch (error) {
        response.status(400).send(error);
    }
}


module.exports.createLocation = async (request, response) => {
    try {
        const { startDate, endDate, vehicule, client } = request.body;

        const vehiculeToRent = await Vehicule.findById(vehicule)

        const prixTotal = checkDatesAndReturnPrixTotal(startDate, endDate, vehiculeToRent)

        const newLocation = new Location({
            startDate: startDate,
            endDate: endDate,
            prixTotal: prixTotal,
            vehicule: vehicule,
            client: client,
        })
        const savedLocation = await newLocation.save();

        await addLocationToVehicule(savedLocation.id, vehiculeToRent)

        response.json(savedLocation)

    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports.updateLocationByID = async (request, response) => {
    try {
        const target = request.params.id
        const { startDate, endDate, vehicule, client } = request.body;

        const oldLocation = await Location.findById(target)
        const vehiculeID = oldLocation.vehicule.toString();

        const datesChanged = ((startDate && (startDate != oldLocation.startDate)) || (endDate && (endDate != oldLocation.endDate)))
        const vehiculeChanged = (vehicule && (vehiculeID != vehicule))

        console.log("datesChanged", datesChanged);
        console.log("vehiculeChanged", vehiculeChanged);

        if (vehiculeChanged) {
            await removeLocationFromVehicule(vehiculeID, target);
            await addLocationToVehicule(target, vehicule)
            vehiculeID = vehicule;
        }

        const vehiculeToRent = await Vehicule.findById(vehicule)
        const prixTotal = 0
        if (datesChanged || vehiculeChanged) {
            startDate = (startDate | oldLocation.startDate);
            endDate = (endDate | oldLocation.endDate);
            prixTotal = checkDatesAndReturnPrixTotal(startDate, endDate, vehiculeToRent)
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
        response.json(updatedLocation)

    } catch (error) {
        response.status(400).send(error);
    }
}


module.exports.deleteLocationByID = async (request, response) => {
    try {
        const target = request.params.id
        const locationToDelete = await Location.findById(target)

        // check if vehicle disponibility affected and update

        if (locationToDelete) {
            await Location.findByIdAndDelete(target)
            response.status(204).send(`Location deleted : ${target}`);
        } else {
            response.status(400).end()
        }
    } catch (error) {
        response.status(400).send(error);
    }
}

// helper functions below

const daysBetweenTwoDatesInclusive = (date1, date2) => {
    let difference = date2 - date1;
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return totalDays
}

const checkDatesAndReturnPrixTotal = (startDate, endDate, vehiculeToRent) => {
    const workingStartDate = new Date(startDate).getTime();
    const workingEndDate = new Date(endDate).getTime();

    if (workingStartDate > workingEndDate) {
        throw "End date must be on or after start date"
    } else {
        return daysBetweenTwoDatesInclusive(workingStartDate, workingEndDate) * vehiculeToRent.prixJournee;
    }
}

const addLocationToVehicule = (locationID, vehiculeID) => {
    try {
        return Vehicule.findByIdAndUpdate(vehiculeID, { $addToSet: { locations: locationID } })
    } catch (error) {
        response.status(400).send(error);
    }
}


const removeLocationFromVehicule = (locationID, vehiculeID) => {
    try {
        return Vehicule.findByIdAndUpdate(vehiculeID, { $pull: { locations: locationID } })
    } catch (error) {
        response.status(400).send(error);
    }
}
