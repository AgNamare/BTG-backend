import mongoose  from "mongoose";

const institutionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  institutionType: {
    type: String,
    enum: ['University', 'Private', 'TVET'],
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
  enrollmentInfo: {
    type: String,
    required: true,
  },
  socialMediaLinks: {
    type: String,
    required: true,
  },
});

const Institution = mongoose.model('Institution', institutionSchema);

export default Institution
