const uploadsService = require('../services/uploadsService')
const staffService = require('../services/staffService')
//npm packages
const fs = require('fs')


//LOCAL FUNCTIONS-----------------------------
function rmLocal(file_id, location) {
  let base_path = `.././backend/uploads/${location}/`
  let filename = file_id
  let final_path = base_path + filename
  //remove the file upon invalid database entry
  fs.unlink(final_path, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
};
function rmFront(file_id, location) {
  let base_path = `.././frontend/${location}/`
  let filename = file_id
  let final_path = base_path + filename
  //remove the file upon invalid database entry
  fs.unlink(final_path, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
};
function currentDate() {
  let current_date = new Date().toLocaleString()
  let year, day, month, hours, minutes, seconds;
  day = new Date(current_date).getDate();
  month = new Date(current_date).getMonth();
  year = new Date(current_date).getFullYear();
  hours = new Date(current_date).getHours();
  minutes = new Date(current_date).getMinutes();
  seconds = new Date(current_date).getSeconds()
  return `${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`
};

//FUNCTIONS FOR MIDDLEWARES AND MULTER----------------
//check if the file fields are empty or not for updates
module.exports.checkFile = (req) => {
  console.log('Entering CheckFile')
  let report_id = req.body.report_id;
  //user can use these without uploading new file
  let filename = req.body.file_name;
  let allocated_to = req.body.allocated_to;
  let file_remarks = req.body.file_remarks;
  let semester_code = req.body.semester_code;
  let data = [filename, allocated_to, file_remarks, semester_code, report_id];
  console.log(req.body)
  //check for null values
  const dataCheck = (element) => element != null && element != undefined && element.length != 0
  let checked = data.every(dataCheck)
  console.log(checked)
  return checked

};
//middleware function extended from checkFile above.
module.exports.checkFileMiddleware = (req, res, next) => {
  let value = this.checkFile(req)
  if (value) {
    return next()
  } else {
    return res.status(200).json({ message: "Missing Fields. Request Failed" });
  }
};
//FUNCTIONS FOR MIDDLEWARES AND MULTER----------------

//APIS FOR PROFILE PICTURES----------------------------------
//fetch profile picture
module.exports.getProfilePicture = async (req, res) => {
  try {
    let staff_id = req.params.staff_id
    let results = await uploadsService.getProfilePicture(staff_id);
    console.log('Fetching PFP');
    if (results.length < 1) {
      let data = [{
        filename: 'default.png',
      }];
      console.log(data)
      return res.status(200).json(data);
    }
    else if (results.length > 0) {
      return res.status(200).json(results);
    }
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid Input" });
  }
};
//upload and updates profile pictures accordingly
module.exports.uploadProfilePicture = async (req, res) => {
  try {
    //check if file exists
    if (req.file == undefined) { throw "Please ensure file is 3MB and a JPEG or PNG" };
    //check whether staff exists
    let staff_id = req.params.staff_id;
    if (staff.length == 0) { throw 'No Such Staff' };
    let staff = await staffService.getStaffByStaffId(staff_id);
    //check for existing entry
    let filename = req.file.filename
    let results = await uploadsService.getProfilePicture(staff_id);
    if (results.length == 0) {
      console.log('insertProfilePicture');
      //if there are no existing records, create new entry
      await uploadsService.insertProfilePicture(staff_id, filename);
      return res.status(200).json({ message: "Uploaded Successfully!" });
    } else if (results.length > 0) {
      console.log('updateProfilePicture');
      //remove the file locally
      rmFront(results[0].filename, 'profile_picture');
      //then update the current entry
      let upload = await uploadsService.updateProfilePicture(staff_id, filename);
      if (upload.errno) { throw 'Database Error' };
      return res.status(200).json({ message: "Updated Successfully!" });
    }
  }
  catch (error) {
    console.error(error)
    if (req.file == undefined) {
      return res.status(400).json({ message: error });
    } else {
      rmFront(req.file.filename, 'profile_picture')
      return res.status(400).json({ message: error });
    }
  }
};
//END APIS FOR PROFILE PICTURES----------------------------------

//APIS FOR REPORTS (IN USE)
//download reports post processing from frontend (JSON Format)
module.exports.uploadFileJSON = async (req, res) => {
  try {
    console.log('Entering Upload JSON')
    //in this case, req.body.data will send back the object array from the frontend. 
    //console.log(req.body.data)
    let data = req.body.data.excelData
    let course = req.body.data.course_id
    let semester_code = req.body.data.semester_code
    let stringConcat = "";
    //order of elements for reference 
    //(mod_code, year_offered, mod_stage, mod_name, mod_abbrv, mod_dlt, mod_lecture, mod_tutorial, 
    //mod_practical, credit_unit, prereq, module_type, type,total_hours, remarks,fk_semester_code, fk_course_id)
    let dataArray = []
    //push in order
    data.forEach(element => {
      dataArray.push(element['Code'])
      dataArray.push(element['Year'])
      dataArray.push(element['Stage'])
      dataArray.push(element['Name'])
      dataArray.push(element['Abbrev'])
      dataArray.push(element['DLT'])
      dataArray.push(element['L'])
      dataArray.push(element['T'])
      dataArray.push(element['P'])
      dataArray.push(element['CU'])
      dataArray.push(element['Prerequisite (Pass\/Taken)'])
      dataArray.push(element['Module Type'])
      dataArray.push(element['Type'])
      dataArray.push(element['Total'])
      dataArray.push(element['Remarks'])
      dataArray.push(semester_code)
      dataArray.push(course)
    });
    let appendSQL = " "
    for (let index = 0; index < data.length; index++) {
      appendSQL += ",(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    }
    //console.log(dataArray)
    
    let newStringConcat = appendSQL.replace(',', '')
    //console.log(newStringConcat)
    let result = await uploadsService.uploadJSONReport(newStringConcat,dataArray)
    //console.log(stringConcat)
    if (result.changedRows == 0) {
      return res.status(200).json({ message: "Successfully Inserted New Records. Please Proceed to Module Maintenence to Include More Details if Neccessary." });
    } else if (result.changedRows > 0) {
      return res.status(200).json({ message: "Successfully Updated Existing Records. Please Proceed to Module Maintenence to Include More Details if Neccessary." });
    } else if (result.errno) {
      throw "Database Error. SQL Error Code: " + result.errno + result.code;
    };

  } catch (error) {
    return res.status(500).json({ message: error });
  }

};
//APIS FOR REPORTS (NOT IN USE)----------------------------------
//uploading reports
module.exports.insertNewReport = async (req, res) => {
  try {
    if (req.file === undefined) { throw 'Please Upload a File' };
    let original_name = req.file.originalname
    let filename = req.file.filename
    let uploaded_by = req.params.staff_id
    let allocated_to = req.body.allocated_to
    let file_remarks = req.body.file_remarks
    let semester_code = req.body.semester_code
    let upload_time = currentDate()
    let data = [filename, original_name, uploaded_by, allocated_to, file_remarks, semester_code, upload_time]
    const dataCheck = (element) => element != null
    let checked = data.every(dataCheck)
    if (!checked) { throw 'Please Fill In All Fields' }
    let results = await uploadsService.insertNewReport(data)
    if (results.errno) { throw 'Database Error' }
    return res.status(200).json({ message: "Successfully Uploaded!" });
  }
  catch (error) {
    console.log(error)
    if (error = 'Please Upload a File') {
      return res.status(400).json({
        message: error
      });
    } else {
      rmLocal(req.file.filename, 'report_samples')
      return res.status(400).json({ message: error });
    }
  }
};
//retrieve all existing reports in the database
module.exports.getAllReport = async (req, res) => {
  try {
    let results = await uploadsService.getAllReport();
    console.log('Fetching All Reports');
    return res.status(200).json(results);
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid Input" });
  }
};
//retrive reports by uploader
module.exports.getReportByStaffID = async (req, res) => {
  try {
    let staff_id = req.params.staff_id
    let results = await uploadsService.getReportByStaffID(staff_id);
    console.log('Fetching Reports By Uploader');
    return res.status(200).json(results);
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid Input" });
  }
};
//get report by reportID
module.exports.getReportByID = async (req, res) => {
  try {
    let report_id = req.body.report_id;
    let results = await uploadsService.getReportByID(report_id);
    console.log('Fetching Reports By ID');
    return res.status(200).json(results);
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Input" });
  }
};
//deleting reports
module.exports.deleteReport = async (req, res) => {
  try {
    let file_id = req.body.file_id;
    console.log('Deleting Report');
    if (file_id) {
      let results = await uploadsService.deleteReport(file_id);
      if (results.affectedRows != 0) {
        console.log('Executing Local Deletion')
        rmLocal(file_id, 'report_samples')
      };
      return res.status(200).json({ message: "Delete Successful" });
    } else if (!file_id) {
      throw 'Input Error. Please Check Submitted Fields.';
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: error });
  }
};
//update report
module.exports.updateReport = async (req, res) => {
  try {
    console.log('Updating Report');
    //only use if the user wants to upload a new file
    let report_id = req.body.report_id;
    //user can use these without uploading new file
    if (req.file != undefined) { var new_file_id = req.file.filename }
    let filename = req.body.file_name;
    let allocated_to = req.body.allocated_to;
    let file_remarks = req.body.file_remarks;
    let semester_code = req.body.semester_code;
    let data = [filename, allocated_to, file_remarks, semester_code, report_id];
    //check for null values
    if (req.file == undefined) {
      //if the user never specified a file, 
      let update = await uploadsService.updateReport(data);
      if (update.errno) {
        throw 'Database Error'
      } else if (update.affectedRows == 0) {
        throw 'Invalid File'
      };
      return res.status(200).json({ message: 'Successfully Updated!' });
    } else if (req.file != undefined) {
      //else if the user did specify a new, updated file.
      let newDate = currentDate()
      let staff_id = req.params.staff_id
      //delete old database entry to prep for insertion.
      let results = await uploadsService.deleteReport(report_id);
      if (results.affectedRows != 0) {
        console.log('Executing Local Deletion')
        rmLocal(report_id, 'report_samples')
      } else if (results.affectedRows == 0) {
        rmLocal(new_file_id, 'report_samples')
        throw 'Invalid File'
      }
      let insert_results = await uploadsService.insertNewReport([new_file_id, filename, staff_id, allocated_to, file_remarks, semester_code, newDate])
      if (insert_results.errno) { throw 'Database Error' }
      return res.status(200).json({ message: "Successfully Updated!" });
    }
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ message: error });
  }
};
//download report
module.exports.downloadFile = async (req, res) => {
  console.log('Entering Download File')
  let location = req.params.file_id
  let filename = req.params.filename
  let base_path = `.././backend/uploads/report_samples/${location}/`
  res.status(200).download(base_path, filename)
}

//END APIS FOR REPORTS----------------------------------

//TESING API FOR FILE FIELDS-------------------------
module.exports.testFiles = async (req, res) => {
  try {
    return res.status(200).json({ message: req.file });
  }
  catch (error) {
    return res.status(400).json({ message: error });
  }
};