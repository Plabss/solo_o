const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const JSZip = require('jszip');
const axios = require('axios');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'de8brt7e5',
  api_key: '417745992325818',
  api_secret: 'lEwXokWxQh8ZR9QLIXUirl3xwrk'
});

exports.uploadFiles = async (files, folderName) => {
  const uploadFile = (file, folder) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "auto"  }, (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };

  const uploadedFiles = {};

  for (const [key, file] of Object.entries(files)) {
    uploadedFiles[key] = await uploadFile(file[0], folderName);
  }

  return uploadedFiles;
};

async function downloadFile(url, destination) {
  const response = await axios.get(url, { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(destination));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve());
    response.data.on('error', (err) => reject(err));
  });
}

async function downloadFolderAsZip(folderName, zipFileName) {
  try {
    // Retrieve list of files in the folder
    const { resources } = await cloudinary.search
      .expression(`folder:${folderName}`)
      .execute();

    // Create a new ZIP archive
    const zip = new JSZip();

    // Download each file and add it to the ZIP archive
    for (const resource of resources) {
      const fileName = resource.public_id.split('/').pop();
      const fileUrl = cloudinary.url(resource.public_id);
      const filePath = `${folderName}/${fileName}`;
      await downloadFile(fileUrl, filePath);
      zip.file(fileName, fs.createReadStream(filePath));
    }

    // Generate the ZIP file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });

    // Write the ZIP file to disk
    fs.writeFileSync(zipFileName, zipData);

    console.log(`ZIP file '${zipFileName}' created successfully.`);
  } catch (error) {
    console.error('Error downloading folder:', error);
  }
}

exports.downloadFullFolder = async (folderName,zipFileName) => {
  downloadFolderAsZip(folderName,zipFileName)
}

