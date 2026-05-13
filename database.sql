CREATE DATABASE IF NOT EXISTS novelix;
USE novelix;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    custname VARCHAR(100) NOT NULL,
    total INT NOT NULL,
    ordate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, role, email)
VALUES
('admin', '123', 'admin', 'admin@novelix.com'),
('customer', '123', 'customer', 'customer@novelix.com');

INSERT INTO items (title, description, price, image)
VALUES
('Atomic Habits', 'A book about building good habits and breaking bad ones.', 80, 'atomic.jpg'),
('Rich Dad Poor Dad', 'A book about money, investing, and financial education.', 70, 'richdad.jpg'),
('The Alchemist', 'A famous novel about dreams and personal legend.', 60, 'alchemist.jpg'),
('Deep Work', 'A book about focus and productivity.', 75, 'deepwork.jpg'),
('Clean Code', 'A programming book about writing better code.', 120, 'cleancode.jpg'),
('Harry Potter', 'A fantasy novel full of magic and adventure.', 90, 'harrypotter.jpg'),
('Think and Grow Rich', 'A classic book about success and mindset.', 65, 'thinkgrow.jpg'),
('The Psychology of Money', 'A book about money behavior and decisions.', 85, 'money.jpg');
CREATE TABLE orders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    total INT,
    payment_method VARCHAR(50),
    note TEXT
);