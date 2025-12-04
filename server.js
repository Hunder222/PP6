//////// nodejs / express setup ////////

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const mongoose = require("mongoose"); // MongoDB library
const EKdataset = require('./EKDatasetLocal'); //local data
const Student = require('./mongoModels/student.model.js');
const env = require('dotenv').config()
// filesystem
const path = require('path');
const fs = require('fs').promises; // promises: for await and async function
let updateQueue = Promise.resolve();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname))); // prop not needed

//SQL database setup (For "third party data")
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


mongoose.connect('mongodb://127.0.0.1:27017/EKData')
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err)
    );
//////// queries ////////

const query1 = "SELECT * FROM educations"



//////// endpoints ////////





// henter alle studerende i EKDatasetLocal
app.get('/Students', async (req, res) => {
    console.log("Forsøger at hente fra db");
    try {
        // Query MongoDB
        const students = await Student.find().select('KOEN INSTITUTIONSAKT_BETEGNELSE BETEGNELSE_A911 EKSAMENSTYPE_NAVN KVOTIENT Alder' );
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({msg: error.message});

    }
});

// hent udvalgt studerende ud fra id
app.get('/students/:id', async(req, res) =>{
    const studentId = req.params.id;
    try{

        const studentData = await Student.findOne({ ID: studentId }).select('KOEN INSTITUTIONSAKT_BETEGNELSE BETEGNELSE_A911 EKSAMENSTYPE_NAVN KVOTIENT Alder' );// fx søg på MongoDB ID
        console.log(studentData)
        if (!studentData) {
            return res.status(404).json({ message: "Student ikke fundet" });
        }
        res.json(studentData);
    }catch(error){
        res.status(500).json({msg: error.message});
    }

});


app.get('/thirdPartyData', async (req, res) => {
    console.log("Forsøger at hente fra db");

    try {
        mysqlConnection.query(query1, (error, results) => {
            if (error) return res.status(500).json({ error: error.message });

            console.log(results)
            res.send(results);

        });

    } catch (error) {
        console.log("Kunne ikke hente fra db, henter fra lokal fil");
    }
});



//////// server listener ////////
app.listen(port, () => {
    console.log(`Application is now running on port ${port}`);
});