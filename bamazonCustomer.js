var mysql = require("mysql");

var inquirer = require("inquirer");

var fs = require("fs");

//creating the connection to the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "apple2010",
  database: "bamazon_DB"
});
//creating the connection to mysql server & sql database
connection.connect(function(err) {
  if (err) throw err;
  // start();
  console.log("Connection Made");
});

//Area to add tables
var Table = require("cli-table");

var shop =
          "**********************************************************************\n" +
          "                          HEllO & WELCOME                              \n" +
          "**********************************************************************\n\r";

var orderComplete =
          "**********************************************************************\n" +
          "    **********              GOODBYE & ENJOY!                     **********\n" +
          "    **********************************************************************\n\r";

//Display product table for sale
function displayProducts() {
  console.log(shop);

  connection.query("SELECT * FROM  products", function(err, res) {
    if (err) throw err;

    console.log("SHOP");

    var table = new Table({
      chars: {
        top: "═",
        "top-mid": "╤",
        "top-left": "╔",
        "top-right": "╗",
        bottom: "═",
        "bottom-mid": "╧",
        "bottom-left": "╚",
        "bottom-right": "╝",
        left: "║",
        "left-mid": "╟",
        mid: "─",
        "mid-mid": "┼",
        right: "║",
        "right-mid": "╢",
        middle: "│"
      }
    });
//Product Table includes column item id, product name, department name, price, & stock quantity
    table.push(
      ["LVBag", "MyXL", "830.00", "35"],
      ["YSLBag", "YSL", "1030.00", "30"],
      ["CDoirBag", "Dior", "590.00", "25"],
      ["ChloeBag", "Chloe", "1950.00", "20"],
      ["TomFordBag", "TFord", "2459.00", "15"],
      ["FendiBag", "Fendi", "2300.00", "10"],
      ["PradaBag", "Prada", "2256.00", "5"],
      ["ChanelBag", "Chanel", "2250.00", "5"],
      ["GucciBag", "Gucci", "1950.00", "10"],
      ["GivenchyBag","GVChy", "2050.00", "15"]
    );
    {
      console.log(table.toString());
      orderMenu();
    }
  });
}
//User orders an item, what is the item id, how many items to purchase
//Once order placed system to check stock of quantity being purchased
//Enough stock to purchase, fullfill customer order
//Update stock quantity on product table
//System to display total cost of purchase

function orderMenu() {
  inquirer
    .prompt([
//What the user would like to order (rename the name field)
      {
        type: "input",
        name: "handBag",
        message: "What would you like to order?"
      },
//User choices to select
      {
        type: "list",
        name: "handBag",
        message: "What handbag would you like to order?",
        choices: ["LVBag!", "YSLBag", "CDiorBag", "ChloeBag", "TomFordBag", "FendiBag", "PradaBag", "ChanelBag", "GucciBag", "GivenchyBag"]
      },
//User checks their selection
      {
        type: "checkbox",
        name: "selectBag",
        message: "Select another item :-) ?",
        choices: ["PradaBag", "ChanelBag", "GucciBag"]
      },
//User completes the order 
      {
        type: "confirm",
        name: "completeOrder",
        message: "Does the complete your order?",
        choices: ["Yes", "No"]
      },
//User confirms order 
      {
        type: "confirm",
        name: "myTotal",
        message: "Order completed."
      }
    ])
    .then(function(user) {
// If the user completes order
      if (user.myTotal === "myOrder") {
        console.log("==============================================");
        console.log("");
        console.log("Great chioce " + user.name);
        console.log("Complete order.");
        console.log(
          "Just put down the " +
            user.selectBag.join(" and ") +
            ". Thank you for your order!"
        );
        console.log("");
        console.log("==============================================");
      }

      // If the user doesn't complete order ...
      else {
        console.log("==============================================");
        console.log("");
        console.log("ORDER COMPLETE...Thank you!");
        console.log("");
        console.log("==============================================");
      }
    });
}
displayProducts();