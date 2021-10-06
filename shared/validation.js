/**
 * Utilities to validate user input.
 */

function isValidName(name) {
  return name.match(/^((?!\d)[\w .]\1)*$/i);
}

function isValidUsername(username) {
  return username.match(/^[A-Z0-9]+$/i);
}

function isValidEmail(email) {
  return email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i);
}

function isValidPassword(password) {
  // should contain at least one upper case
  // should contain at least one lower case
  // should contain at least one digit
  // Must be at least 6 characters in length
  return password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9]).{6,}$/i);
}

module.exports = { isValidName, isValidEmail, isValidPassword, isValidUsername };
