const { Router } = require("express");
const { 
  createInstitutionHandler, 
  deleteInstitutionHandler, 
  getInstitutionsHandler, 
  searchInstitutions, 
  updateInstitutionHandler 
} = require("../controllers/institutions.controller.js");

const router = Router();

router.post("/", createInstitutionHandler);
router.get("/", getInstitutionsHandler);
router.get("/search", searchInstitutions);
router.put("/:institutionId", updateInstitutionHandler);
router.delete("/:institutionId", deleteInstitutionHandler);

module.exports = router;
