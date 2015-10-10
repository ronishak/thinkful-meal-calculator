// Global Settings
var TAXRATE = 0.1;
var RESTAURANT_NAME = "Super Duper";

// Food
var OrderItem = function(name, price, type){
  this.name = name;
  this.price = price;
  this.type = type;
};

// Person
var Person = function(name) {
  this.name = name;
  this.orders = [];
};

Person.prototype.order = function(item) {
  this.orders.push(item);
};

Person.prototype.listOrders = function() {
  var list = this.name + "'s Order: \n";
  for (var i = 0; i < this.orders.length; i++) {
    list += " " + this.orders[i].name + "\t\t" + this.orders[i].price + "\n";
  }
  return list;
};

Person.prototype.subTotal = function() {
  var theTotal = 0;
  for (var item in this.orders) {
    theTotal += this.orders[item].price;
  }
  return theTotal;
};

Person.prototype.tax = function() {
  return this.subTotal() * TAXRATE;
};

Person.prototype.total = function() {
  return this.subTotal() + this.tax();
};

// Table
var Table = function() {
  this.people = arguments;
};

Table.prototype.subTotal = function() {
  var subTotal = 0;
  for (var i = 0; i < this.people.length; i++) {
    subTotal += this.people[i].subTotal();
  }
  return subTotal;
};

Table.prototype.tax = function() {
  var tableTax = 0;
  for (var i = 0; i < this.people.length; i++) {
    tableTax += this.people[i].tax();
  }
  return tableTax;
};

Table.prototype.total = function() {
  var tableTotal = 0;
  for (var i = 0; i < this.people.length; i++) {
    tableTotal += this.people[i].total();
  }
  return tableTotal;
};

Table.prototype.print = function() {
  console.log('Welcome to ' + RESTAURANT_NAME);
  console.log('---------------------');
  for (var person in this.people) {
    console.log(this.people[person].listOrders());
  }
  console.log('---------------------');
  console.log('Subtotal: \t' + this.subTotal());
  console.log('Tax (10%): \t' + this.tax());
  console.log('Total: \t\t' + this.total());
  console.log('---------------------');
  for (var person in this.people) {
    console.log(this.people[person].name + " Pay: \t" + this.people[person].total());
  }
  console.log('---------------------');
  console.log('THANKS COME AGAIN!');
  console.log('---------------------');
  return;
};

// Create the stuff I can order
var pizza = new OrderItem('Pizza', 2.50, 'food');
var pepsi = new OrderItem('Pepsi', 2, 'drink');
var burger = new OrderItem('Burger', 4, 'food');
var hotdog = new OrderItem('Hotdog', 2, 'food');
var sprite = new OrderItem('Sprite', 2, 'drink');

// Create the People
var person1 = new Person('Andy');
person1.order(pepsi);
person1.order(pizza);

var person2 = new Person('Benson');
person2.order(sprite);
person2.order(hotdog);
person2.order(burger);

// Create the Table
var table1 = new Table(person1, person2);

// Print the Bill
table1.print();
