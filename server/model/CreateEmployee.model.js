const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const CreateEmployeeSchema = mongoose.Schema(
  {
    profilePic: String,
    address: String,
    email: String,
    role: String,
    salary: String,
    familyPhone: String,
    previousExperience: String,
    password: String,
    employee_id: String,
    name: String,
    phone: String,
    students: [
      {
        type: ObjectId,
        ref: "CreateStudent",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const CreateEmployee = mongoose.model("CreateEmployee", CreateEmployeeSchema);

module.exports = CreateEmployee;
