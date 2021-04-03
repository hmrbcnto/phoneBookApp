const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(requestLogger)

morgan.token('content', (req, resp) => {
    return req.headers['resp.body']
})
app.use(morgan('tiny :content'))

let persons = [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 0
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 1
    },
    {
      "name": "Mary Poppendick",
      "number": "39-23-6423122",
      "id": 2
    }
  ]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const arrLength = persons.length
    const currDate = new Date()
    response.send(`
        <p> Phonebook has info on ${arrLength} people </p>
        <br>
        <p> ${currDate} </p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    //Random ID
    const currentId = Math.floor(Math.random()*1000000)
    //Take the request's body since that's the json note's content
    const reqBody = request.body

    if(!reqBody.name || !reqBody.number){
        return response.status(400).json({
            error: "name or number is missing"
        })
    }
    else if(persons.filter(p => p.name === reqBody.name).length){
        return response.status(400).json({
            error: "person is already in phonebook"
        })
    }

    const person = {
        "name": reqBody.name,
        "number": reqBody.number,
        "id": currentId
    }

    persons = persons.concat(person)
    response.json(person)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})