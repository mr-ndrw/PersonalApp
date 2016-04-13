var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var connectionDetails = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bulls'
};

//connection.query("select * from person", function(err, rows){
//  if(err) throw err;
//
//  rows.forEach(function(row) {
//    console.log(row);
//  });
//});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
  var connection = mysql.createConnection(connectionDetails);
  var query = 'SELECT * FROM Person';
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    res.json(rows);
  });
  connection.end();
});

router.put('/userlist', function (req, res) {
  if(!req.body){
    return res.send('400');
  }
  console.log('Received request with following body: ' + req.body);
  console.log('End of request');
  var connection = mysql.createConnection(connectionDetails);
  var query = 'INSERT INTO Person(name, surname) VALUES(\'' +req.body.name+'\', \'' + req.body.surname + '\')';

  console.log('Running query: ' + query);

  connection.query(query, function(err, result){
    if (err) throw err;
    console.log('Added new person with id ' + result.insertId);
    connection.end();
  });
});

module.exports = router;
