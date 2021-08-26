const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const cors = require("cors");
const  db  = require('./database/db')


const app = express();
app.use(express.json());
app.use(cors());


app.post('/login', (req, res) =>{
   const username = req.body.username;
   const password = req.body.password;
   
   db.query(
       "SELECT * FROM users WHERE username = ? AND password = ?",
       [username, password],
       (err, result) =>{
           if (err) {
                res.send(err);
                console.log(err)
           }
           if (result) {
               const userForToken = {
                   id: 1,
                   username: username
               }
               const token = jwt.sign(userForToken, '123')
                res.send({
                    username: username,
                    token
                });
           }else {
               res.send({message: "Contraseña o usuario erronea"})
           }
       }
   )
})

app.get('/', (req, res) =>{
    res.send("test")
})

app.listen(8080, (req, res) =>{
    console.log('server running in http://localhost:8080')
})