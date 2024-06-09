const
    { getApplicantStudentByApplicantId, universityUploadByApplicantService, universityUpdateByApplicantService, getStudentApplicationServices, postUniversityDocsService, assignedVisaTeamService }
        = require("../../services/ApplicantServices/ApplicantServices");

exports.getApplicantStudentByApplicantIdController = async (req, res, next) => {
    try {
        const query = req.params;
        const request = await getApplicantStudentByApplicantId(query);
        res.status(200).json({
            status: "success",
            message: "LogIn successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data",
            error: err,
        })
    }
};
exports.getStudentAppliedUniversity = async (req, res, next) => {
    try {
        console.log("getStudentAppliedUniversity Clicked");
        const query = req.params;
        const request = await getStudentApplicationServices(query);
        res.status(200).json({
            status: "success",
            message: "Get Application Data successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data",
            error: err,
        })
    }
};

exports.universityUploadByApplicantController = async (req, res, next) => {
    try {
        const { studentId, counselorId, applicantId } = req.params;
        const document = {
            stdId: studentId,
            counselorId: counselorId,
            applicantId: applicantId,
            universities: [req.body]
        }
        console.log("document", document);
        const request = await universityUploadByApplicantService(document);
        res.status(200).json({
            status: "success",
            message: "Applied University Updated successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Post data",
            error: err,
        })
    }
};
exports.universityUpdateByApplicantController = async (req, res, next) => {
    try {

        // const document = {
        //     stdId: studentId,
        //     counselorId: counselorId,
        //     applicantId: applicantId,
        //     universities: [req.body]
        // }
        // console.log("document", document);
        const request = await universityUpdateByApplicantService(req.params, req.body);
        res.status(200).json({
            status: "success",
            message: "Applied University Updated successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Post data",
            error: err,
        })
    }
};

exports.postUniversityDocsController = async (req, res, next) => {
    //console.log(req.params);

    //console.log("clickedddddddddddddddd----->", req.body.visaTeamId)
    try {
        const data = {
            'studentId': req.params.studentId,
            'studentObjectId': req.params.studentObjectId,
            'counselorId': req.params.counselorId,
            'applicantId': req.params.applicantId,
            'offerLetter': req.files.offerLetter ? req.files.offerLetter[0].filename : '',
            'swiftCopy': req.files.swiftCopy ? req.files.swiftCopy[0].filename : '',
            'universityPaymentRecept': req.files.universityPaymentRecept ? req.files.universityPaymentRecept[0].filename : '',
            'loa': req.files.loa ? req.files.loa[0].filename : '',
            'dol': req.files.dol ? req.files.dol[0].filename : '',
            'pal': req.files.pal ? req.files.pal[0].filename : '',
            'country': req.body.country,
            'intake': req.body.intake,
            'note': req.body.note,
            'subject': req.body.subject,
            'universityName': req.body.universityName,
            'visaTeamId': req.body.visaTeamId,
            'visaTeamName': req.body.visaTeamName
        };



        console.log("###################", data);

        const details = await postUniversityDocsService(data);
        res.status(200).json({
            status: "success",
            message: "University Docs Submitted",
            data: details,
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Submitted University Docs",
            error: err,
        });
    }
};


exports.getAssignedVisaTeam = async (req, res, next) => {
    console.log("uffffffffffffff",req.params)
    try {
        const request = await assignedVisaTeamService(req.params);
        res.status(200).json({
            status: "success",
            message: "Applied University Updated successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Post data",
            error: err,
        })
    }
};

