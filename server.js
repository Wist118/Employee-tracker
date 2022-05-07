// required packages
const inquirer = require('inquirer');

// database connection
const db = require('./db/connection');

// initial prompt for user
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
                anotherEmployee();
            break;

            case 'UPDATE an employee role':
                updateEmployee();
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
};

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

menuPrompt();

// Query functions for "department" table

// function to query all from the department table and display it in a table format
const displayDepartments = () => { 
    const sql = `SELECT department.department_name AS Department,
    department.id
    FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        menuPrompt();
    });
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
    .then(displayDepartments);
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
                displayRoles();
            });
        });
    });
};


// Query functions for "employee" table
// function to show all employees
const displayEmployees = () => { 
    const sql = `SELECT employee.id AS ID,
    CONCAT (employee.last_name,', ',employee.first_name) AS Employee,
    role.title AS Position,
    department.department_name AS Department,
    role.salary AS Salary,
    CONCAT (manager.last_name,', ',manager.first_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.last_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        menuPrompt();
    });
};

// function to add an employee
const anotherEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the new employee?'
        }
    ])
    .then(userData => {
        let responses = [userData.firstName, userData.lastName];

        db.promise().query(`SELECT * FROM role`)
        .then(([rows]) => {
            const roleList = rows.map(({ title, id}) => ({name: title, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What role does this employee have?',
                    choices: roleList
                }
            ])
            .then(userData => {
                let roleChoice = userData.role;
                responses.push(roleChoice);

                db.promise().query(`SELECT * FROM employee WHERE employee.manager_id IS null`)
                .then(([rows]) => {
                    const managerList = rows.map(({ first_name, last_name, id,}) => ({name: first_name + ' ' + last_name, value: id}));

                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'confirmManager',
                            message: 'Does this employee have a manager?',
                            default: false
                        },
                        {
                            type: 'list',
                            name: 'managerSelect',
                            message: 'Which manager does this employee report to?',
                            choices: managerList,
                            when: ({ confirmManager }) => confirmManager
                        }
                    ])
                    .then(userData => {
                        if (!userData.managerSelect) {
    
                            let sql = `INSERT INTO employee (first_name, last_name, role_id)
                                        VALUES (?,?,?)`
    
                            db.promise().query(sql, responses);
                            console.log('Added ' + `${responses[0]}` + ' to the database');
                            menuPrompt();
                        }
                        else {
                            let managerChoice = userData.managerSelect;
                            responses.push(managerChoice);

                            let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?,?,?,?)`
                            
                            db.promise().query(sql, responses);
                            console.log('Added ' + `${responses[0]}` + ' ' + `${responses[1]}` + ' to the database');
                            displayEmployees();
                        };
                    });
                });
            });
        });
    });
};

// function to update an employee role
const updateEmployee = () => {

    db.promise().query(`SELECT * FROM employee`)
    .then(([rows]) => {
        const employeeList = rows.map(({first_name, last_name, id}) => ({name: first_name + last_name, value: id}));

        inquirer.prompt([
            {
                type: 'list',
                name: 'employees',
                message: 'Choose an employee to update their role',
                choices: employeeList
            }
        ])
        .then(userData => {
            let responses = [userData.employees];

            db.promise().query(`SELECT * FROM role`)
            .then(([rows]) => {
                const roleList = rows.map(({ title, id }) => ({name: title, value: id}));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please select a role to update chosen employee.',
                        choices: roleList
                    }
                ])
                .then(userData => {
                    let roleChoice = userData.role;
                    responses.unshift(roleChoice);

                    let sql = `UPDATE employee SET role_id = ? WHERE id = ?`

                    db.promise().query(sql, responses);
                    console.log('Updated the employee with the new role')
                    displayEmployees();
                });
            });
        });
    });
};