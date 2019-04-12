var inquirer = require("inquirer");
var mysql = require('mysql');

// MYSQL SETUP
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypass',
    database: 'bamazon'
});

connection.connect();

connection.query('SELECT * FROM bamazon.products;', function (error, results) {
    if (error) throw error;

    for (var i = 0; i < results.length; i++) {
        console.log(results[i].product_name);
    }


    connection.end();
});

