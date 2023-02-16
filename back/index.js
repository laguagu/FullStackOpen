const { request, response } = require('express');
const express = require('express')
const app = express()


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
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

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

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)