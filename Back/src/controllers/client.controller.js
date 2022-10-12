const Client = require('../models/client.model')

module.exports.getAllClients = async (request, response) => {
    try {
        const clients = await Client.find({});
        response.json(clients)
    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports.getClientByID = async (request, response) => {
    try {
        const client = await Client.findById(request.params.id);

        client
            ? response.json(client)
            : response.status(404).end()
    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports.createClient = async (request, response) => {
    try {
        const { fullName, dob, email, phone } = request.body
        console.log(request.body)

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
    } catch (error) {
        response.status(400).send(error);
    }

}

module.exports.updateClientByID = async (request, response) => {
    try {
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
    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports.deleteClientByID = async (request, response) => {
    try {
        const target = request.params.id
        const clientToDelete = await Client.findById(target)

        if (clientToDelete) {
            await Client.findByIdAndDelete(target)
            response.status(204).send(`Client deleted : ${clientToDelete.fullName}`);
        } else {
            response.status(400).end()
        }
    } catch (error) {
        response.status(400).send(error);
    }
}