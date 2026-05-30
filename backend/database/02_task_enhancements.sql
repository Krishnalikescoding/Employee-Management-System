-- Run once after Phase 1. Rebuilds tasks with new fields. Removes all old/dummy tasks.
USE employee_management;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS task_notifications;
DROP TABLE IF EXISTS task_attachments;
DROP TABLE IF EXISTS tasks;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE tasks (
  id                   INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  task_code            VARCHAR(20)       NOT NULL,
  employee_id          INT UNSIGNED      NOT NULL,
  assigned_by_id       INT UNSIGNED      NULL,
  title                VARCHAR(255)      NOT NULL,
  description          TEXT              NOT NULL,
  due_date             DATE              NOT NULL,
  due_time             TIME              NULL,
  estimated_completion VARCHAR(50)       NULL COMMENT 'e.g. 2 hours, 3 days',
  category             VARCHAR(50)       NOT NULL,
  priority             ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
  status               ENUM('todo', 'in_progress', 'review', 'completed', 'failed') NOT NULL DEFAULT 'todo',
  tag                  ENUM('pickup', 'servicing', 'hardware_issue', 'software_issue', 'other') NOT NULL,
  custom_tag           VARCHAR(100)      NULL,
  remind_at            DATETIME          NULL,
  completed_at         TIMESTAMP         NULL,
  failed_at            TIMESTAMP         NULL,
  created_at           TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tasks_task_code (task_code),
  KEY idx_tasks_employee_id (employee_id),
  KEY idx_tasks_status (status),
  KEY idx_tasks_priority (priority),
  KEY idx_tasks_due_date (due_date),
  CONSTRAINT fk_tasks_employee
    FOREIGN KEY (employee_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_tasks_assigned_by
    FOREIGN KEY (assigned_by_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE task_attachments (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  task_id    INT UNSIGNED  NOT NULL,
  file_name  VARCHAR(255)  NOT NULL,
  file_path  VARCHAR(500)  NULL,
  file_url   VARCHAR(500)  NULL,
  file_type  VARCHAR(50)   NULL,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_attachments_task_id (task_id),
  CONSTRAINT fk_attachments_task
    FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE task_notifications (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  user_id    INT UNSIGNED  NOT NULL,
  task_id    INT UNSIGNED  NOT NULL,
  message    VARCHAR(500)  NOT NULL,
  is_read    TINYINT(1)    NOT NULL DEFAULT 0,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_notifications_user_id (user_id),
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_notifications_task
    FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
