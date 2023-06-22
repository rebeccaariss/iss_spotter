const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable) (nullable meaning we don't have to return a value, we can return null instead)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// Callback (index.js) can take two arguments: error, IP. If there is an
// error value, we return that. if there is an IP address, we return that.
// "callback" here is just the variable name we're giving to this arrow
// function specified in index.js and passed down through call to fetchMyIP.
// Naming it here gives us access to the function so we can pass info back to it. (error if error, IP if successful request)
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null); // null instead of IP

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null); // null instead of IP
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip); // null instead of error
  });
};

module.exports = { fetchMyIP };