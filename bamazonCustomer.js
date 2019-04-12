var inquirer = require("inquirer");
var mysql = require('mysql');

var cliBr = "---------------------------------------------------------------";

// MYSQL SETUP
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypass',
    database: 'bamazon'
});

// MYSQL FUNCTIONS
function seeItems() {
    connection.connect();

    connection.query('SELECT * FROM bamazon.products;', function (error, results) {
        if (error) throw error;


        for (var i = 0; i < results.length; i++) {
            var item = results[i];
            console.log(cliBr);
            console.log(item.item_id + "   |   " + item.product_name + "   |   " + item.price);
        }
        console.log(cliBr);
        chooseItem();
    });


}

function getItemByID(id) {
    connection.query("SELECT * FROM bamazon.products WHERE item_id =" + id + ";", function (error, results) {
        name = results[0].product_name;

        console.log(name);
    });
}

function checkStock(id) {
    connection.query("SELECT product_name, stock_quantity FROM bamazon.products WHERE item_id =" + id + ";", function (error, results) {
        name = results[0].product_name;
        stock = results[0].stock_quantity;

        console.log(name + " current stock: " + stock);
    });
}


// INQUIRER PROMPTS
function chooseItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "chosenID",
            message: "Please provide the ID of the item you would like to purchase:",
            // DOES NOT WORK, FIX LATER
            // validate: function (input) {
            //     if (typeof parseFloat(input) === "number") {
            //         return true;
            //     } else {
            //         console.log("\r\n Please provide a valid ID number");
            //     }
            // }
        }
    ]).then(function (res) {
        howMany(res.chosenID);
    });
}

function howMany() {
    inquirer.prompt([
        {
            type: "input",
            name: "amount",
            message: "How many would you like to buy?"
        }
    ]).then(function (res) {
        // getItemByID()
        console.log(res.amount + " added to your cart.");
    });
}

// seeItems();

checkStock(4);
