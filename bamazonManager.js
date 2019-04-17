var inquirer = require("inquirer");
var mysql = require('mysql');
const cTable = require("console.table");

var cliBr = "---------------------------------------------------------------";

// MYSQL SETUP
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypass',
    database: 'bamazon'
});


// INQUIRER PROMPTS

inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"],
        name: "managerChoice"
    }
]).then(function (response) {
    choice = response.managerChoice;

    switch (choice) {
        case "View products for sale":
            seeItems();
            break;
        case "View low inventory":
            inquirer.prompt([
                {
                    type: "input",
                    message: "See items with a stock quantity below ___ :",
                    name: "threshold"
                }
            ]).then(function (response) {
                var threshold = response.threshold;
                console.log("\r\n\r\n");
                seeLowInventory(threshold);
            })
            break;
        case "Add to inventory":
            console.log("I CHOSE 3");
            break;
        case "Add new product":
            console.log("I CHOSE 4");
            break;
    }
});

// MySQL FUNCTIONS

function seeItems() {
    connection.connect();

    connection.query('SELECT item_id AS ID, product_name AS Product, department_name AS Department, price AS Price, stock_quantity AS Stock FROM bamazon.products;', function (error, results) {
        if (error) throw error;

        console.log("\r\n\r\n");
        console.table("Available Items", results);
    });
}

function seeLowInventory(num) {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity < " + num + ";", function (error, results) {
        console.table("Low Stock - these items have a stock of less than " + num, results);
    });
}