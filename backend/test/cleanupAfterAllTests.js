const webProc = require('../main/bin/www');

// Stop the main app.js and www process after all tests are completed
afterAll(async done => {
    webProc.stop(done);
});