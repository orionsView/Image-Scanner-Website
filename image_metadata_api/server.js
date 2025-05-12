require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to fetch data
app.use(express.json()); // Support JSON body parsing

// Connect to PostgreSQL
const pool = new Pool({
    //   connectionString: process.env.DATABASE_URL,
    user: "postgres",
    host: "localhost",
    database: "imagemetadatadb",
    password: "!@#$%",
    port: 5432,
});

// API Endpoint to Fetch All Images
// http://localhost:5000/api/images
app.get("/api/images", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM photo;");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint to Fetch All Image information associated with username
// http://localhost:5000/api/images/alice123
app.get("/api/images/:customerName", async (req, res) => {
    const customerName = req.params.customerName;

    try {
        const result = await pool.query(`
            SELECT *
            FROM photo
            JOIN customer ON photo.customerid = customer.id
            WHERE customer.username = $1;
        `, [customerName]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint to Fetch All Image fNums associated with usernam
// http://localhost:5000/api/images/fNum/alice123
app.get("/api/images/fNum/:customerName", async (req, res) => {
    const customerName = req.params.customerName;

    try {
        const result = await pool.query(`
          SELECT fnum
          FROM photo
          JOIN customer ON photo.customerid = customer.id
          WHERE customer.username = $1;
      `, [customerName]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint to Fetch All Image data associated with usernam
// http://localhost:5000/api/images/data/alice123
app.get("/api/images/data/:customerName", async (req, res) => {
    const customerName = req.params.customerName;

    try {
        const result = await pool.query(`
          SELECT *
          FROM photo
          JOIN customer ON photo.customerid = customer.id
          WHERE customer.username = $1;
      `, [customerName]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint to Add New Images to database with associated user id

app.post("/api/images", async (req, res) => {
    const { customerID, artistName, timeTaken, shutterSpeed, fNum, focalLength, ISO, makeID } = req.body; // Get new data

    try {
        const result = await pool.query(
            `INSERT INTO photo (customerID, artistName, timeTaken, shutterSpeed, fNum, focalLength, ISO, makeID)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING *;`,
            [customerID, artistName, timeTaken, shutterSpeed, fNum, focalLength, ISO, makeID]
        );


        res.json(result.rows[0]); // Return updated image
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// get user id from username
//http://localhost:5000/api/userid/bob_w
app.get("/api/userid/:customerName", async (req, res) => {
    const customerName = req.params.customerName;

    try {
        const result = await pool.query(`
            SELECT id
            FROM customer
            WHERE username = $1;
        `, [customerName]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// API endpoint to get make id from make name
// http://localhost:5000/api/images/makeid/sony
app.get("/api/images/makeid/:makeName", async (req, res) => {
    const makeName = req.params.makeName;

    try {
        const result = await pool.query(`
            SELECT id
            FROM make
            WHERE name ILIKE $1;
        `, [makeName]);

        if (result.rows.length > 0) {
            // If a matching make is found, return the id
            res.json({ id: result.rows[0].id });
        } else {
            // If no matching make is found, return a 404
            res.status(404).send("Make not found");
        }
    }catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));