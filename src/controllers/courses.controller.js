import Course from "../models/course.model.js";
export const createCourseHandler = async (req, res, next) => {
  try {
    const newUser = await Course.create(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

import Course from '../models/Course'; // Assuming Course model is imported correctly
import { isValidObjectId } from 'mongoose';

export const getCourseHandler = async (req, res, next) => {
  try {
    let query = {};

    if (req.query) {
      if (req.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };
      }

      if (req.query.institutionId) {
        query.institutionId = req.query.institutionId;
      }
      
      if (req.query.level) {
        query.level = req.query.level;
      }
    }

    if (req.query.search) {
      const searchTerms = req.query.search.split(' ');
      const searchQuery = {
        $or: [
          { name: { $in: searchTerms, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
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

export const updateCourseHandler = async(req, res, next) => {
  try {
    const courses = await Course.findByIdAndUpdate(req.body.name, req.body, { new: true });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}

export const deleteCourseHandler = async(req, res, next) => {
  try {
    const courses = await Course.findByIdAndDelete(req.body.name);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}
