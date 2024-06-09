const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const Employee = require("../../model/Employee.model");
const cloudinaryService = require('../cloudinaryService')

// exports.GetAllEmployeeListServices = async () => {
//   const employeesInfo = await CreateEmployee.find({});
//   return employeesInfo;
// };

exports.GetAllEmployeeListServices = async () => {
  const employeesInfo = await Employee.find({});
  return employeesInfo;
};
exports.GetAllStudenteListServices = async () => {
  const StudentsList = await CreateStudent.find({});
  return StudentsList;
};

exports.createEmployeeServices = async (employeeInfo) => {
  const submittedInfo = await CreateEmployee.create(employeeInfo);
  return submittedInfo;
};

exports.addEmployee = async (employeeData, files) => {
  const uploadedFiles = await cloudinaryService.uploadFiles(files, employeeData.name);

  const newEmployee = new Employee({
    ...employeeData,
    profilePic: uploadedFiles.profilePic,
    cv: uploadedFiles.cv,
    resume: uploadedFiles.resume
  });
  await newEmployee.save();
  return newEmployee;
};
