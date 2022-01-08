const config = require('../config/config');
const pool = require('../config/database')
const uploadsService = require('../services/uploadsService')

module.exports.uploadProfilePicture = async (req, res) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  const file = req.file
  console.log(req.file, req.body)
  let results = await uploadsService.ProfilePicture(req.params.staff_id);
}

//fetch profile picture
module.exports.getProfilePicture = async (req, res) => {
  console.log(req.params.staff_id)
  try {
    let results = await uploadsService.getProfilePicture(req.params.staff_id);
    console.log('Fetching PFP', results);
    if (!results.length) {
      let data = {
        pfp_id: 'default.png',
        fk_staff_id: null
      }
      console.log(data)
      return res.status(200).json(data);
    }
  }
  catch {
    return res.status(400).json(error);
  }
}