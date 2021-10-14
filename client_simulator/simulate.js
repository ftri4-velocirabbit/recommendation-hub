

// Create a server that will hit all endpoints of the App.
// Needs:
// send in an appropriate test body in a fetch request
// hit all endpoints in a random or psuedorandom (based on what we expect to be hit) schedule

function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function () {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true }
    }
  };
  return rangeIterator;
}

const it1 = makeRangeIterator(0, 5, 1);
const it2 = makeRangeIterator(0, 5, 1);





/**
 * Create a somewhat random user object
 * 
 */
function createNewUserObject(iter1, iter2) {

  // Use the iterator funciton to loop through usersFirstName and usersLastName to create unique user combinations


  const usersFirstName = ['Sarah', 'Amanda', 'Taylor', 'Jacob', 'Sam', 'Greg', 'Jacquiline', 'Jeffery', 'Beyonce', 'Will', 'Angelina', 'Kim', 'Chris', 'Johnny', 'James'];
  const usersLastName = ['Barkley', 'Jordan', 'Smith', 'Knowles', 'Bond', 'Henricks', 'Davis'];

  // Choose a firstName and last name
  console.log('iter1: ', iter1);
  const firstName = usersFirstName[iter1];

  console.log('iter2: ', iter2);
  const lastName = usersLastName[iter2];
  const name = firstName + ' ' + lastName;

  // Mock username
  const username = name.trim();

  // Mock password
  // Set a fake password by converting each username into a string of numbers in charCodeAt format.
  const password = '';
  username.split().map(letter => password.concat(letter.charCodeAt()));

  const email = `${username}.someMail.com`;

  const user = { name, username, password, email };

  // console.log(`New user ${name}`);

  return user;
}

console.log(createNewUserObject(it1, it2));


// /**
//  * Makes a fetch request to the createNewUser endpoint to make a new user and get user cookies
//  *
//  * @param {string} baseUrl - Url of endpoint. Example, if using localhost with port 8080, 'http://localhost:8080'.
//  * @param {string} name - Name for user
//  * @param {string} email - email for user
//  * @param {string} username - username for user
//  * @param {string} password - password for user
//  * @returns user session cookie string
//  * 
//  * @throws Error if user already exists.
//  * 
//  * @public
//  */
// async function createNewUser(baseUrl, name, email, username, password) {
//   // TODO validate inputs

//   const response = await fetch(baseUrl + '/api/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({ name, username, password, email }),
//     credentials: "same-origin",
//   });
//   await validateResponse(response);

//   return response.headers.raw()['set-cookie'][0];
// }


//   // do the work, then
//   const response = await fetch();
//   const data = await response.json();
// // Get cookies for the newUser
// function add 

// // Make a new object for use in 
// function createNewUserThen() {


//   return fetch().then(response => response.json())
// }


// users.forEach(user => createNewUser(user.name, user...))


// // Mock Sign up users
// function createUserEndpoint() {


//   // ! need to add cookies
//   // const cookie

//   // { name, username, password, email }
//   const data = { name, username, password, email, cookie };



//   // Send information as a post request to:
//   fetch('/api/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('received createUserEndpoint data successfully: ', data);
//     })
//     .catch(error => {
//       console.error('Error: ', error);
//     })
// }

// // Mock login
// function loginEndpoint() {

//   // Select random user from createdUsers
//   const username = Object.keys(createdUsers)[Math.floor(Math.random() * createdUsers.keys().length)];
//   const password = createdUsers[username];
//   const data = { username, password };

//   // Fetch request to /login
//   fetch('/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Received loginEndpoint data successfully: ', data);
//     })
//     .catch(error => {
//       console.error('Error: ', error);
//     })
// }


// // Mock Hitting the feed
// function feedEndpoint(cookie) {
//   // api/feed/
//   /*
//     res.locals.feed = recommendations.map(rec => ({
//       id: rec.id,
//       title: rec.title,
//       body: rec.body,
//       rating: rec.rating,
//       category: rec.category,
//       date: rec.date,
//       owner: {
//         name: rec.name,
//         username: rec.username,
//       },
//     }));
//     return next();
//   */
// }


// Create some recs

// search some users


