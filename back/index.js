require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// MongoDB
const Person = require('./models/note')

// Morgan loggaa HTTP metodin sisällön consoliin
morgan.token('nimi', function getId(req) {
    const body = JSON.stringify(req.body)
    return body
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :response-time ms :nimi'))
app.use(cors())

// Virheiden käsittely
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const date = new Date()
let notes = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '050-040039345',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '040-044039345',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '043-9594594954',
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '045-594954838',
    },
]

// ID Generointi
const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
    return maxId + 1
}

// POSTS
app.post('/api/persons/', (request, response, next) => {
    const body = request.body
    const name = notes.find(
        (nimi) => nimi.name.toLowerCase() === body.name.toLowerCase()
    )

    const note = new Person({
    // id: generateId(),
        name: body.name,
        number: body.number,
    })

    if (name) {
        return response.status(400).json({
            error: 'Name must be unique',
        })
    }

    note
        .save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
})

// GETS
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then((notes) => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((note) => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
            next(error)
        })
})
app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${notes.length} people <br>
  ${date}`)
})

// DELETES
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// UPDATE / PUT
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const note = {
        name: body.content,
        number: body.important,
    }
    Person.findByIdAndUpdate(request.params.id, note, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedNote) => {
            response.json(updatedNote)
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
