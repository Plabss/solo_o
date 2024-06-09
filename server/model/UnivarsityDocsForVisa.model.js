const mongoose = require("mongoose");

const UniversityDocsSchema = mongoose.Schema(
  {
    studentId: String,
    studentObjectId: String,
    counselorId: String,
    applicantId: String,
    offerLetter: String,
    swiftCopy: String,
    universityPaymentRecept: String,
    loa: String,
    dol: String,
    pal: String,
    country: String,
    intake: String,
    note: String,
    subject: String,
    universityName: String,
    visaTeamId: String,
    visaTeamName: String,
  },
  {
    timestamps: true,
  }
);
const UniversityDocsModel = mongoose.model(
  "UniversityDocs",
  UniversityDocsSchema
);

module.exports = UniversityDocsModel;
