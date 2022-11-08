const express = require ('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
var dbConn =require ('../../config/db');

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


    var name = req.body.name; 
    var contactno = req.body.contactno; 
    var address = req.body.address; 

    sqlQuery = `INSERT INTO customer_tb(Customer_Name, Customer_ContactNo, Customer_Address) VALUES("${name}","${contactno}","${address}")`; 

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error)throw error;
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

    sqlQuery = `SELECT * FROM customer_tb`;
    
    dbConn.query(sqlQuery, function( error, results, fields ){ 
    if (error) throw error;
    res.status(200).json(results);
    });  
});
//UPDATE
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
  dbConn.query(`SELECT Customer_ID FROM customer_tb WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
      if (error) throw error;
      else if(!results.length){
          console.log('Unknown Id')
          res.status(300).json('Unknown Id');
      } else{
          var name= req.body.name;
          var contactno = req.body.contactno;
          var address = req.body.address;

          dbConn.query(`UPDATE customer_tb SET Customer_Name = "${name}", Customer_ContactNo = "${contactno}", Customer_Address = "${address}" WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
              console.log("Data Updated");
              if (error) return;
              res.status(200).json(results);
          });
      }
  });
});

//DELETE
router.delete('/delete/:Customer_ID', (req,res)=> {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    console.log('API Running');
    const Customer_ID = req.params.Customer_ID;
    dbConn.query(`SELECT Customer_ID from customer_tb WHERE Customer_ID = ${Customer_ID}`, function(error, results, fields){
        if (error) throw error;
        
        else if (!results.length) {
            console.log("ID does not exist")
            res.status(300).json("ID does not exist");
            return;
        }
        else{
            dbConn.query(`DELETE from customer_tb WHERE Customer_ID = ${Customer_ID}`, function(error,results, fields){
                console.log("Data DELETED");
                if (error) return;
                res.status(300).json(results);
            });
        }
    });
});
module.exports = router;
