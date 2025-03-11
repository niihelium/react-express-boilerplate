-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS alasindb;

-- Switch to the alasindb database
USE alasindb;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the config table
CREATE TABLE IF NOT EXISTS config (
    db_version VARCHAR(10) NOT NULL
);

-- Insert the initial database version
INSERT INTO config (db_version)
VALUES ('0.0.1')
ON DUPLICATE KEY UPDATE db_version = db_version; -- Prevents duplicate insertion

CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);