const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employees = [];
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function newEmployee() {
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?",

    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?",

    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",

    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Engineer", "Intern", "Manager"]
    },
        
    {
        type: "input",
        name: "github",
        message: "What is your github username?",
        when: function(response) {
            return response.role === "Engineer"
        }
    },
    {
        type: "input",
        name: "school",
        message: "Which school do you attend?",
        when: function(response) {
            return response.role === "Intern"
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your Office Number?",
        when: function(response) {
            return response.role === "Manager"
        }

    },
    {
        type: "confirm",
        name: "another",
        message: "Do you want to create another employee record?",
    }
]).then(res => {
    switch (res.role) {
        case "Manager":
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
            employees.push(manager);
            break;
    
        case "Intern":
            const intern = new Intern(res.name, res.id, res.email, res.school);
            employees.push(intern);
            break;
    
        case "Engineer":
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            employees.push(engineer);
            break;
    
        default:
            break;
    }
    if (res.another) {
        newEmployee();   
    }else {
    const employeeData = render(employees);
    fs.writeFile("team.html", employeeData, function(err) {
        if(err) {
            console.log(err);
        }else {
            console.log("Success!");
        }
    })
    }
    
}
)
// .then(function (employees) {
//     fs.writeFile("team.html", employees, function(err) {
//         if(err) {
//             console.log("Error!");
//             console.log(err);
//         }else {
//             console.log("File created!");
//         }
//     })
// })

}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
newEmployee();
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
