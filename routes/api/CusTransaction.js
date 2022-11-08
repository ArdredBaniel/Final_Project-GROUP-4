const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
var dbConn = require('../../config/db');

//Routes
//INSERT
router.post('/add', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
     res.status(200).json({ success: false, msg: 'Error, Token was not found' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log(decodedToken.data['email']);

    var userEmail = decodedToken.data['email'];

    var Number= req.body.Number;
    var id = req.body.id;
    var date = req.body.date;
    var Specialization =req.body.Specialization;

    sqlQuery = `INSERT INTO CustomerTransaction(Transaction_Number, Customer_ID, Transaction_Date) 
    VALUES ("${Number}", "${id}", "${date}")`;
    dbConn.query(sqlQuery, function(error,results,fields){
        if(error) throw error;
        res.status(200).json(results);
    });
});
//VIEW
router.get('/view', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    sqlQuery = `SELECT * FROM CustomerTransaction`;
    
    dbConn.query(sqlQuery, function( error, results, fields ){ 
    if (error) throw error;
    res.status(200).json(results);
    });  
});

//UPDATE
//@route PATCH api/carpenter/update
router.patch('/update/:Customer_ID', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);


    console.log('API CONNECTION SUCCESS');
    const Customer_ID = req.params.Customer_ID;
    dbConn.query(`SELECT Customer_ID FROM CustomerTransaction WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
        if (error) throw error;
        else if(!results.length){
            console.log('Unknown Id')
            res.status(300).json('Unknown Id');
        } else{
            var Number= req.body.Number;
            var date = req.body.date;
        
            dbConn.query(`UPDATE CustomerTransaction SET Transaction_Number = '${Number}', Transaction_Date = "${date}" WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
                console.log("Data Updated");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
});

//DELETE
//@route DELETE api/carpenter/delete
router.delete('/delete/:Customer_ID', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);


    console.log('API CONNECTION SUCCESS');
    const Customer_ID = req.params.Customer_ID;
    dbConn.query(`SELECT Customer_ID FROM CustomerTransaction WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
        if (error) throw error;
        else if(!results.length){
            console.log('Unknown Id')
            res.status(300).json('Unknown Id');
        } else{
            dbConn.query(`DELETE FROM CustomerTransaction WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
                console.log("Data Deleted");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
})


module.exports = router;
