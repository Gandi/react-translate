/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint func-names: 0 */
/* eslint no-throw-literal: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-prototype-builtins: 0 */

const fs = require('fs');
const colors = require('colors');

// Logging functions.
const log = msg => process.stdout.write(`${msg}\n`);
const success = msg => process.stdout.write(`${colors.green(msg)}\n`);
const warn = msg => process.stdout.write(colors.yellow(`Warning: ${msg}\n`));
const error = msg => process.stdout.write(colors.red(`Error: ${msg}\n`));


function sortObject(obj) {
  var temp = {};
  var keys = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  keys.sort();
  for (var index in keys) {
    if (keys.hasOwnProperty(index)) {
      temp[keys[index]] = obj[keys[index]];
    }
  }
  return temp;
}

var fileExistSync = function existsSync(filePath) {
  try {
    fs.statSync(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
  return true;
};

module.exports = {
  log,
  success,
  warn,
  error,
  sortObject,
  fileExistSync,
};
