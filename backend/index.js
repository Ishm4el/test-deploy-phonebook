const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");

const app = express();

const personsData = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: "5",
    name: "Milo Cutie",
    number: "01-01-0000",
  },
];

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

// app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(express.static("dist"));

morgan.token("postBody", function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postBody"
  )
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(personsData);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  if (typeof id !== "string") res.status(400).end();
  else {
    const found = personsData.filter((e) => e.id === id);
    if (!found) res.status(404).end();
    else {
      res.json(found);
    }
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).end();

  const indexToRremove = personsData.findIndex((e) => e.id === id);
  if (indexToRremove === -1) return res.status(404).end();

  const deletedPerson = personsData.splice(indexToRremove, 1)[0];
  res.status(200).send({ deleted: deletedPerson });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log("body:", body);

  if (!body.name || !body.number) return res.status(400).end();

  const doesNameExist = personsData.find((person) => person.name === body.name);
  if (doesNameExist) {
    res.statusMessage = "Name is already in used! Please use another.";
    return res.status(204).end();
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 10000)),
    name: body.name,
    number: body.number,
  };

  personsData.push(newPerson);

  return res.status(201).json({ ...newPerson });
});

app.get("/info", (req, res) => {
  res.write(`<h1>Phonebook has info for ${personsData.length} people</h1>`);
  res.write(`<h1>${new Date().toString()}</h1>`);
  res.end();
});

const unknownEndpoint = (req, res) => {
  res.send({ error: "unknown endpoint" }).status(404);
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
