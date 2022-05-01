const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const displayRoles = () => { 
    const sql = `SELECT *
    FROM role
    INNER JOIN department
    ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        });
    };



module.exports = displayRoles;