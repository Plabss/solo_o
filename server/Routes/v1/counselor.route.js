const express = require("express");
const router = express.Router();
const {
  getCounselorStudentByIdController,AssignStudentToApplicantController
} = require("../../controller/CounselorController/CounselorController");

router.route("/assign-student-to-applicant/:studentId/:apllicantId").patch(AssignStudentToApplicantController);
router.route("/:employee_id").get(getCounselorStudentByIdController);

module.exports = router;
