const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
    postUniversityDocsController, getUniversityDocsController
} = require("../../controller/ApplicantController/ApplicantController");

const docStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subfolder = req.params.studentId;
        const destination = path.join("../client/public/UniDoc/", subfolder);
        // const deleteExistingFiles = async (folderPath) => {
        //     try {
        //         const files = await fs.promises.readdir(folderPath);
        //         for (const fileName of files) {
        //             const filePath = path.join(folderPath, fileName);
        //             if (fs.lstatSync(filePath).isFile()) {
        //                 await fs.promises.unlink(filePath);
        //             }
        //         }
        //     } catch (error) {
        //         console.error(`Error deleting existing files: ${error}`);
        //     }
        // };
        // fs.mkdirSync(destination, { recursive: true });
        // deleteExistingFiles(destination).then(() => {
        //     cb(null, destination);
        // });
        fs.mkdirSync(destination, { recursive: true });
        return cb(null, destination);
    },
    filename: (req, file, cb) => {
        console.log("ollllllllllllllllllll", file.originalname);
        cb(null, file.originalname);
    },
});
let docUpload = multer({
    storage: docStorage,
});

router.post(
    "/:studentId/:counselorId/:applicantId/:studentObjectId",
    docUpload.fields([
        {
            name: "offerLetter",
            maxCount: 1,
        },
        {
            name: "swiftCopy",
            maxCount: 1,
        },
        {
            name: "universityPaymentRecept",
            maxCount: 1,
        },
        {
            name: "loa",
            maxCount: 1,
        },
        {
            name: "dol",
            maxCount: 1,
        },
        {
            name: "pal",
            maxCount: 1,
        }
    ]),
    postUniversityDocsController
);



// router
//   .route("/university-upload/:studentId/:counselorId/:applicantId")
//   .post(universityUploadByApplicantController)
//   .patch(universityUpdateByApplicantController);
// router
//   .route("/university-upload/:studentId/:counselorId")
//   .get(getStudentAppliedUniversity);

module.exports = router;
