-- Create database (if not already created through hosting panel)
CREATE DATABASE IF NOT EXISTS html_post_web_app;
USE html_post_web_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  whatsapp VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (username, whatsapp, password, isAdmin) 
VALUES ('admin', '+1234567890', '$2b$10$MZ9bTRCKGFRXGtTL.A8w1eXqFU2BVF3N5NzkRyK0xA8r8JikeSInm', TRUE);