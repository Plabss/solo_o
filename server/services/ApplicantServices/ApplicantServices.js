const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const StudentDetailsModel = require("../../model/StudentDetails.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const AppliedUniversity = require("../../model/UniversityApplication");

exports.getApplicantStudentByApplicantId = async (query) => {
  console.log("object", query);
  const requestedInfo = await CreateEmployee.find(query)
    .select("students")
    .populate({
      path: "students",
    });

  return requestedInfo;
};
exports.getStudentApplicationServices = async (query) => {
  console.log("getStudentApplicationServices", query);
  const { studentId, counselorId } = query;
  const requestedInfo = await AppliedUniversity.find({
    $and: [{ stdId: studentId }, { counselorId: counselorId }],
  });

  return requestedInfo;
};
exports.universityUploadByApplicantService = async (document) => {
  console.log("universityUploadByApplicantService", document);
  await CreateStudent.updateOne(
    {
      studentId: document.stdId,
    },
    {
      $set: {
        status: "Application Processing",
      },
    }
  );
  const requestedInfo = await AppliedUniversity.create(document);

  return requestedInfo;
};

exports.universityUpdateByApplicantService = async (query, body) => {
  const { studentId, counselorId, applicantId } = query;
  console.log("query", query);
  console.log("lyuiyiytu", body);

  const registeredInfo = await AppliedUniversity.updateOne(
    {
      $and: [
        { stdId: studentId },
        { counselorId: counselorId },
        { applicantId: applicantId },
      ],
    },
    {
      $push: {
        universities: body,
      },
    }
  );
  console.log("..............", registeredInfo);
  return registeredInfo;
};

exports.postUniversityDocsService = async (universityDocsPlusExtraIds) => {

  await CreateStudent.updateOne(
    {
      studentId: universityDocsPlusExtraIds.studentId,
    },
    {
      $set: {
        status: "visa-processing",
      },
    }
  );
  await CreateEmployee.updateOne(
    {
      employee_id: universityDocsPlusExtraIds.visaTeamId,
    },
    {
      $push: {
        students: universityDocsPlusExtraIds.studentObjectId,
      },
    }
  )
  console.log(".22222222222222222", universityDocsPlusExtraIds);
  const UniversityDocs = new UniversityDocsModel(universityDocsPlusExtraIds);
  await UniversityDocs.save();
  return UniversityDocs;
};


exports.assignedVisaTeamService = async (query) => {
  

  const expectedStudent= await UniversityDocsModel.find(query)

  return expectedStudent[0].visaTeamName;
  
};