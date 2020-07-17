var express = require('express');
const jwt = require("jsonwebtoken");
let _ = require('lodash');
var router = express.Router();
var courseData = require("../models/Course.js");
var verifyToken = require("../auth/verifyToken.js");
var { permit } = require("../auth/permissions.js");
const { roles } = require("../auth/roles.js");
var { verifyObjectId } = require("../utils/dataValidation");

/* POST - Create/Add Course. */
router.post('/addCourse', verifyToken, permit(roles.ADMIN), async(req,res) => {
    let course = new courseData(_.pick(req.body, ['code','name']));
  
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

/* GET - Retrieve course details */
router.get('/getCourseDetails/:_id', verifyObjectId, verifyToken, permit(roles.ADMIN), async(req,res) => {
    const _id = req.params._id;
    try{
      const fetchCourse = await courseData.findOne({_id : _id});
      fetchCourse === null || fetchCourse === undefined ? 
          res.status(400).json({code: 1, 
            message: "No entry found",
          }) : 
          res.status(200).json({code : 0, message : fetchCourse});
    } catch(error){
      res.status(400).json({code : 1,
        message : "Error while fetching course details",
        error: error});
    }
});

/* DELETE - Delete Course */
router.delete('/deleteCourse/:_id', verifyObjectId, verifyToken, permit(roles.ADMIN), async(req,res) => {
    const _id = req.params._id;
    try{
      const deletedCourse = await courseData.findOneAndRemove({_id:_id});
      deletedCourse === null || deletedCourse === undefined ?
          res.status(400).json({code: 1, 
            message: "Course deletion failed - No entry found in table",
          }) :
          res.status(200).json({code:0,
            message: "Course successfully deleted"
          });
    } catch (error){
      console.log("DBError: " + error);
      res.status(400).json({code: 1,
        message : "Error while deleting course details",
        error: error
      })
    }
});

module.exports = router;
  