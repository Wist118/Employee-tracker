const db = require('./db/connection');
const inquirer = require('inquirer');
// const {displayDepartments} = require('./routes/departmentRoutes.js');
// const {anotherRole} = require('./routes/roleRoutes');
// const displayEmployees = require('./routes/employeeRoutes');



const menuPrompt = () => {
    return inquirer.prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Please choose from the following options.',
                choices: ['VIEW all departments', 'VIEW all roles', 'VIEW all employees', 'ADD a department', 'ADD a role', 'ADD an employee', 'UPDATE an employee role', 'I am all done'],
            }
        ])
    .then(menuData => {

        if (menuData.menu === 'VIEW all departments') {
            displayDepartments();
        }
        else if (menuData.menu === 'VIEW all roles') {
            displayRoles();
        }
        else if (menuData.menu === 'VIEW all employees') {
            displayEmployees();
        }
        else if (menuData.menu === 'ADD a department') {
            anotherDepartment();
        }
        else if (menuData.menu === 'ADD a role') {
            anotherRole();
        }
        else if (menuData.menu === 'ADD an employee') {
            // function for adding an employee
        }
        else if (menuData.menu === 'UPDATE an employee role') {
            // function for updating an employee role
        }
        else {
            console.log('If you would like to start the application again use "npm start". Goodbye!');
            return process.exit();
        }
    })
    
}




// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

menuPrompt();


const displayDepartments = () => { 
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        menuPrompt();
    })
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

        db.promise().query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            
        })
        console.log('Added ' + departmentData.name + ' to the database');
    })
    .then(menuPrompt);
};




const displayRoles = () => { 
    const sql = `SELECT role.id, role.title, department.department_name, role.salary
    FROM role
    INNER JOIN department
    ON role.department_id=department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        menuPrompt();
    });
};

const anotherRole = () => {

    const sql = `SELECT * FROM department`; 

    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What salary does this role have?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does this role belong to?',
            choices: db.query(sql) => {
                return {
                    name: departmentName.department_name,
                    value: departmentName.id
                }
            })
        }
    ])
    .then(roleData => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`;
        const params = [roleData.name, roleData.salary, roleData.department]

        db.promise().query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
        })
        console.log('Added ' + roleData.name + ' to the database');
    })
    .then(menuPrompt)
};

module.exports = menuPrompt;
