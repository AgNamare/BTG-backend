import Institution from "../models/institution.model.js";

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

export const deleteInstitutionHandler = async (req, res, next) => {
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

export const updateInstitutionHandler = async (req, res, next) => {
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
