const mongoose = require('mongoose');

const vehiculeSchema = mongoose.Schema(
    {
        marque: {
            type: String,
        },
        model: {
            type: String,
        },
        immatriculation: {
            type: String,
        },
        etat: {
            type: String
            // A, B, C, D
        },
        disponibility: {
            type: String,
        },
        prixJournee: {
            type: Number,
        },
        type: {
            type: String,
            // Voiture, Camion, Utilitaire, Moto
        }
    }
)

vehiculeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
  
  module.exports = mongoose.model("Vehicule", vehiculeSchema);
  