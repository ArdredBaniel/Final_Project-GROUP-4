const express = require ('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

var dbConn =require ('../../config/db');

//INSERT
//@routes POST api/carpenter/add
router.post('/add', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
     res.status(200).json({ success: false, msg: 'Error, Token was not found' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log(decodedToken.data['email']);

    var userEmail = decodedToken.data['email'];

    var CarpName= req.body.CarpName;
    var ContactNo = req.body.ContactNo;
    var Address = req.body.Address;
    var Specialization =req.body.Specialization;

    sqlQuery = `INSERT INTO carpenter_tb(Carpenter_Name, Carpenter_ContactNo, Carpenter_Address, Carpenter_Specialization) 
    VALUES ("${CarpName}", "${ContactNo}", "${Address}", "${Specialization}")`;
    dbConn.query(sqlQuery, function(error,results,fields){
        if(error) throw error;
        res.status(200).json(results);
    });
});

//SELECT
//@routes GET api/carpenter/view
router.get('/view', (req, res)=>{

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    sqlQuery = 'SELECT * FROM carpenter_tb';
    dbConn.query(sqlQuery, function(error,results,fields){
        if(error) throw error;
        res.status(200).json(results);
    });
});

//UPDATE
//@route PATCH api/carpenter/update
router.patch('/update/:Carpenter_ID', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);


    console.log('API CONNECTION SUCCESS');
    const Carpenter_ID = req.params.Carpenter_ID;
    dbConn.query(`SELECT Carpenter_ID FROM carpenter_tb WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
        if (error) throw error;
        else if(!results.length){
            console.log('Unknown Id')
            res.status(300).json('Unknown Id');
        } else{
            var CarpName= req.body.CarpName;
            var ContactNo = req.body.ContactNo;
            var Address = req.body.Address;
            var Specialization =req.body.Specialization;

            dbConn.query(`UPDATE carpenter_tb SET Carpenter_Name = "${CarpName}", Carpenter_ContactNo = "${ContactNo}", Carpenter_Address = "${Address}", Carpenter_Specialization ="${Specialization}" WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
                console.log("Data Updated");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
});

//DELETE
//@route DELETE api/carpenter/delete
router.delete('/delete/:Carpenter_ID', (req,res)=>{

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(200).json({
        success: false,
        msg: 'Error, Token not found',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);


    console.log('API CONNECTION SUCCESS');
    const Carpenter_ID = req.params.Carpenter_ID;
    dbConn.query(`SELECT Carpenter_ID FROM carpenter_tb WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
        if (error) throw error;
        else if(!results.length){
            console.log('Unknown Id')
            res.status(300).json('Unknown Id');
        } else{
            dbConn.query(`DELETE FROM carpenter_tb WHERE Carpenter_ID = ${Carpenter_ID}`, function(error, results, fields){
                console.log("Data Deleted");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
})




module.exports=router;