var mysql = require('mysql');

var connection = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database: 'carps_on_the_go',
});


connection.connect(function(error){
if (!!error){
    console.log(error);
}else{
    console.log('MySQL Database connected Successfully')
}
});

module.exports = connection;