const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'}
];

app.get('/', (req, res) => {
    res.send('Hello NodeJs');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        res.status(404).send({
            error: 'The course with given ID was not found'
        });
    }

    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.post('/api/courses', (req, res) => {
    // Handle validate input
    const {error} = validateCourse(req.body); // What is error ? Must be dump result validator

    if (error) {
        res.status(400).send({
            error: error.details[0].message
        });
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Lookup the course. If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        res.status(404).send({
            error: 'The course with given ID was not found'
        });
    }

    const {error} = validateCourse(req.body);

    if (error) {
        res.status(400).send({
            error: error.details[0].message
        });
    }

    // Update course
    course.name = req.body.name;
    // Return course
    res.send(course);
});

/**
 * Handle validate input
 *
 * @param course
 * @returns {ValidationResult<*>}
 */
function validateCourse(course) {
    const rules = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, rules);
}

app.listen(port, () => console.log(`Listening on port ${port}`));