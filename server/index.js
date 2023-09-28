const express = require("express");
require("./Database/connection");
const cors = require("cors");
const noteRoutes = require("./Routes/notesRoute");

const PORT = process.env.PORT || 5050;

const app = express();

app.use(
  cors({
    origin: ["https://memosphere-frontend.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", noteRoutes);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
