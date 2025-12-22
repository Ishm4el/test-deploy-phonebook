require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

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
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  console.log("body:", body);
  const newName = body.name;
  const newNumber = body.number;

  if (!newName) return res.status(400).json({ error: "Requires new name" });
  if (!newNumber) return res.status(400).json({ error: "Requires new number" });

  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (!person) return res.status(404).end();

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.write(`<h1>Phonebook has info for ${people.length} people</h1>`);
      res.write(`<h1>${new Date().toString()}</h1>`);
      res.end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.send({ error: "unknown endpoint" }).status(404);
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
