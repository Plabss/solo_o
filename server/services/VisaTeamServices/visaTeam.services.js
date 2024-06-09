const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");

exports.getStudentByVisaTeamIdServices = async (query) => {
  const requestedInfo = await CreateEmployee.find(query)
    .select("students")
    .populate({
      path: "students",
    });

  return requestedInfo;
};


exports.getUniversityDocsServices = async (query) => {
  const requestedInfo = await UniversityDocsModel.find(query)

  return requestedInfo;
};

exports.updateStudentStatusService = async (query,status) => {
  console.log(query,status)
  await CreateStudent.updateOne(
    {
        studentId: query
    },
    {
      $set: {
        status: status,
      },
    }
  );
};