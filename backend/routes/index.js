var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();
var studentData = require("../models/Student.js");
var courseData = require("../models/Course.js");
var verifyToken = require("../auth/verifyToken.js");
var { generateRoleToken } = require("../auth/roleTokenController.js");
var { permit } = require("../auth/permissions.js");
const { roles } = require("../auth/roles.js");


/* POST - Create/Add Course. */
router.post('/addCourse', verifyToken, permit(roles.STUDENT), async(req,res) => {
  let course = new courseData(req.body);

  //Attempt to save to courseSchema
  try{
    const createCourse = await course.save();
    res.status(200).json({code : 0, message : "Successfully added course data"});  
  } catch(err){
    res.status(400);
    err.code === 11000 ?
      res.json({code: 1, message: 'Duplicate Entry', error: err}) : 
        res.json({code: 2, message: 'Error occurred while creating course', error: err});
  }
});

/* POST - Register/Add Student Details */
router.post('/addStudent', async(req,res) => {
  let student = new studentData(req.body);
  
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
router.get('/getStudentDetails/:studentId', async(req,res) => {
  const studentId = req.params.studentId;
  try{
    const fetchStudent = await studentData.findOne({studentId : studentId});
    fetchStudent === null || fetchStudent === undefined ? 
        res.status(400).json({code: 1, 
          message: "No entry found for studentId = " + studentId,
        }) : 
        res.status(200).json({code : 0, message : fetchStudent});
      } catch(error){
    res.status(400).json({code : 1, 
      message : "Error while fetching student details for student ID = " + studentId,
      error: error});
  }
});

/* GET - Retrieve course details */
router.get('/getCourseDetails/:courseCode', async(req,res) => {
  const courseCode = req.params.courseCode;
  try{
    const fetchCourse = await courseData.findOne({code : courseCode});
    fetchCourse === null || fetchCourse === undefined ? 
        res.status(400).json({code: 1, 
          message: "No entry found for course code = " + courseCode,
        }) : 
        res.status(200).json({code : 0, message : fetchCourse});
  } catch(error){
    res.status(400).json({code : 1,
      message : "Error while fetching course details for course code = " + courseCode,
      error: error});
  }
});

/* PATCH - Update/Edit Student Details (Profile)*/
router.patch('/updateStudentProfile/:studentId', async(req,res) => {
  const studentId = req.params.studentId;
  const name = req.body.name;
  const dob = req.body.dob;
  try{
    const student = await studentData.updateStudentProfile(studentId, name, dob);
    student === null || student === undefined ? 
        res.status(400).json({code: 1, 
          message: "Student Profile Update Failed - No entry found in table for studentId = " + studentId,
        }) : 
        res.status(200).json({code:0, 
          message: "Student Profile updated succesfully for studentId = " + studentId
        });
  } catch(error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1, 
      message : "Error while updating student profile for student ID = " + studentId,
      error: error
    })
  }
});

/* PATCH - Update/Edit Student's marks. */
router.patch('/updateMarks/:studentId', async(req,res) => {
  const studentId = req.params.studentId;
  const marks = req.body.marks;
  try{
    const student = await studentData.updateMarks(studentId, marks);
    student === null || student === undefined ? 
        res.status(400).json({code: 1, 
          message: "Marks Update Failed - No entry found in table for studentId = " + studentId,
        }) : 
        res.status(200).json({code:0, 
          message: "Marks updated succesfully for studentId = " + studentId
        });
  } catch (error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1, 
      message : "Error while updating student marks for student ID = " + studentId,
      error: error
    })
  }
});

/* DELETE - Delete Course */
router.delete('/deleteCourse/:courseCode', async(req,res) => {
  const courseCode = req.params.courseCode;
  try{
    const deletedCourse = await courseData.findOneAndRemove({code:courseCode});
    deletedCourse === null || deletedCourse === undefined ? 
        res.status(400).json({code: 1, 
          message: "Course deletion failed - No entry found in table for course code = " + courseCode,
        }) :
        res.status(200).json({code:0,
          message: "Course code = " + courseCode + " successfully deleted"
        });
  } catch (error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1,
      message : "Error while deleting course details for course code = " + courseCode,
      error: error
    })
  }
});

/* DELETE - Delete Student */
router.delete('/deleteStudent/:studentId', async(req,res) => {
  const studentId = req.params.studentId;
  try{
    const deletedStudent = await studentData.findOneAndRemove({studentId:studentId});
    deletedStudent === null || deletedStudent === undefined ? 
        res.status(400).json({code: 1, 
          message: "Student deletion failed - No entry found in table for studentId = " + studentId,
        }) :
        res.status(200).json({code:0,
          message: "StudentId = " + studentId + " successfully deleted"
        });
  } catch (error){
    console.log("DBError: " + error);
    res.status(400).json({code: 1, 
      message : "Error while deleting student details for student ID = " + studentId,
      error: error
    })
  }
});


module.exports = router;
