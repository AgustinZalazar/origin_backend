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
           }
           if (result) {
               const userForToken = {
                   id: 1,
                   username: username
               }
               const token = jwt.sign(userForToken, '123')
               const id_user = result[0].id_user
                res.send({
                    username: username,
                    token,
                    id_user
                });
           }else {
               res.send({message: "Contraseña o usuario erronea"})
           }
       }
   )
})

app.get('/actionsByUser', (req, res) =>{
    const id_user = req.query.id_user;
    db.query(
        "SELECT * FROM acciones WHERE id_user = ? ",
        [id_user],
        (err, result) =>{
            if (err) {
                 res.send(err);
                 console.log(err)
            }
            if (result) {
                res.send(result);
            }
        }
    )
 })
 app.delete('/actionByUser', (req, res) =>{
    const id_acciones = req.query.id_acciones;
    db.query(
        "DELETE  FROM acciones WHERE id_acciones = ? ",
        [id_acciones],
        (err, result) =>{
            if (err) {
                 res.send(err);
                 console.log(err)
            }
            if (result) {
                res.send(result);
            }
        }
    )
 })
 app.post('/actionByUser', (req, res) =>{
    
    const nombre = req.body.nombre;
    const moneda = req.body.moneda;
    const simbolo = req.body.simbolo;
    const id_user = req.body.id_user;
    db.query(
        "INSERT INTO  acciones (nombre, simbolo,moneda,id_user) VALUES (?, ? , ? ,?)",
        [nombre,moneda,simbolo,id_user],
        (err, result) =>{
            if (err) {
                 res.send(err);
                 console.log(err)
            }
            if (result) {
                res.send(result);
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