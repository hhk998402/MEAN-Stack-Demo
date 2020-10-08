var express = require('express');
const jwt = require("jsonwebtoken");
let _ = require('lodash');
var router = express.Router();
var adminData = require("../models/Admin.js");

/* POST - Add Admin */
router.post('/addAdmin', async(req,res) => {
  let admin = new adminData(_.pick(req.body, ['name','email','password']));

  try{
    //Check if emailID is already registered
    const adminExists = await adminData.findOne({email : admin.email});
    if(adminExists)
      return res.status(400).send({code: 1, message: 'EMail ID is already registered'});
    
    //Attempt to save to adminSchema
    const createAdmin = await admin.save();
    res.status(200).json({code : 0, message : "Successfully added admin data"});  
  } catch(err){
    res.status(400);
    err.code === 11000 ? 
      res.json({code: 1, message: 'Duplicate Entry', error: err}) : 
        res.json({code: 2, message: 'Error occurred while adding admin details', error: err});
  }
});

module.exports = router;