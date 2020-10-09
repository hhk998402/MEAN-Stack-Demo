const mongoose = require('mongoose');
const supertest = require('supertest');

const dbHandler = require('../testDbConnectionHandler');
const studentRouter = require('../../main/routes/student');
const studentModel = require('../../main/models/Student');
const app = require('../../main/app');
const studentTestData = require('../resources/studentTestData');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async done => {
  await dbHandler.connect(done);
});

/**
 * Clear all test data after every test.
 */
afterEach(async done => {
  await dbHandler.clearDatabase(done);
});

/**
 * Remove and close the db and server.
 */
afterAll(async done => {
  await dbHandler.closeDatabase(done);
});

/**
 * Student API test suite.
 */
describe('Testing the student API routes ', () => {

    /**
     * Tests that a valid student can be added without throwing any errors.
     */
    it('tests that a valid student can be added without throwing any errors', async done => {
        const response = await supertest(app).post('/student/addStudent').send(studentTestData.validStudentEntry);
    
        expect(response.status).toBe(200);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toBe('Successfully added student data');
        done();
    });

    it('tests that an invalid student entry cannot be added without throwing any errors', async done => {
      const response = await supertest(app).post('/student/addStudent').send(studentTestData.invalidStudentEntry);
  
      expect(response.status).toBe(400);
      expect(response.body.code).toBe(2);
      expect(response.body.message).toBe('Error occurred while adding student details');
      done();
  });
});