const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videos: [VideoSchema],
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  sections: [SectionSchema],
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
