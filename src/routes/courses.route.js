import { Router } from "express";

import {
  createCourseHandler,
  getCourseHandler,
  updateCourseHandler,
  deleteCourseHandler
} from "../controllers/courses.controller.js";

const router = Router();

router.post("/", createCourseHandler);
router.get("/", getCourseHandler);
router.put("/", updateCourseHandler);
router.delete("/", deleteCourseHandler);

export default router;
