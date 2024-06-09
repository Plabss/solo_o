const CreateStudent = require("../../model/CreateStudent.model");
const StudentDetailsModel = require("../../model/StudentDetails.model");

exports.postStudentDetailsService = async (studentInfo) => {
  console.log("first", studentInfo);
  // const submittedInfo = await StudentDetailsModel.create(studentInfo);

  // return submittedInfo;
  //updating student status
//   const student = await CreateStudent.findOne({
//     studentId: studentInfo.studentId,
//   });

  await CreateStudent.updateOne(
    {
        studentId: studentInfo.studentId
    },
    {
      $set: {
        status: "enrolled",
      },
    }
  );
  const existingStudentDetails = await StudentDetailsModel.findOne({
    studentId: studentInfo.studentId,
  });
  if (existingStudentDetails) {
    existingStudentDetails.set(studentInfo);
    await existingStudentDetails.save();
    return existingStudentDetails;
  } else {
    const newStudentDetails = new StudentDetailsModel(studentInfo);
    await newStudentDetails.save();
    return newStudentDetails;
  }
};
exports.GetStudentDetailsService = async (query) => {
  //console.log(query)
  const studentInfo = await StudentDetailsModel.find(query);
  return studentInfo;
};
