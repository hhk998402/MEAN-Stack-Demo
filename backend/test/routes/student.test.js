const mongoose = require('mongoose');
const supertest = require('supertest');

const dbHandler = require('../testDbConnectionHandler');
const studentRouter = require('../../main/routes/student');
const studentModel = require('../../main/models/Student');
const app = require('../../main/app');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Product test suite.
 */
describe('Testing the student API routes ', () => {

    /**
     * Tests that a valid student can be added without throwing any errors.
     */
    it('tests that a valid student can be added without throwing any errors', async () => {
        const response = await supertest(app).post('/student/addStudent').send(validStudentEntry);
        console.log(response);
    
        expect(response.status).toBe(200);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toBe('Successfully added student data');
    });
});

/**
 * Valid student entry.
 */
const validStudentEntry = {
	studentId:"16BCE0900",
	name:"Test User",
	dob: "20/05/1995",
	email: "hemant@abc.com",
	password:"number",
	marks:[{
		courseCode : "CSE2000",
		score : "20"
	},{
		courseCode : "CSE2004",
		score : "94"
	}]
};