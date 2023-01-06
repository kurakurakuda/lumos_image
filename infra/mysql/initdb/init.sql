USE lumos_image_db;

DROP TABLE IF EXISTS images;

CREATE TABLE images
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  path VARCHAR(100) NOT NULL,
  created_date_timestamp DATETIME NOT NULL
);
