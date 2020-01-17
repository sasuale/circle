const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("Base de dados conectada com sucesso!");
    }else{
        console.log("Falha ao conectar a base de dados!\n Erro : "+JSON.stringify(err, undefined, 2));
    }
});

module.exports = mysqlConnection;