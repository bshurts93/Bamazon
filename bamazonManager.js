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

connection.connect();

// INQUIRER PROMPTS

function menu() {
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
                setTimeout(menu, 1000);
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
                addToInventory();
                break;
            case "Add new product":
                console.log("I CHOSE 4");
                break;
        }
    });
}


function addToInventoryPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "ID of stock to increase:",
            name: "stockID"
        },
        {
            type: "input",
            message: "How many would you like to add to the current stock?",
            name: "amount"
        }
    ]).then(function (response) {
        var id = response.stockID;
        var amount = response.amount;

        connection.query("UPDATE products SET stock_quantity = stock_quantity + " + amount + " WHERE item_id = " + id + ";", function (error, results) {
            if (error) { throw err };
        });
        connection.query("SELECT * FROM products WHERE item_id = " + id + ";", function (error, results) {
            console.log("\r\n");
            console.log("The new stock of '" + results[0].product_name + "' is now " + results[0].stock_quantity + ".");
            console.log("\r\n\r\n");
            setTimeout(menu, 1000);
        });
    });
}

// MySQL FUNCTIONS

function seeItems() {

    connection.query('SELECT item_id AS ID, product_name AS Product, department_name AS Department, price AS Price, stock_quantity AS Stock FROM bamazon.products;', function (error, results) {
        if (error) { throw error };

        console.log("\r\n\r\n");
        console.table("Available Items", results);
    });
}

function seeLowInventory(num) {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity < " + num + ";", function (error, results) {
        console.table("Low Stock - these items have a stock of less than " + num, results);

        setTimeout(menu, 1000);
    });
}

function addToInventory() {
    console.log("\r\n\r\n");
    seeItems();
    setTimeout(addToInventoryPrompt, 1000);
}

menu();