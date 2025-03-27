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
app.get("/api/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM photo;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

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

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));