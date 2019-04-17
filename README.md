# Bamazon

A simple node.js based marketplace. Shop as a customer or monitor inventory as a manager.

### Prerequisites

- Node.js

## NPM Packages

- MySQL
- Inquirer
- Console.table

### Installing

It's as simple as `npm i`. All dependencies are ready in the `package.json`.

## Customer and Manager

With Bamazon, there are two seperate applications. One for a customer to search the database and make purchases, one for a manager to monitor and add to each item's stock quantity and add new items.

## Bamazon in Action

Customer succesfully purchasing an item by choosing it's ID and entering the desired quantity.

![checkout_success](https://user-images.githubusercontent.com/35508654/56305130-3c8b3e80-6105-11e9-8fa4-b3125ff1f996.gif)

If there is not enough stock, Bamazon will let you know.

![checkout_failure](https://user-images.githubusercontent.com/35508654/56305458-f682aa80-6105-11e9-8ead-522ed7104a30.gif)

As a manager, you can narrow down the database to show items below your specified threshold.

![low_stock](https://user-images.githubusercontent.com/35508654/56310440-7cf0b980-6111-11e9-92ef-9975b050c727.gif)

When stock is low, add more!

![add_stock](https://user-images.githubusercontent.com/35508654/56310439-7cf0b980-6111-11e9-8800-04ae649d58b2.gif)

Want to change it up? Add a new product to the store.

![add_item](https://user-images.githubusercontent.com/35508654/56310438-7cf0b980-6111-11e9-8a4e-3d85c6c6c608.gif)

