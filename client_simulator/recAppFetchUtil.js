const fetch = require('node-fetch'); // base node doesn't have fetch, so import it


/**
 * Create a somewhat random user object
 * 
 
function createNewUserObject(iterator1, iterator2) {
  const usersFirstName = ['Sarah', 'Amanda', 'Taylor', 'Jacob', 'Sam', 'Greg', 'Jacquiline', 'Jeffery', 'Beyonce', 'Will', 'Angelina', 'Kim', 'Chris', 'Johnny', 'James'];
  const usersLastName = ['Barkley', 'Jordan', 'Smith', 'Knowles', 'Bond', 'Henricks', 'Davis'];
  const name = usersFirstName[Math.floor(Math.random() * userFirstName.length)] + ' ' + usersLastName[Math.floor(Math.random() * usersLastName.length)];

  // Mock username
  const username = userFullName.trim();

  // Mock password
  // Set a fake password by converting each username into a string of numbers in charCodeAt format.
  const password = '';
  username.split().map(letter => password.concat(letter.charCodeAt()));

  const email = `${username}.gmail.com`;

  const user = { name, username, password, email };

  // console.log(`New user ${name}`);
  return user;
}
*/



/**
 * Makes a fetch request to the createNewUser endpoint to make a new user and get user cookies
 *
 * @param {string} baseUrl - Url of endpoint. Example, if using localhost with port 8080, 'http://localhost:8080'.
 * @param {string} name - Name for user
 * @param {string} email - email for user
 * @param {string} username - username for user
 * @param {string} password - password for user
 * @returns user session cookie string
 * 
 * @throws Error if user already exists.
 * 
 * @public
 */
async function createNewUser(baseUrl, name, email, username, password) {
  // TODO validate inputs

  const response = await fetch(baseUrl + '/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ name, username, password, email }),
    credentials: "same-origin",
  });
  await validateResponse(response);

  return response.headers.raw()['set-cookie'][0];
}

/**
 * Make a fetch request to RecommendationTM to grab a user's feed.
 * 
 * @param {string} baseUrl - Url of endpoint. Example, if using localhost with port 8080, 'http://localhost:8080'.
 * @param {string} sessionCookie - raw session cookie string
 * @returns Server response object.
 * 
 * @public
 */
async function fetchFeed(baseUrl, sessionCookie) {
  // TODO validate inputs

  return await fetchJSONResponseBody(
    baseUrl + '/api/feed',
    'GET',
    sessionCookie
  );
}

/**
 * Make a fetch request to RecommendationTM to search for users.
 * 
 * @param {string} baseUrl - Url of endpoint. Example, if using localhost with port 8080, 'http://localhost:8080'.
 * @param {string} sessionCookie - raw session cookie string
 * @param {string} term - search parameter to match for users
 * @returns Server response object.
 * 
 * @public
 */
async function fetchSearch(baseUrl, sessionCookie, term) {
  // TODO validate inputs

  return await fetchJSONResponseBody(
    baseUrl + '/api/search/' + encodeURIComponent(term),
    'GET',
    sessionCookie
  );
}

/**
 * Make a fetch request at a particular url with a specific method and session cookie.
 * 
 * @param {string} url - url for fetch request 
 * @param {*} method - HTTP method to be used
 * @param {*} sessionCookie - raw session cookie string
 * @returns JSON parsed fetch response body
 * 
 * @private
 */
async function fetchJSONResponseBody(url, method, sessionCookie) {
  // Should send cookies with next fetch
  const response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'cookie': sessionCookie,
    },
    credentials: "same-origin",
  });
  return await validateResponse(response);
}

/**
 * Validate http response status.
 * 
 * @param {HttpResponse} response - HTTP response object
 * @throws Error if response is not status 200.
 * @returns response body after it has been json parsed.
 * 
 * @private
 */
async function validateResponse(response) {
  const body = await response.json();

  if (response.status === 401) throw new Error(body.error);
  if (response.status !== 200) throw new Error('Unknown server error, check log.');

  return body;
}

module.exports = {
  createNewUser,
  fetchFeed,
  fetchSearch,
};
