const mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/respuestas');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}
let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('Error DB', err);
            /*setTimeout(() => {
                
            }, timeout);*/
        }else{
            console.log('success DB');
        }

    });
    conexion.on('error', err => {
        console.log(err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla){

    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    });
    //return test;

}

function uno(tabla, id){

    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function agregar(tabla, data){

    if(data && data.id == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }
}
function insertar(tabla, data){

    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO  ${tabla} SET ?`, data, (error, result) => {
            console.log(data);
            return error ? reject(error) : resolve(result);
           
        })
    });
}
function actualizar(tabla, data){

    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            console.log(data.id);
            return error ? reject(error) : resolve(result);
           
        })
    });
}

function eliminar(tabla, data){

    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) => {
            console.log(data.id);
            return error ? reject(error) : resolve(result);
           
        })
    });
}

module.exports = {
    todos, 
    uno,
    agregar,
    actualizar,
    eliminar
}