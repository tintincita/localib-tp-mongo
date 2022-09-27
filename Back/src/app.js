const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const vehiculeRouter = require("./routes/vehicule.routes");
const clientRouter = require("./routes/client.routes");
const locationRouter = require("./routes/location.routes");

const config = require("./config/config");
const logger = require("./utils/logger");
const middleware = require("./middlewares");


const app = express();

logger.info("connecting to", config.MONGO_URI);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((err) => {
    logger.error("Error connecting to DB", err.message);
  });


app.use(cors());
app.use(express.json());

app.use("/api/vehicules", vehiculeRouter);
app.use("/api/clients", clientRouter);
app.use("/api/locations", locationRouter);

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;