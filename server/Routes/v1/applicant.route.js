const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  getApplicantStudentByApplicantIdController,
  universityUploadByApplicantController,
  universityUpdateByApplicantController,
  getStudentAppliedUniversity,
  getAssignedVisaTeam,
} = require("../../controller/ApplicantController/ApplicantController");

router.route("/:employee_id").get(getApplicantStudentByApplicantIdController);
router
  .route("/university-upload/:studentId/:counselorId/:applicantId")
  .post(universityUploadByApplicantController)
  .patch(universityUpdateByApplicantController);
router
  .route("/university-upload/:studentId/:counselorId")
  .get(getStudentAppliedUniversity);

router
  .route("/get-visa-team/:studentId/:applicantId")
  .get(getAssignedVisaTeam)

module.exports = router;
