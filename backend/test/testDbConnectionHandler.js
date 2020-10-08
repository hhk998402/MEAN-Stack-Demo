const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('custom-env').env(process.env.NODE_ENV);

const mongod = new MongoMemoryServer(process.env.MONGO_DB_URL);

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async (callback) => {
    const uri = process.env.MONGO_DB_URL;
    console.log("TEST MongoDB URL: " + uri);

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
    };

    await mongoose.connect(uri, mongooseOpts);
    callback();
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async (callback) => {
    try{
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
        await mongoose.connection.close();
        await mongod.stop();
    } catch(error){
        console.error("Error while closing database after completing all tests. Error: " + error);
    } finally{
        callback();
    }
    
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async (callback) => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
    callback();
};