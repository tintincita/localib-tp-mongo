const Client = require('../models/client.model')

module.exports.getAllClients = async (request, response) => {
    const clients = await Client.find({});
    response.json(clients)
}

module.exports.getClientByID = async (request, response) => {
    const client = await Client.findById(request.params.id);

    client
        ? response.json(client)
        : response.status(404).end()
}

module.exports.createClient = async (request, response) => {
    const { fullName, dob, email, phone } = request.body

    const newClient = new Client({
        fullName: fullName,
        dob: dob,
        email: email,
        phone: phone
    })

    const savedClient = await newClient.save();

    savedClient
        ? response.json(savedClient)
        : response.status(400).end()

}

module.exports.updateClientByID = async (request, response) => {
    const body = request.body;

    const client = {
        fullName: body.fullName,
        dob: body.dob,
        email: body.email,
        phone: body.phone,
    }

    const updatedClient = await Client.findByIdAndUpdate(request.params.id, client, { new: true })
    updatedClient
        ? response.json(updatedClient)
        : response.status(400).end()
}

module.exports.deleteClientByID = async (request, response) => {
    const target = request.params.id
    const clientToDelete = await Client.findById(target)

    if (clientToDelete) {
        await Client.findByIdAndDelete(target)
        response.status(204).send(`Client deleted : ${clientToDelete.fullName}`);
    } else {
        response.status(400).end()
    }
}