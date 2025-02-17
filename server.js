const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json()); 

let notes = [];

app.get("/notes", (req, res) => res.json(notes));

app.post("/notes", (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res.json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
