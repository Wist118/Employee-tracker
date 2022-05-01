const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const {displayDepartments, anotherDepartment} = require('./routes/departmentRoutes.js');
const displayRoles = require('./routes/roleRoutes');
const displayEmployees = require('./routes/employeeRoutes');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use(routes);


// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });




const menuPrompt = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Please choose from the following options.',
                choices: ['View all departments', 'View all roles', 'View all employees', 'ADD a department', 'ADD a role', 'ADD an employee', 'UPDATE an employee role', 'I am all done'],
            }
        ])
    .then(menuData => {

        if (menuData.menu === 'View all departments') {
            displayDepartments();
        }
        else if (menuData.menu === 'View all roles') {
            displayRoles();
        }
        else if (menuData.menu === 'View all employees') {
            displayEmployees();
        }
        else if (menuData.menu === 'ADD a department') {
            anotherDepartment();
        }
    })
    
}




// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

menuPrompt();
