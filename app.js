const express = require('express')
const app = express();
const mysql = require("mysql");

app.use(express.urlencoded({extended:false}));
app.use(express.json);

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password: "root",
    database:"origin_users"
})


app.get('/', (req, res) =>{
   res.send('aasd')
})

app.listen(3001, (req, res) =>{
    console.log('server running in http://localhost:3001')
})