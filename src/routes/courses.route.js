const { Router } = require("express");

const {
  createCourseHandler,
  getCourseHandler,
  updateCourseHandler,
  deleteCourseHandler
} = require("../controllers/courses.controller.js");

const router = Router();

router.post("/", createCourseHandler);
router.get("/", getCourseHandler);
router.put("/", updateCourseHandler);
router.delete("/", deleteCourseHandler);

module.exports = router;
