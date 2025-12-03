//////// nodejs / express setup ////////

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const mongoose = require("mongoose"); // MongoDB library
const EKdataset = require('./EKDatasetLocal'); //local data
const env = require('dotenv').config()
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
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME // TODO
});


// MongoDB database setup (For "Optagelsesdata")
// Replace 'my_mongo_db' with our actual database name
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/my_mongo_db';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err)
    );
//////// queries ////////

const query1 = "SELECT * FROM educations"



//////// endpoints ////////

const studentSchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    Køn: { type: String, required: true },
    Bopæl_POSTDISTRIKT: { type: String, required: true },
    Statsborgerskab: { type: String, required: true },
    INSTITUTIONSAKTIVITET: { type: Number, required: true },
    INSTITUTIONSAKT_BETEGNELSE: { type: String, required: true },
    KOT_OPTAGELSESOMRADENR: { type: Number, required: true },
    BETEGNELSE_A911: { type: String, required: true },
    OPTAG: { type: String, required: true },
    EKSAMENSTYPE_NAVN: { type: String, required: true },
    EKSAMENSAR: { type: Number, required: true },
    KVOTIENT: { type: Number, required: true },
    EKS_LAND_NAVN: { type: String, required: true },
    "Søgt som prioritet 1": { type: String, required: true },
    Alder: { type: Number, required: true },
    "Adgangsgivende skole navn": { type: String, required: true }
}, { collection: 'Students' });


const student = mongoose.model('Student', studentSchema, 'Students');



// henter alle studerende i EKDatasetLocal
app.get('/Students', async (req, res) => {
    console.log("Forsøger at hente fra db");
    try {
        // Query MongoDB
        const myStudentsMongoResponse = await student.find();
        res.json({
            message: "Data retrieved from both databases",
            mongoData: myStudentsMongoResponse,
        });

    } catch (error) {
        console.log("Kunne ikke hente fra db, henter fra lokal fil");

        res.json(EKdataset);
    }
});

// hent udvalgt studerende ud fra id
app.get('/students/:id', async(req, res) =>{
    const studentId = req.params.id;
    try{
        const studentData = await student.findOne(s => s.ID == studentId); // fx søg på MongoDB ID
        res.json(studentData);
    }catch{
        const studentData = EKdataset.find(s => s.ID == studentId);
        res.json(studentData)
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