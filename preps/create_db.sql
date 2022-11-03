-- remember to run it as a root!
CREATE DATABASE Sheet;


-- CREATES TABLES

CREATE TABLE Sheet.Users(
  userID INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(17) NOT NULL,
  pass VARCHAR(30) NOT NULL,
  PRIMARY KEY(userID)
);

-- CREATE TABLE Sheet.Sheets(
--   sheetID INT NOT NULL AUTO_INCREMENT,
--   userID INT NOT NULL,
--   tableCount INT NOT NULL,
--   Primary KEY(sheetID),
--   FOREIGN KEY(userID) REFERENCES Sheet.Users(userID)
-- );

-- CREATE TABLE Sheet.Tables(
--   tableID INT NOT NULL AUTO_INCREMENT,
--   sheetID INT NOT NULL,
--   userID  INT NOT NULL,
--   data json_files,
--   PRIMARY KEY(tableID),
--   FOREIGN KEY(sheetID) REFERENCES Sheet.Sheets(sheetID),
--   FOREIGN KEY(userID) REFERENCES Sheet.Users(userID),
-- );

-- INSERT DUMMY DATA INTO TABLES

INSERT INTO Sheet.Users(username,pass)
VALUES ("abcd","1234");
