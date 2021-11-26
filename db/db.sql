-- creating the database
CREATE DATABASE IF NOT EXISTS `crud-nodejs`;

-- using the database
-- use crud-nodejs;

-- creating a database
CREATE TABLE customers (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  address VARCHAR(100) NOT NULL,
  phone VARCHAR(15)
);

-- tp show all table
SHOW TABLES;

-- to description the tables
describe customers;