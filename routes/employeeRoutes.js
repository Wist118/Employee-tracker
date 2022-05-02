const express = require('express');
const db = require('../db/connection');
const menuPrompt = require('../server');

const displayEmployees = () => { 
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary
    FROM employee
    INNER JOIN role ON employee.role_id=role.id
    INNER JOIN department ON role.department_id=department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
    })
};

const anotherEmployee = () => {

    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What role does this employee have? (Please select the role id from the table above)'
        }
    ])
    .then(employeeData => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?,?,?)`;
        const params = [employeeData.firstName, employeeData.lastName, employeeData.role]

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Added ' + employeeData.firstName + employeeData.lastName + ' to the database');
        })
    })
    .then(menuPrompt)
};

const updateEmployee = () =>{
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Please select an employee to update.',
                choices: ''
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is their new role?',
                choices: ''
            }
        ])
}



module.exports = displayEmployees;