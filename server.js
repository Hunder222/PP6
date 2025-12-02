//////// nodejs / express setup ////////

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const mongoose = require("mongoose"); // MongoDB library

// filesystem
const path = require('path');
const fs = require('fs').promises; // promises: for await and async function
let updateQueue = Promise.resolve();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())
//app.use(express.static(path.join(__dirname))); // prop not needed

//SQL database setup (For "third party data")
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'pp6_third_party_data' // TODO  
});


// MongoDB database setup (For "Optagelsesdata") 
// Replace 'my_mongo_db' with our actual database name
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/my_mongo_db';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err)
);



//// EXAMPLE START ////
// EXAMPLE: usage for mySql and mongo
const myTestSchema = new mongoose.Schema({
    eduid: String,
    name: String,
    salary: Number
});

const myTest = mongoose.model('myTest', myTestSchema, 'collection_name'); 

app.get('/test', async (req, res) => {
    try {
        // Query MongoDB 
        const myTestMongoResponse = await myTest.find();

        // Query MySQL
        const sqlQuery = 'SELECT * FROM pokemon';
        const sqlResponse = await new Promise((resolve, reject) => {
            mysqlConnection.query(sqlQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json({
            message: "Data retrieved from both databases",
            mongoData: myTestMongoResponse,
            sqlData: sqlResponse
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
    }
});
//// EXAMPLE END ////



//////// queries ////////





//////// endpoints ////////




//////// server listener ////////
app.listen(port, () => {
    console.log(`Application is now running on port ${port}`);
});