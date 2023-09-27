// // import Connection from "./database/db";
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const mysql = require("mysql2");
// const cors = require("cors");

// require("dotenv").config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // displaying db data in browser
// app.get("/api/get", (req, res) => {
//   const sqlGet = "SELECT * FROM crud.crud_notes";
//   db.query(sqlGet, (error, result) => {
//     if (error) {
//       console.error("Error retrieving data:", error);
//       res.status(500).send("Error retrieving data");
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post("/api/post", (req, res) => {
//   const { title, tagline, content } = req.body;
//   const sqlInsert =
//     "INSERT INTO crud_notes (title, tagline, content) VALUES (?, ?, ?)";
//   db.query(sqlInsert, [title, tagline, content], (error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send(result);
//     }
//   });
// });

// // for remove operation
// app.delete("/api/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlRemove = "DELETE FROM crud_notes where id = ?";
//   db.query(sqlRemove, id, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Error deleting note");
//     } else {
//       res.status(200).send("Note deleted successfully");
//     }
//   });
// });

// app.get("/api/get/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlGet = "SELECT * FROM crud_notes where id = ?";
//   db.query(sqlGet, id, (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });

// app.put("/api/update/:id", (req, res) => {
//   const { id } = req.params;
//   const { title, tagline, content } = req.body;
//   const sqlUpdate =
//     "UPDATE crud_notes SET title = ?, tagline = ?, content = ? WHERE id = ?";
//   db.query(sqlUpdate, [title, tagline, content, id], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });

// // Set note as pinned
// app.put("/api/pin/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlPin = "UPDATE crud_notes SET isPinned = 1 WHERE id = ?";
//   db.query(sqlPin, id, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Error pinning note");
//     } else {
//       res.status(200).send("Note pinned successfully");
//     }
//   });
// });

// // Unset note as pinned
// app.put("/api/unpin/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlUnpin = "UPDATE crud_notes SET isPinned = 0 WHERE id = ?";
//   db.query(sqlUnpin, id, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Error unpinning note");
//     } else {
//       res.status(200).send("Note unpinned successfully");
//     }
//   });
// });

// // defining route
// app.get("/", (req, res) => {});
// // Connection();

// app.listen(5050, () => {
//   console.log("Server is running on port 5050");
// });

const express = require("express");
require("./Database/connection");
const cors = require("cors");
const noteRoutes = require("./Routes/notesRoute");

const PORT = 5050;

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
