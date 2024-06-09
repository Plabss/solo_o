const express = require("express");
const router = express.Router();
const {
    getStudentByVisaTeamIdController,getDocsByStdIdController,
    updateStudentStatusByIdController
} = require("../../controller/VisaController/visaTeadm.controller");

router.route("/:employee_id").get(getStudentByVisaTeamIdController),
router.route("/get-all-visa-pros-docs/:visaTeamId/:studentId").get(getDocsByStdIdController),
router.route("/update-visa-status/:studentId").patch(updateStudentStatusByIdController),
// router.route("/:visaTeamId").get(getUniversityDocsController),

module.exports = router;