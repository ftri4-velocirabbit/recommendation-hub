const mongoose = require('mongoose');
const setup = require('./setup');

const TimeSeries = mongoose.model('TimeSeries', new mongoose.Schema({
  method: { type: String, required: true },
  endpoint: { type: String, required: true },
  call_time: { type: String, required: true }, // unix timestamp
  response_time: { type: Number, required: true }, // ms
}));
// TODO add validation for call_time to be convertible to Date

/**
 * Log a time-series route data point.
 * @param {String} method - HTTP method type
 * @param {String} endpoint - HTTP request relative endpoint
 * @param {String} callTime - UNIX timestamp of when request first communicated with the server
 * @param {Number} responseTime - number of milliseconds until server generated a response
 * 
 * @public
 */
async function logResponse(method, endpoint, callTime, responseTime) {
  // TODO validate inputs

  await setup.connect();

  try {
    await TimeSeries.create({
      method,
      endpoint,
      call_time: callTime,
      response_time: responseTime
    });
  } catch (error) {
    console.error('\n\nERROR LOGGING RESPONSE TO DATABASE');
    console.error(error);
    console.log('\n\n');
  }
}

module.exports = { logResponse };
