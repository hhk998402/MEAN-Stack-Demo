module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest',
        ip: '127.0.0.1',
        port: 27001
      },
      binary: {
        version: '4.0.2', // Version of MongoDB
        skipMD5: true
      },
      autoStart: false
    }
};