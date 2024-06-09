const express = require("express");
const router = express.Router();
const {
    getStudentsByStatusController
} = require("../../controller/UtilitiesController/UtilitiesController");

router.route("/:status").get(getStudentsByStatusController),



module.exports = router;