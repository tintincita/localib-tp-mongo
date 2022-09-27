const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  prixTotal: {
    type: Number,
    required: true,
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

locationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Location", locationSchema);
