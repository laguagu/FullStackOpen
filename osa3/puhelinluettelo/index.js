const { response, json } = require("express");
const express = require("express");
const morgan = require('morgan')
const app = express();

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))


const date = new Date();
let notes = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "050-040039345",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "040-044039345",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "043-9594594954",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "045-594954838",
  },
];


app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(notes);
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${notes.length} people <br>
  ${date}</p>`);
});

app.get("/api/persons/:id",(request,response) => {
  const id = Number(request.params.id)
  const note = notes.find( note => note.id === id)  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request,response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const generateId = () => {
  randomNumber = Math.floor(Math.random() * 10000)
  // const maxId = notes.length > 0
  // ? Math.max(...notes.map(n => n.id))
  // : 0
  return randomNumber
}

const findName = (wanted) => {
  const finded = notes.find((name) => name.name.toLowerCase() === wanted.toLowerCase())
  return finded
}


app.post("/api/persons/",(request, response) => {
  const body = request.body
  const name = findName(body.name)

  // ERRORS jos nimi tai numerokenttä on tyhjä tai nimi on listassa
  if (!body.name && body.number) {
    return response.status(400).json({
      error: "Missing name or number field"
    })
  }
  if (name) {
    return response.status(400).json({
      error: "Name already exist"
    })
  }
  const note = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})