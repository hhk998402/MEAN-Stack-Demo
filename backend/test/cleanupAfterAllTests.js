const webProc = require('../main/bin/www');

afterAll(async done => {
    webProc.stop(done);
});