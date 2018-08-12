DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item INTEGER(10),
    product VARCHAR(100),
    department VARCHAR(100),
    price DECIMAL(7,3),
    stock DECIMAL(7,3),
    PRIMARY KEY(item)
);

INSERT INTO products (product, department, price, stock)
VALUES ('LVBag', 'MyXL', 830.00, 35);

INSERT INTO products ( product, department, price, stock)
VALUES ('YSLBag', 'YSL', 1030.00, 30);

INSERT INTO products ( product, department, price, stock)
VALUES ('CDiorBag', 'Dior', 590.00, 25);

INSERT INTO products ( product, department, price, stock)
VALUES ('ChloeBag', 'Chloe', 1950.00, 20);

INSERT INTO products ( product, department, price, stock)
VALUES ('TomFordBag', 'TFord', 2459.00, 15);

INSERT INTO products ( product, department, price, stock)
VALUES ('FendiBag', 'Fendi', 2300.00, 10);

INSERT INTO products ( product, department, price, stock)
VALUES ('PradaBag', 'Prada', 2256.00, 5);

INSERT INTO products ( product, department, price, stock)
VALUES ('ChanelBag', 'Chanel', 2250.00, 5);

INSERT INTO products ( product, department, price, stock)
VALUES ('GucciBag', 'Gucci', 1950.00, 10);

INSERT INTO products ( product, department, price, stock)
VALUES ('GivenchyBag', 'GVChy', 2050.00, 15);

SELECT * FROM products