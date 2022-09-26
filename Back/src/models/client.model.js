const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        dob: {
            type: Date,
        },
        email:  {
            type: String,
        },
        phone: {
            type: String,
        }
});

clientSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Client", clientSchema);
