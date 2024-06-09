const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");

exports.createStudentServices = async (studentInfo) => {
  console.log("66666666666",studentInfo);
  const registeredInfo = await CreateStudent.create(studentInfo);
  console.log("registeredInfo4534444444444",registeredInfo);

  await CreateEmployee.updateOne(
    {
      _id: registeredInfo.counselor.id,
    },
    {
      $push: {
        students: registeredInfo._id,
      },
    }
  );
  return registeredInfo;
};


exports.GetAllStudentListServices = async () => {
  const submitInfo = await CreateStudent.find({});
  return submitInfo;
};
