const db = require('./db/connection');
const inquirer = require('inquirer');
const displayEmployees = require('./routes/employeeRoutes');
// const {displayDepartments} = require('./routes/departmentRoutes.js');
// const {anotherRole} = require('./routes/roleRoutes');
// const displayEmployees = require('./routes/employeeRoutes');



const menuPrompt = async () => {
    try {
        let menuData = await inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Please choose from the following options.',
            choices: [
                'VIEW all departments', 
                'VIEW all roles', 
                'VIEW all employees', 
                'ADD a department', 
                'ADD a role', 
                'ADD an employee', 
                'UPDATE an employee role', 
                'I am all done'
            ]
        });
        switch (menuData.menu) {
            case 'VIEW all departments':
                displayDepartments();
            break;

            case 'VIEW all roles':
                displayRoles();
            break;

            case 'VIEW all employees':
                displayEmployees();
            break;

            case 'ADD a department':
                anotherDepartment();
            break;

            case 'ADD a role':
                anotherRole();
            break;

            case 'ADD an employee':
                //function for adding employee
            break;

            case 'UPDATE an employee role':
                //function for updating an employee role
            break;

            case 'I am all done':
                console.log('If you would like to start the application again use "npm start". Goodbye!')
                db.end();
            break;
        }
    } catch (err) {
        console.log(err);
        menuPrompt();
    };
}

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

menuPrompt();

// Query functions for "department" table

// function to query all from the department table and display it in a table format
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

// function to query an additional department to be added to the department table 
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



// Query functions for "role" table

// function to query all from the role table with the department that the role belongs to and display it in a table format 
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

// query function to add a new role to the role table
const anotherRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What salary does this role have?'
        }
    ])
    .then(userData => {
        let responses = [userData.name, userData.salary];

        db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            const departmentList = rows.map(({ department_name, id }) => ({ name: department_name, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department does this role belong to?',
                    choices: departmentList
                }
            ])
            .then(userData => {
                let departmentChoice = userData.department;
                responses.push(departmentChoice);

                let sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?,?,?)`

                db.promise().query(sql, responses);
                console.log('Added ' + `${responses[0]}` + ' to the database');
                menuPrompt();
            })
        })
    })     
}



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
        menuPrompt();
    })
};

// function empUpRole() {
//     db.query("SELECT * FROM employee", (err, res) => {
//         if (err) throw err;
//         let values = [res];
//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Which employee's role would you like to update?",
//                 name: "whichemp",
//                 choices: values
//             }
//         ]).then(employee => {
//             let empId = employee.whichemp.split(' ')[0];

//             db.query("SELECT * FROM role", (err, res) => {
//                 if (err) throw err;
//                 inquirer.prompt([
//                     {
//                         type: "list",
//                         message: "What is the employee's new role?",
//                         name: "newrole",
//                         choices: res.map(res => res.id + " " + res.title)
//                     }
//                 ]).then(newrole => {
//                     let roleId = newrole.newrole.split(' ')[0];
//                     console.log(empId, roleId)
//                     console.log(employee, newrole)
//                     console.log(newrole.id, employee.id)

//                     let query = db.query("UPDATE employee SET role_id = ? WHERE id = ?",
//                         [roleId, empId],
//                         (err, res) => {
//                             if (err) throw err;
//                         }
//                     );
//                     start();
//                 });
//             });
//         });
//     });
// };
// module.exports = menuPrompt;
