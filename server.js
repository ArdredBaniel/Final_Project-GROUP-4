const express = require("express");
require('dotenv').config();
const app = express();

const CauthRoutes = require('./routes/api/Cauth.js');
const carpRoutes = require('./routes/api/carpenter');
const cusRoutes = require('./routes/api/customer');
const CustranRoutes = require('./routes/api/CusTransaction');


app.use(express.json({ extended: false }));
app.get('/',(req,res)=>res.send('API Running'));

app.use('/cauth',CauthRoutes);
app.use('/carpenter', carpRoutes);
app.use('/customer', cusRoutes);
app.use('/CusTransaction', CustranRoutes);

const PORT = 5555;
app.listen(PORT,()=>console.log(`Server Started on PORT ${PORT}`));