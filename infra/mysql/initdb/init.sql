USE lumos_image_db;
ALTER USER 'user' IDENTIFIED WITH mysql_native_password BY 'password';

DROP TABLE IF EXISTS images;

CREATE TABLE images
(
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  path VARCHAR(100) NOT NULL,
  file_type VARCHAR(10) NOT NULL,
  created_date_timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);