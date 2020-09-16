const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
	return JSON.stringify(req.body);
});

app.use( morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		tokens.body(req, res)
	].join(' ');
}));

app.set('json spaces',2);

app.get('/api/persons',(req, res, next) => {
	Person.find({})
		.then(persons => res.json(persons))
		.catch(error => error);
});

app.get('/api/persons/:id',(req, res, next) => {
	Person.findById(req.params.id)
		.then(person => res.json(person))
		.catch(error => error);
});

app.get('/info',(req, res, next) => {
	Person.countDocuments({})
		.then( count => {
			const message = `<p>Phonebook has info for ${count} people</p> <p>${new Date()}</p>`;
			res.send(message);
		}).catch(error => next(error));

});

app.delete('/api/persons/:id',(req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => res.status(204).end())
		.catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;
	if (!body.name) {
		return res.status(400).json({
			error: 'name missing'
		});
	}
	if (!body.number) {
		return res.status(400).json({
			error: 'number missing'
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save()
		.then(savedPerson => res.json(savedPerson))
		.catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;
	const person = {
		name:body.name,
		number: body.number
	};

	Person.findByIdAndUpdate(req.params.id, person, {new: true, runValidators: true, context: 'query'})
		.then(updatedPerson => {
			console.log(updatedPerson);
			res.json(updatedPerson);
		})
		.catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if(error.name === 'CastError'){
		return response.status(400).send({error: 'malformatted id'});
	}else if(error.name === 'ValidationError'){
		return response.status(400).json({error: error.message});
	}

	next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

