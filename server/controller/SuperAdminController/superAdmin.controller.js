const Employee = require("../../model/Employee.model");
const archiver = require('archiver');
const JSZip = require('jszip');
const axios = require('axios');

const {
  createEmployeeServices,
  GetAllEmployeeListServices,
  GetAllStudenteListServices,
  addEmployee,
} = require("../../services/superAdminServices/superAdmin.services");
const { downloadFullFolder } = require("../../services/cloudinaryService");


exports.GetAllEmployeeListController = async (req, res, next) => {
  try {
    const employeeList = await GetAllEmployeeListServices();
    res.status(200).json({
      status: "success",
      message: "Get Employee List successfully",
      data: employeeList,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get Employee List!!!",
      error: err,
    });
  }
};
exports.GetAllStudentListController = async (req, res, next) => {
  try {
    const studentList = await GetAllStudenteListServices();
    res.status(200).json({
      status: "success",
      message: "Get Student List successfully",
      data: studentList,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get Student List!!!",
      error: err,
    });
  }
};


// exports.CreateEmployeeController = async (req, res, next) => {
//   try {
//     const submitInformation = {
//       ...req.body,
//       profilePic: req.files[0].filename,
//     };
//     const employeeInformation = await createEmployeeServices(submitInformation);
//     res.status(200).json({
//       status: "success",
//       message: "Employee Registration completed successfully",
//       data: employeeInformation,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Fail",
//       message: "Can't Register Employee!!!",
//       error: error,
//     });
//   }
// };

//Using Cloudinary and Download 

exports.AddEmployee = async (req,res) => {
  try {
    console.log("first")
    const employeeData = req.body;
    const files= req.files;
    console.log(employeeData,files)
    const newEmployee = await addEmployee(employeeData,files)
    res.status(200).json({
      status: "success",
      message: "Employee Registration completed successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(400).json({error:error.message});
  }
}

exports.DownloadEmployeeFiles = async (req, res) => {
  try {
    console.log('Request received:', req.params);
    const employee = await Employee.findOne(req.params);
    console.log('Employee found:', employee);

    if (!employee) {
      console.log('Employee not found');
      return res.status(404).json({ error: 'Employee not found' });
    }

    let fileUrls = [];
    fileUrls.push(employee.profilePic)
    fileUrls.push(employee.cv)
    fileUrls.push(employee.resume)

    console.log(fileUrls)

    const zip = new JSZip();

    // Add files to the ZIP archive
    await Promise.all(fileUrls.map(async (fileUrl, index) => {
      const fileResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      zip.file(`${employee.name}/file${index + 1}.pdf`, fileResponse.data);
    }));

    // Generate the ZIP file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });

    // Send the ZIP file as a response
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename="${employee.name}.zip"`);
    res.send(zipData);

  } catch (error) {
    console.error('Error downloading employee files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

