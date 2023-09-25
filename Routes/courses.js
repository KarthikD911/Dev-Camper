const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require("../Controllers/courses");

const Course = require('../Models/Course');
const advancedResults = require('../Middleware/advancedResults');

// mergeParams:true to merge 2 url params
const router = express.Router({mergeParams : true});

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;