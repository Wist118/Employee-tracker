const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const displayEmployees = () => { 
    const sql = `SELECT *
    FROM employee
    INNER JOIN role
    ON employee.role_id = role.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        });
    };



module.exports = displayEmployees;