import Institution from "../models/institution.model.js";
import { isValidObjectId } from "mongoose";

export const createInstitutionHandler = async (req, res, next) => {
  try {
    const newUser = await Institution.create(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getInstitutionsHandler = async (req, res, next) => {
  try {
    console.log("Fetching institutions with query parameters:", req.params.institutionType);

    let query = {};

    // Check if there are query parameters for filtering
    if (req.params) {
      // Example: filtering by institutionType
      if (req.params.institutionType) {
        const institutionTypes = Array.isArray(req.params.institutionType)
          ? req.params.institutionType
          : [req.params.institutionType];
        query.institutionType = { $in: institutionTypes };
      }
    }

    console.log("Constructed query:", query);

    // Fetch institutions based on the constructed query
    const institutions = await Institution.find(query);
    console.log("Fetched institutions:", institutions);

    res.status(200).json(institutions);
  } catch (error) {
    console.error("Error fetching institutions:", error);
    next(error);
  }
};
