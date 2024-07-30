const Institution = require("../models/institution.model.js");
const { calculateDistance } = require("../utils/DistanceCalculator.js");

exports.createInstitutionHandler = async (req, res, next) => {
  try {
    const newInstitution = await Institution.create(req.body);
    await newInstitution.save();
    res.status(201).json(newInstitution);
  } catch (error) {
    next(error);
  }
};

// Example controller method for searching institutions
exports.searchInstitutions = async (req, res) => {
  console.log(
    "searchInstitutions: Start searching with query params",
    req.query
  );
  const { courseName, userLat, userLng } = req.query;

  try {
    console.log(
      `searchInstitutions: Fetching institutions for course: ${courseName}`
    );
    const institutions = await Institution.find({ courses: courseName });
    console.log(
      `searchInstitutions: Found ${institutions.length} institutions`
    );

    // Calculate distances and filter based on user's location
    const institutionsWithDistance = institutions.map((institution) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        institution.latitude,
        institution.longitude
      );
      console.log(
        `searchInstitutions: Calculated distance for institution ${institution._id}: ${distance}`
      );
      return {
        ...institution.toObject(),
        distance,
      };
    });

    // Sort institutions by distance
    institutionsWithDistance.sort((a, b) => a.distance - b.distance);
    console.log("searchInstitutions: Sorted institutions by distance");

    res.json({ institutions: institutionsWithDistance });
  } catch (error) {
    console.error("Error searching institutions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getInstitutionsHandler = async (req, res, next) => {
  try {
    const institutionType = req.query.institutionType;

    let query = {};
    if (institutionType) {
      if (Array.isArray(institutionType)) {
        query.institutionType = { $in: institutionType };
      } else {
        query.institutionType = institutionType;
      }
    }

    // Querying institutions based on the constructed query
    const institutions = await Institution.find(query);

    res.status(200).json(institutions);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    next(error);
  }
};

exports.deleteInstitutionHandler = async (req, res, next) => {
  try {
    const institutionId = req.params.institutionId;
    // Attempt to find and delete the institution
    const deletedInstitution = await Institution.findByIdAndDelete(
      institutionId
    );

    // If no institution found for the provided ID
    if (!deletedInstitution) {
      return res.status(404).json({ error: "Institution not found" });
    }

    res.status(200).json({
      message: "Institution deleted successfully",
      deletedInstitution,
    });
  } catch (error) {
    console.error("Error deleting institution:", error);
    next(error);
  }
};

exports.updateInstitutionHandler = async (req, res, next) => {
  try {
    const institutionId = req.params.institutionId;
    console.log(institutionId);
    const updateData = req.body;

    // Attempt to find and update the institution
    const updatedInstitution = await Institution.findByIdAndUpdate(
      institutionId,
      updateData,
      { new: true, runValidators: true }
    );

    // If no institution found for the provided ID
    if (!updatedInstitution) {
      return res.status(404).json({ error: "Institution not found" });
    }

    res.status(200).json({
      message: "Institution updated successfully",
      updatedInstitution,
    });
  } catch (error) {
    console.error("Error updating institution:", error);
    next(error);
  }
};
