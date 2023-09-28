const express = require("express");
require("./Database/connection");
const cors = require("cors");
const noteRoutes = require("./Routes/notesRoute");

const PORT = process.env.PORT || 5050;

const app = express();

app.use(
  cors({
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
