const Location = require('../models/location.model')
const Vehicule = require('../models/vehicule.model')

const daysBetweenTwoDatesInclusive = (date1, date2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return TotalDays
}

module.exports.getAllLocations = async (request, response) => {
    const locations = await Location.find({});
    response.json(locations);
}

module.exports.getLocationByID = async (request, response) => {
    const location = Location.findById(request.params.id);

    location
        ? response.json(location)
        : response.status(404).end()
}


module.exports.createLocation = async (request, response) => {
    const { startDate, endDate, vehicule, client } = request.body;

    const vehiculeToRent = await Vehicule.findById(vehicule);

    if (!vehiculeToRent) {
        console.log('Vehicule Not Found');
        response.status(400).end()
    }

    if (startDate < endDate) {
        console.log('End Date must be on or after Start Date');
        response.status(400).end()
    }

    const prixTotal = daysBetweenTwoDatesInclusive(startDate, endDate) * vehiculeToRent.prixJournee;

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
    let prixTotal = 0

    const oldLocation = await Location.findById(target)

    if (!oldLocation) {
        response.status(400).end()
    }

    if ((startDate != oldLocation.startDate) || (endDate != oldLocation.endDate)) {
        prixTotal = daysBetweenTwoDatesInclusive(startDate, endDate) * vehiculeToRent.prixJournee;
    } else {
        prixTotal = oldLocation.prixTotal
    }

    const newLocation = new Location({
        startDate: startDate,
        endDate: endDate,
        prixTotal: prixTotal,
        vehicule: vehicule,
        client: client,
    })

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
