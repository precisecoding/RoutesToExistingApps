const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json')
  // .then(data) is storing content from readFromFile above and res.json is returning it and converting with JSON.parse(data) 
  .then(data => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  // {
  //   "time": 1616087317843,
  //   "error_id": "ca0616fa-f603-4d85-a9c6-fa62c73a9bf9",
  //   "errors": {
      // "tip:": "Tip must be at least 15 characters long",
      // "topic": "",
      // "username": " Username is too short"
  //   }
  // }
  const {isValid, errors} = req.body
  console.log(req.body)
  const payload = {
    time: Date.now(),
    error_id: uuidv4(),
    errors: errors 
  }
  if (!isValid) {
    readAndAppend(payload, "./db/diagnostics.json")
    res.json("diagnostic error added successfully")
  }
  else {
    res.json("Object is valid")
  }
  console.log(req.body)

});





module.exports = diagnostics;
