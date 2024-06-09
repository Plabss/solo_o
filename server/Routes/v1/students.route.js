const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  postStudentDetailsInfoController,
  getStudentDetailsInfoController
} = require("../../controller/StudentController/StudentController");

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subfolder = req.params.studentId;
    const destination = path.join("../client/public/studentDocs", subfolder);
    // const deleteExistingFiles = async (folderPath) => {
    //   try {
    //     const files = await fs.promises.readdir(folderPath);
    //     for (const fileName of files) {
    //       const filePath = path.join(folderPath, fileName);
    //       if (fs.lstatSync(filePath).isFile()) {
    //         await fs.promises.unlink(filePath);
    //       }
    //     }
    //   } catch (error) {
    //     console.error(`Error deleting existing files: ${error}`);
    //   }
    // };
    // fs.mkdirSync(destination, { recursive: true });
    // deleteExistingFiles(destination).then(() => {
    //   cb(null, destination);
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
  "/:studentId/:counselorId",
  docUpload.fields([
    {
      name: "sscCertificate",
      maxCount: 1,
    },
    {
      name: "sscTranscript",
      maxCount: 1,
    },
    {
      name: "hscCertificate",
      maxCount: 1,
    },
    {
      name: "hscTranscript",
      maxCount: 1,
    },
    {
      name: "hscRecommendation",
      maxCount: 1,
    },
    {
      name: "honsCertificate",
      maxCount: 1,
    },
    {
      name: "honsTranscript",
      maxCount: 1,
    },
    {
      name: "honsRecommendation",
      maxCount: 1,
    },
    {
      name: "mscCertificate",
      maxCount: 1,
    },
    {
      name: "mscTranscript",
      maxCount: 1,
    },
    {
      name: "mscRecommendation",
      maxCount: 1,
    },
    {
      name: "ielts",
      maxCount: 1,
    },
    {
      name: "cv",
      maxCount: 1,
    },
    {
      name: "passport",
      maxCount: 1,
    },
    {
      name: "extraCA",
      maxCount: 1,
    },
    {
      name: "bankSolvency",
      maxCount: 1,
    },
  ]),
  postStudentDetailsInfoController
);

router.route("/:studentId/:counselorId").get(getStudentDetailsInfoController);

module.exports = router;


