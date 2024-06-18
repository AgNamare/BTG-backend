import { Router } from "express";
import { createInstitutionHandler, getInstitutionsHandler } from "../controllers/institutions.controller.js";

const router = Router();

router.post("/", createInstitutionHandler)
router.get("/", getInstitutionHandler)

export default router