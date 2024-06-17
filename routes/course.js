const express = require('express');
const courseRouter = express.Router();
const Course = require('../models/course_models');

// Endpoint to create a new course
courseRouter.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = courseRouter;
