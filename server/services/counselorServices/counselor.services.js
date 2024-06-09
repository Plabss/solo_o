const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");

exports.getCounselorStudentByCounselorId = async (query) => {
  const requestedInfo = await CreateEmployee.find(query)
    .select("students")
    .populate({
      path: "students",
    });

  return requestedInfo;
};
exports.AssignStudentToApplicantServices = async (query, body) => {
  console.log("query", query);
  console.log("lyuiyiytu", query.studentId);



  await CreateEmployee.updateOne(
    {
      _id: query.apllicantId,
    },
    {
      $push: {
        students: query.studentId,
      },
    }
  );
  await CreateStudent.updateOne(
    {
      _id: query.studentId,
    },
    {
      $push: {
        applicant: body.applicant,
        
      },
      $set: {
        status: "application-processing"
      }
    }
  );
 
  const stdInfo = await CreateStudent.find(
    {
      _id: query.studentId,
    },
  );
  const allApplicant = [...stdInfo[0].applicant]
  console.log("allApplicant", allApplicant);
   return allApplicant;
};