const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySchema = new Schema({
    universityName: String,
    subject: String,
    country: String,
    intake: String,
    note: String,
});

const studentSchema = new Schema({
    status : String,
    stdId: String,
    counselorId: String,
    applicantId: String,
    universities: [universitySchema], // Array of university objects
});

const AppliedUniversity = mongoose.model('AppliedUniversity', studentSchema);
module.exports = AppliedUniversity;
