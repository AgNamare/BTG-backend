import { Router } from "express";
import { createInstitutionHandler, deleteInstitutionHandler, getInstitutionsHandler, searchInstitutions, updateInstitutionHandler } from "../controllers/institutions.controller.js";

const router = Router();

router.post("/", createInstitutionHandler);
router.get("/", getInstitutionsHandler);
router.get("/search", searchInstitutions)
router.put("/:institutionId", updateInstitutionHandler)
router.delete("/:institutionId", deleteInstitutionHandler)

export default router;
