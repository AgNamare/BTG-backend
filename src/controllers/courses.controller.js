const Course = require("../models/course.model.js");
const { isValidObjectId } = require("mongoose");

exports.createCourseHandler = async (req, res, next) => {
  try {
    const newCourse = await Course.create(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

exports.getCourseHandler = async (req, res, next) => {
  try {
    let query = {};

    if (req.query) {
      if (req.query.name) {
        query.name = { $regex: req.query.name, $options: "i" };
      }

      if (req.query.institutionId) {
        query.institution = req.query.institutionId; // Adjust field name if needed
      }

      if (req.query.level) {
        query.level = req.query.level;
      }
    }

    if (req.query.search) {
      const searchTerms = req.query.search.split(" ");
      const searchQuery = {
        $or: [
          { name: { $in: searchTerms, $options: "i" } },
          { description: { $regex: req.query.search, $options: "i" } },
        ],
      };
      query.$and = [query.$and || {}, searchQuery];
    }

    const courses = await Course.find(query);

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

exports.updateCourseHandler = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
    });
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourseHandler = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
