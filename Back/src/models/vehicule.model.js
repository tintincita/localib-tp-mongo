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
    dipoUnitl : {
        type: Date,
    },
    prixJournee: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Voiture', 'Camion', 'Utilitaire', 'Moto'],
        required: true,
    },
    locations :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    }
    ]
})

vehiculeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Vehicule", vehiculeSchema);
