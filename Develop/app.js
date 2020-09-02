const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employeePath = path.join(OUTPUT_DIR, "employees.txt");


const render = require("./lib/htmlRenderer");

let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!) DONE!


mainFunction = () => {
inquirer
    .prompt([
        {
            name: "employee",
            message: "What kind of employee are you looking to create?",
            type: "list",
            choices: ["Engineer", "Intern", "Manager"]

        },
        {
            name: "name",
            message: "What is this employees name?"

        },
        {
            name: "id",
            message: "What is this employees id?"
        },

        {
            name: "email",
            message: "What is this employees email address?"
        }

    ]).then(answers => {
        const employeeAnswer = answers["employee"];
        const employeeName = answers["name"];
        const employeeID = answers["id"];
        const employeeEmail = answers["email"]

        switch (employeeAnswer) {
            case "Engineer":
                {
                    inquirer.prompt({
                        name: "github",
                        message: "What is this engineers github username?"
                    }).then(engineerAnswers => {
                        const github = engineerAnswers["github"];
                        employees.push(new Engineer(employeeName, employeeID, employeeEmail, github));
                        repeatPrompt();
                    })
                }
                break;
            case "Intern":
                {
                    inquirer.prompt({
                        name: "school",
                        message: "What is this interns current school or alma mater (for mulitple schools please seperate by comma)?"
                    }).then(internAnswers => {
                        const school = internAnswers["school"]
                        employees.push(new Intern(employeeName, employeeID, employeeEmail, school))
                        repeatPrompt();
                    })
                    
                }
                break;
            case "Manager":
                {
                    inquirer.prompt({
                        name: "officeNumber",
                        message: "What is this managers office number?"
                    }).then(managerAnswers => {
                        const officeNumber = managerAnswers["officeNumber"]
                        employees.push(new Manager(employeeName, employeeID, employeeEmail, officeNumber))
                        repeatPrompt();
                    })
                }
                break;
                
        }


    })

};

repeatPrompt = () => {
    inquirer
        .prompt({
            name: "prompt",
            message: "Would you like to create another employee?",
            type: "confirm"
        }).then(promptAnswers => {
            const promptAnswer = promptAnswers["prompt"];
            if(promptAnswer == true){
                mainFunction();
            } else {
            let html = render(employees);

            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
            }
           
            fs.writeFileSync(outputPath, html)
        } 
        })
}


mainFunction();

