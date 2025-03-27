DROP DATABASE IF EXISTS imagemetadatadb;
CREATE DATABASE imagemetadatadb;

\c imagemetadatadb;

CREATE TABLE Make (
  ID char(2) NOT NULL,
  name varchar(10) UNIQUE NOT NULL,
  
  PRIMARY KEY (ID)
);

CREATE TABLE Customer (
  ID serial NOT NULL,
  userName varchar(50) UNIQUE NOT NULL,
  email varchar(80) UNIQUE,
  passwordHash varchar(64) NOT NULL,
  passwordSalt varchar(64) UNIQUE NOT NULL,

  PRIMARY KEY (ID)
);

CREATE TABLE Photo (
  ID serial NOT NULL,
  customerID serial NOT NULL,
  ArtistName varchar(20),
  timeTaken timeStamp NOT NULL,
  shutterSpeed varchar(10) NOT NULL,
  fNum decimal(4, 2) NOT NULL,
  focalLength decimal(4) NOT NULL,
  ISO integer NOT NULL,
  makeID char(2) NOT NULL,

  PRIMARY KEY (ID),
  FOREIGN KEY (makeID)
    REFERENCES Make(ID)
      DEFERRABLE INITIALLY DEFERRED,
  FOREIGN KEY (customerID)
    REFERENCES Customer(ID)
      DEFERRABLE INITIALLY DEFERRED
);


ALTER SEQUENCE Customer_id_seq
    RESTART WITH 1;

ALTER SEQUENCE photo_id_seq
    RESTART WITH 1;


-- testing data 
BEGIN;
INSERT INTO photo (customerID, ArtistName, timeTaken, shutterSpeed, fNum, focalLength, ISO, makeID) VALUES
(1, 'Alice', '2024-03-27 10:15:00', '1/250', 1.8, 50.0, 200, 'S1'),
(2, 'Bob', '2024-03-26 14:30:00', '1/500', 1.8, 85.0, 400, 'S1'),
(3, NULL, '2024-03-25 18:45:00', '1/60', 1.8, 35.0, 800, 'N1'),
(1, 'Charlie', '2024-03-27 12:00:00', '1/125', 2.8, 24.0, 100, 'S1'),
(1, NULL, '2024-03-28 09:20:00', '1/1000', 2.8, 70.0, 1600, 'F1'),
(2, 'Emma', '2024-03-26 20:10:00', '1/30', 4.0, 18.0, 3200, 'F1'),
(2, 'David', '2024-03-24 08:45:00', '1/200', 5.6, 105.0, 100, 'S1'),
(3, NULL, '2024-03-25 16:30:00', '1/400', 8.0, 200.0, 200, 'N1');

INSERT INTO Make (ID, name) VALUES
('S1', 'Sony'),
('N1', 'Nikon'),
('F1', 'Fuji');

INSERT INTO Customer (userName, email, passwordHash, passwordSalt) VALUES
('alice123', 'alice@example.com', 'a1b2c3d4e5f6...', 's4lT1'),
('bob_w', 'bob.w@example.com', 'x7y8z9a0b1c2...', 's4lT2'),
('charlie89', 'charlie@example.com', 'q3w4e5r6t7y8...', 's4lT3');

COMMIT;