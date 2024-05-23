import Course from "../models/course.model.js";
export const createCourseHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    const newUser = await Course.create(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getCourseHandler = async (req, res, next) => {
  try {
    const courses = await Course.find(req.body.name);
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