var express = require('express');

const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db');

//SIGNUP
router.post('/signup', (req, res, next) => {
  var userid = '';
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  try {
    sqlQuery = `INSERT INTO authentication_tb(username,email,password) 
        VALUES ("${username}","${email}","${password}")`;

    dbConn.query(sqlQuery, function (error, results) {
      userid = results.Insertid;
      res.status(200).json({
        success: true,
        msg: 'Account Creation Successful',
        userid: userid,
      });
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

//LOGIN
router.get('/login', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var userToken = '';

  try {
    sqlQuery = `SELECT id,username,email FROM authentication_tb
       WHERE email="${email}" AND password="${password}"`;

    dbConn.query(sqlQuery, function (error, results) {
      if (results.length > 0) {
        userToken = jwt.sign({ data: results }, process.env.TOKEN_SECRET, {
          expiresIn: '1h',
        });

        res.status(200).json({
          msg: 'Login Successful',
          usertoken: userToken,
        });
      } else {
        res.status(200).json({
          msg: 'Invalid username/password',
          userid: '',
        });
      }
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;