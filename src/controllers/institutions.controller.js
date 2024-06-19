import Institution from "../models/institution.model.js";
import { isValidObjectId } from 'mongoose';

export const createInstitutionHandler = async (req, res, next) => {
  try {
    const newUser = await Institution.create(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export const getInstitutionsHandler = async (req, res, next) => {
  try {
    let query = {};

    // Check if there are query parameters for filtering
    if (req.query) {
      // Example: filtering by name
      if (req.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };
      }

      // Add more filters as needed based on your Institution schema
      // Example: filtering by location
      if (req.query.institutionType) {
        query.institutionType = req.query.institutionType;
      }
    }

    // Fetch institutions based on the constructed query
    const institutions = await Institution.find(query);

    res.status(200).json(institutions);
  } catch (error) {
    next(error);
  }
}


