const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://user:1234@cluster0.jedknjn.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });
