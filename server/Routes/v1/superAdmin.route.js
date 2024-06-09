const express = require("express");
const multer = require('multer');

const router = express.Router();

const {
  CreateEmployeeController,
  GetAllEmployeeListController,
  GetAllStudentListController,
  AddEmployee,
  DownloadEmployeeFiles,
} = require("../../controller/SuperAdminController/superAdmin.controller");


const upload = multer({ storage: multer.memoryStorage() });

// router.route("/").post(CreateEmployeeController);

router.route("/get-student-list").get(GetAllStudentListController);

router.post('/add-employee', upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), AddEmployee);

router.route("/get-employee-list").get(GetAllEmployeeListController);


router.route("/download-employee-docs/:employee_id").get(DownloadEmployeeFiles);



module.exports = router;
