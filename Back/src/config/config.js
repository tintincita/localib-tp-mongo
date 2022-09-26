require("dotenv").config({ path: "./src/config/.env" });

let PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

module.exports = {
  MONGO_URI,
  PORT,
};
