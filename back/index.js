const { request, response } = require('express');
const express = require('express')
const morgan = require('morgan')


// Morgan loggaa post metodin sisällön consoliin
morgan.token('nimi', function getId (req, res) {
  const body = JSON.stringify(req.body)
  return body
})

const app = express()


app.use(morgan(':method :url :response-time ms :nimi'))
app.use(express.json())


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

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
    // POSTS
  app.post("/api/persons/",(request, response) => {
    const body = request.body
    const name = notes.find(nimi => nimi.name.toLowerCase() === body.name.toLowerCase())

    console.log(name)
  
    // ERRORS jos nimi tai numerokenttä on tyhjä tai nimi on listassa tai nimi ei ole uniikki
    if (!body.name && body.number) {
      return response.status(400).json({
        error: "Missing name or number field"
      })
    }
    if (name) {
      return response.status(400).json({
        error:"Name must be unique"
      })
    }

    const note = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
    response.json(note)
  })

    // GETS
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(notes)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

  app.get("/info", (request,response) => {
    response.send(`Phonebook has info for ${notes.length} people <br>
    ${date}`)
  })

    // DELETES
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)