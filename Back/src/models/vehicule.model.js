const mongoose = require('mongoose');

const vehiculeSchema = mongoose.Schema({
    marque: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    immatriculation: {
        type: String,
        required: true,
    },
    etat: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true,
    },
    disponibility: {
        type: Boolean,
        required: true,
    },
    prixJournee: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Voiture', 'Camion', 'Utilitaire', 'Moto'],
        required: true,
    }
})

vehiculeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Vehicule", vehiculeSchema);
