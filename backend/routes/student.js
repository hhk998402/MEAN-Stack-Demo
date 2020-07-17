var express = require('express');
const jwt = require("jsonwebtoken");
let _ = require('lodash');
var router = express.Router();
var studentData = require("../models/Student.js");
var verifyToken = require("../auth/verifyToken.js");
var { generateRoleToken } = require("../auth/roleTokenController.js");
var { permit } = require("../auth/permissions.js");
const { roles } = require("../auth/roles.js");
var { verifyObjectId } = require("../utils/dataValidation");


/* POST - Register/Add Student Details */
router.post('/addStudent', async(req,res) => {
  let student = new studentData(_.pick(req.body, ['studentId','name','dob','email','password']));
  
  try{
    //Check if studentId is already registered
    const studentIdExists = await studentData.findOne({studentId : student.studentId});
    if(studentIdExists)
      return res.status(400).send({code: 1, message: 'Student ID is already registered'});
    
    //Attempt to save to studentSchema
    const createStudent = await student.save();
    res.status(200).json({code : 0, message : "Successfully added student data"});  
  } catch(err){
    res.status(400);
    err.code === 11000 ? 
      res.json({code: 1, message: 'Duplicate Entry', error: err}) : 
        res.json({code: 2, message: 'Error occurred while adding student details', error: err});
  }
});


/* POST - Student Login */
router.post('/studentLogin', async(req,res) => { 
  try{
    //Check if studentId is registered
    var student = await studentData.findOne({studentId : req.body.studentId});
    if(!student)
      return res.status(400).send({code: 1, message: 'Student ID is not registered, please signup first'});

    const isPasswordMatch = await student.comparePassword(req.body.password);
    if(!isPasswordMatch)
      return res.status(400).json({code: 1, message: "Incorrect student ID - password combination"});
    
    student.permission.hashRoleToken = await generateRoleToken(student);
    student.markModified('permission');
    student.save();
    const token = jwt.sign({
      _id : student._id, 
      roleToken : student.permission.hashRoleToken}, process.env.SECRET_TOKEN, {expiresIn : "1d"});
    res.status(200).header("auth-token", token)
      .json({code : 0, message : "Successfully logged in", token: token});

  } catch(err){
    res.status(400);
        res.json({code: 2, message: 'Error occurred while performing student login', error: err});
  }
});

/* GET - Retrieve student details */
router.get('/getStudentDetails/:_id', verifyObjectId, verifyToken, permit(roles.OWN, roles.ADMIN), async(req,res) => {
  try{
    const fetchStudent = await studentData.findOne({_id : req.params._id})
                                  .select('name studentId email dob marks');
    fetchStudent === null || fetchStudent === undefined ? 
        res.status(400).json({code: 1,
          message: "No entry found for this studentId",
        }) : 
        res.status(200).json({code : 0, message : fetchStudent});
      } catch(error){
    res.status(400).json({code : 1, 
      message : "Error while fetching student details",
      error: error});
  }
});

/* PATCH - Update/Edit Student Details (Profile)*/
router.patch('/updateStudentProfile/:_id', verifyObjectId, verifyToken, permit(roles.OWN), async(req,res) => {
  try{
    const student = await studentData.updateStudentProfile(req.user._id, req.body.name, req.body.dob);
    student === null || student === undefined ? 
        res.status(400).json({code: 1, 
          message: "Student Profile Update Failed - No entry found in table",
        }) : 
        res.status(200).json({code:0, 
          message: "Student Profile updated succesfully for studentId"
        });
  } catch(error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1, 
      message : "Error while updating student profile for student ID",
      error: error
    });
  }
});

/* PATCH - Update/Edit Student's marks. */
router.patch('/updateMarks/:_id', verifyObjectId, verifyToken, permit(roles.ADMIN), async(req,res) => {
  try{
    const student = await studentData.updateMarks(req.params._id, req.body.marks);
    student === null || student === undefined ? 
        res.status(400).json({code: 1, 
          message: "Marks Update Failed - No entry found in table"
        }) : 
        res.status(200).json({code:0, 
          message: "Marks updated succesfully"
        });
  } catch (error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1, 
      message : "Error while updating student marks",
      error: error
    });
  }
});

/* DELETE - Delete Student */
router.delete('/deleteStudent/:_id', verifyObjectId, verifyToken, permit(roles.ADMIN), async(req,res) => {
  try{
    const deletedStudent = await studentData.findOneAndRemove({_id:req.params._id});
    deletedStudent === null || deletedStudent === undefined ? 
        res.status(400).json({code: 1, 
          message: "Student deletion failed - No entry found in table",
        }) :
        res.status(200).json({code:0,
          message: "Student data successfully deleted"
        });
  } catch (error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1, 
      message : "Error while deleting student details",
      error: error
    });
  }
});


module.exports = router;