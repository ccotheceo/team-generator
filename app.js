const fs = require('fs');
const inquirer = require('inquirer');

// Employee template based on these below.
const Engineer = require("./workers/Engineer");
const Intern = require("./workers/Intern");
const Manager = require("./workers/Manager");


const teamMembers = [];
let manager;
let teamTitle;


// Ask user for the manager and/or project info.


function managerData() {
    inquirer.prompt([
        {  
            type: "input",
            message: "Please input the name of this team and/or project?",
            name: "teamTitle"
        },
        {  
            type: "input",
            message: "Who's the manager of this team and/or project?",
            name: "managerName"
        },
        { 
            type: "input",
            message: "Please input Manager's ID",
            name: "managerID"
        },
        {   // Employee Email.
            type: "input",
            message: "Please input manager's email",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Please input manager's office number",
            name: "officeNumber"
        }]).then(managerAnswers => {
            manager = new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.officeNumber);
            teamTitle = managerAnswers.teamTitle;
            console.log("Please have employee information ready")
            lesserEmployeeData();
        });
}

// if more employees added repeat

function lesserEmployeeData() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },

     
        // employeeRole info

        {
            type: "input",
            message: "Name of employee ",
            name: "employeeName"
        },
        {
            type: "input",
            message: "ID of employee",
            name: "employeeId"
        },
        {
            type: "input",
            message: "Email of employee",
            name: "employeeEmail"
        },
        {
            type: "input",
            message: "Github of Engineer",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "Intern's School",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {

            type: "confirm",
            name: "newEmployee",
            message: "Add another team member?" 
        }
    ]).then(answers => {
        

        // team members (array) adds new intern 
       
        if (answers.employeeRole === "Intern") {
            const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            teamMembers.push(employee);
        } else if (answers.employeeRole === "Engineer") {
            teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
        }
        if (answers.newEmployee === true) {
            lesserEmployeeData();
        } else {
            


            //renderHTML
        

            var main = fs.readFileSync('./layout/Employee.html', 'utf8');
           

            main = main.replace(/{{teamTitle}}/g, teamTitle);

            // Loops through employees and prints their cards
            var managerCard = fs.readFileSync('./layout/Manager.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', manager.getName());
            managerCard = managerCard.replace('{{role}}', manager.getRole());
            managerCard = managerCard.replace('{{id}}', manager.getId());
            managerCard = managerCard.replace('{{email}}', manager.getEmail());
            managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNumber());


            // After manager append team members 

            var cards = managerCard; 
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                cards += renderEmployee(employee);
            }

            // Outputs to team.html.
            // Cards to main.html
            
            main = main.replace('{{cards}}', cards);

            fs.writeFileSync('./output/team.html', main);

        }
    });
}

// renderEmployee function that is called above.

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./layout/Intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./layout/Engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerData();