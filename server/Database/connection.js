const mongoose = require("mongoose");

require("dotenv").config();

const mongoURI =
  "mongodb+srv://user:1234@cluster0.jedknjn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });
