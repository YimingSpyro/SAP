const config = require('../config/config');
const pool = require('../config/database')
const uploadsService = require('../services/uploadsService')
const fs = require('fs')

module.exports.uploadProfilePicture = async (req, res) => {
  try {
    console.log(req.file)
    let staff_id = req.params.staff_id
    let filename = req.file.filename
    //check for existing entry
    let results = await uploadsService.getProfilePicture(staff_id);
    if (results.length == 0) {
      console.log('insertProfilePicture')
      //if there are no existing records, create new entry
      let create = await uploadsService.insertProfilePicture(staff_id, filename)
      console.log(create)
      return res.status(200).json({message: "Successfully Uploaded!"});
    }else if(results.length > 0){
      console.log('updateProfilePicture')
      //remove the current file in the directory
      let base_path = '.././backend/uploads/profile_picture/'
      let path = base_path + results[0].filename
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      //else update the current entry
      let update = await uploadsService.updateProfilePicture(staff_id, filename)
      console.log(update)
      return res.status(200).json({message: "Successfully Updated!"});
    }
  }
  catch(error){
    return res.status(500).json(error);
  }
}

//fetch profile picture
module.exports.getProfilePicture = async (req, res) => {
  try {
    let results = await uploadsService.getProfilePicture(req.params.staff_id);
    console.log('Fetching PFP');
    if (results.length < 1) {
      let data = {
        pfp_id: 0,
        file_path: 'default.png',
        fk_staff_id: null
      }
      console.log(data)
      return res.status(200).json(data);
    }
    else if (results.length > 0){
      return res.status(200).json(results);
    }
  }
  catch(error) {
    return res.status(400).json(error);
  }
}