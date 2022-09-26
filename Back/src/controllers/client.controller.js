const Client = require('../models/client.model')

module.exports.getAllClients = async (request, response) => {
    const clients = await Client.find({});
    response.json(clients)
}

module.exports.getClientByID = async (request, response) => {
    const client = await Client.findById(request.params.id);
    if (client) {
        response.json(client);
    } else {
        response.status(404).end()
    }
}
module.exports.createClient = async (request, response) => {
    const { fullName, dob, email, phone } = request.body

    const newClient = new Client({
        fullName: fullName,
        dob: dob,
        email: email,
        phone: phone
    })

    const savedCLient = await client.save();
    response.status(201).json(savedCLient);
}

module.exports.updateClientByID = (request, response) => {}
module.exports.deleteClientByID = (request, response) => {}