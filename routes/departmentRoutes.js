const express = require('express');
const db = require('../db/connection');
const inquirer = require('inquirer');

const displayDepartments = () => { 
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        });
};

const anotherDepartment = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department'
        }
    ])
    .then(departmentData => {
        const sql = `INSERT INTO department (department_name)
        VALUES (?)`;
        const params = departmentData.name

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Added ' + departmentData.name + ' to the database');
        })
    })
};




module.exports = { displayDepartments, anotherDepartment };