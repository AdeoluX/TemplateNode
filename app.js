require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { authRoute, userRoute} = require("./src/routes");
const { errorConverter, errorHandler } = require("./src/middleware/error");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

//module.exports.handler = serverless(app);
