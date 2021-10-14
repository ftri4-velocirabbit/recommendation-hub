const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://nodeuser:nodeuser@dev-cluster.pqpcc.mongodb.net/express-compute?retryWrites=true&w=majority";

let isConnected = false;

/**
 * Connect to MongoDB if a connection has not already been established. Used for lazy connecting.
 * 
 * @private
 */
async function connect() {
  if (!isConnected) {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  }
}

/**
 * Disconnect from MongoDB.
 * 
 * @private
 */
async function disconnect() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

module.exports = { connect, disconnect };
