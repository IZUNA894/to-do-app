// this is root file of to do happens
// this file creates server
// sets multiware
// sets jade as view engine
var express=require('express');
var app=express();
var todocontroller=require('./todocontroller.js');
todocontroller(app);
app.set('view engine','ejs');
app.use('/assets' , express.static('./assets'));
var port = process.env.PORT || 3000
app.listen(port,()=>console.log("listening on port ",port));
