-- Employee Management System — run in phpMyAdmin SQL tab (XAMPP MySQL must be running)

CREATE DATABASE IF NOT EXISTS employee_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE employee_management;

CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  email         VARCHAR(255)      NOT NULL,
  password      VARCHAR(255)      NOT NULL,
  first_name    VARCHAR(100)      NOT NULL,
  role          ENUM('admin', 'employee') NOT NULL DEFAULT 'employee',
  is_active     TINYINT(1)        NOT NULL DEFAULT 1,
  created_at    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role (role)
) ENGINE=InnoDB;

-- Passwords stored as plain text (learning project only — not for production)
-- Tasks schema: run database/02_task_enhancements.sql after this file (npm run db:migrate)
INSERT IGNORE INTO users (email, password, first_name, role) VALUES
('admin@gmail.com',  'mi@123', 'Dhananjay',  'admin'),
('empganesh@gmail.com',  'emp1@123',    'Ganesh',  'employee'),
('empsaurav@gmail.com',  'emp2@123',    'Saurav',  'employee'),

