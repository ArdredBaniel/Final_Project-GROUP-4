const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
var dbConn = require('../../config/db');

//Routes
//INSERT
router.post('/add', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(200).json({ success: false, msg: 'Error, Token was not found' });
       }

  const decodeToken=jwt.verify(token,process.env.TOKEN_SECRET);

  console.log(dedcodedToken.data['email']);

  var Transaction_No = req.body.Transaction_No;
  var id = req.body.id;

  sqlQuery = `INSERT INTO transaction_tb(Transaction_Number, Carpenter_ID) 
  VALUES(${Transaction_No},"${id}")`;

  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// VIEW
router.get('/view', (req, res) => {
  const token = req.headers.authorization.split('')[1];
  if (!token){
    res.status(200).json({success: false,
    msg: 'Error, Token not found',
  });
}

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

  sqlQuery = `SELECT * FROM transaction_tb`;
  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// UPDATE
router.patch('/update/:Carpenter_ID',(req, res) => {

  const token = req.headers.authorization.split('')[1];
  if (!token){
    res.status(200).json({
      success: false,
      msg: 'Error, Token not found',
      });
  }              
  
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

  console.log('API CONNECTION SUCCESS!');
  const Transaction_Number = req.params.Transaction_Number;
  dbConn.query(`SELECT Carpenter_ID FROM transaction_tb WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
      if(error) throw error;
      else if (!results.length) {
          console.log("Unknown ID")
          res.status(400).json("Unknown ID");
          return;
      }
      else{
        var Transaction_Number = req.body.Transaction_Number; 
        var Carpenter_ID = req.body.Carpenter_ID; 
        dbConn.query(`UPDATE transaction_tb SET Transaction_Number = ${Transaction_No}, Carpenter_ID = "${id}" WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
            console.log("Data Updated");
            if (error) return;
            res.status(200).json(results);
        });
      }
    });
});

// DELETE
router.delete('/delete/:Carpenter_ID', (req,res)=> {
  const token = req.headers.authorization.split('')[1];
  if (!token){
    res.status(200).json({
      success: false,
      msg: 'Error, Token not found',
    })
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log('API CONNECTION SUCCESS');
  const Transaction_Number = req.params.Transaction_Number;
  dbConn.query(`SELECT Carpenter_ID from transaction_tb WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
      if (error) throw error;

      else if (!results.length) {
        console.log("ID does not exist")
        res.status(300).json("ID does not exist");
        return;
      }
      else{
        dbConn.query(`DELETE from transaction_tb WHERE Carpenter_ID = ${Carpenter_ID}`, function(error,results, fields){
            console.log("Data DELETED");
            if (error) return;
            res.status(300).json(results);
        });
      }
    });
});



module.exports = router;