const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person')
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req, res) =>{ 
    return JSON.stringify(req.body); 
})

app.use( morgan((tokens, req, res) =>{
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
}))

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
    }
];

app.set('json spaces',2)


app.get('/api/persons',(req, res) =>{
    Person.find({}).then(persons => res.json(persons));
});

app.get('/api/persons/:id',(req, res) =>{
    Person.findById(req.params.id).then(person => res.json(person));
});

app.get('/info',(request, response) =>{
    const message = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`;
    response.send(message);
});

app.delete('/api/persons/:id',(req, res, next) =>{
    Person.findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return res.status(400).json({ 
             error: 'number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => res.json(savedPerson))
})
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

