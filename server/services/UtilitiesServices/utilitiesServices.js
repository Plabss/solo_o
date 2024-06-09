const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");

exports.getStudentsByStatusServices = async (query) => {
  const requestedInfo = await CreateStudent.find(query)
    // .select("students")

  return requestedInfo;
};
