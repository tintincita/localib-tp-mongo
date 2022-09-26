const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  prixTotal: {
    type: Number,
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
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
