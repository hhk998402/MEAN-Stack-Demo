var express = require('express');
const jwt = require("jsonwebtoken");
let _ = require('lodash');
var router = express.Router();
var adminData = require("../models/Admin.js");
var { verifyToken, generateToken } = require("../auth/jwtTokenController.js");
var { permit } = require("../auth/permissions.js");
const { roles } = require("../auth/roles.js");

/* POST - Register/Add Admin Details */
router.post('/addAdmin', async(req,res) => {
    console.log(req.body);
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
  
  
  /* POST - Admin Login */
  router.post('/adminLogin', async(req,res) => { 
    try{
      //Check if emailID is registered
      var admin = await adminData.findOne({email : req.body.email});
      if(!admin)
        return res.status(400).send({code: 1, message: 'Email ID is not registered, please signup first'});
  
      const isPasswordMatch = await admin.comparePassword(req.body.password);
      if(!isPasswordMatch)
        return res.status(400).json({code: 1, message: "Incorrect email ID - password combination"});
      
      const token = await generateToken(admin);
      res.status(200).header("auth-token", token)
        .json({code : 0, message : "Successfully logged in", token: token});
  
    } catch(err){
      res.status(400);
          res.json({code: 2, message: 'Error occurred while performing admin login', error: err});
    }
  });

  module.exports = router;