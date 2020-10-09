module.exports = {
    preset: '@shelf/jest-mongodb',
    setupFilesAfterEnv: [
        "./test/cleanupAfterAllTests.js"
    ]
};