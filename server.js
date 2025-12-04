//////// nodejs / express setup ////////

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const mongoose = require("mongoose"); // MongoDB library
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
        const students = await Student.find().select('Gender INSTITUTIONSAKT_BETEGNELSE BETEGNELSE_A911 EKSAMENSTYPE_NAVN KVOTIENT Alder' );
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({msg: error.message});

    }
});
/*
* count hvor mange der er på hver uddannelse
* hvor mange kvinder og mænd på hver uddannelse  TODO
*  */

// endpoint til at få data om uddannelses kvotienter op delt pr. uddannelse
app.get('/uddannelses_kvotienter', async (req, res) => {
    try {
        const allowedEducations = [
            'Datamatiker',
            'PB i IT-arkitektur',
            'IT-teknolog',
            'Multimediedesigner',
            'Økonomi og it',
        ];

        const students = await Student.find({
            INSTITUTIONSAKT_BETEGNELSE: { $in: allowedEducations }
        });

        const quotients = {};
        students.forEach(student => {
            if (!quotients[student.INSTITUTIONSAKT_BETEGNELSE]) {
                quotients[student.INSTITUTIONSAKT_BETEGNELSE] = {
                    INSTITUTIONSAKT_BETEGNELSE: student.INSTITUTIONSAKT_BETEGNELSE,
                    totalQuotient: 0,
                    count: 0
                };
            }

            // Konverter til number og tjek om det er et gyldigt tal
            const kvotient = parseFloat(student.KVOTIENT);
            if (!isNaN(kvotient)) {
                quotients[student.INSTITUTIONSAKT_BETEGNELSE].totalQuotient += kvotient;
                quotients[student.INSTITUTIONSAKT_BETEGNELSE].count++;
            }
        });

        const result = Object.values(quotients).map(edu => ({
            INSTITUTIONSAKT_BETEGNELSE: edu.INSTITUTIONSAKT_BETEGNELSE,
            averageQuotient: edu.count > 0 ? (edu.totalQuotient / edu.count).toFixed(2) : "0.00"
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// endpoint til at få data om uddannelses kvotienter op delt pr. uddannelse og så yderligere i køn
app.get('/uddannelses_kvotienter_opdelt', async (req, res) => {
    try {
        const allowedEducations = [
            'Datamatiker',
            'PB i IT-arkitektur',
            'IT-teknolog',
            'Multimediedesigner',
            'Økonomi og it',
        ];

        const students = await Student.find({
            INSTITUTIONSAKT_BETEGNELSE: { $in: allowedEducations }
        });

        // DEBUG: Log en enkelt student for at se alle feltnavne
        if (students.length > 0) {
            console.log("Første student:", students[0]);
            console.log("Køn værdi:", students[0].Gender);
        }

        const quotients = {};

        students.forEach(student => {
            if (!quotients[student.INSTITUTIONSAKT_BETEGNELSE]) {
                quotients[student.INSTITUTIONSAKT_BETEGNELSE] = {
                    INSTITUTIONSAKT_BETEGNELSE: student.INSTITUTIONSAKT_BETEGNELSE,
                    male: { totalQuotient: 0, count: 0 },
                    female: { totalQuotient: 0, count: 0 }
                };
            }

            const kvotient = parseFloat(student.KVOTIENT);
            if (!isNaN(kvotient)) {
                console.log("Tjekker køn:", student.Gender, "=== 'Mand'?", student.Gender === 'Mand');
                console.log("Tjekker køn:", student.Gender, "=== 'Kvinde'?", student.Gender === 'Kvinde');
                // Brug det korrekte feltnavn: Køn
                if (student.Gender === 'Mand') {
                    quotients[student.INSTITUTIONSAKT_BETEGNELSE].male.totalQuotient += kvotient;
                    quotients[student.INSTITUTIONSAKT_BETEGNELSE].male.count++;
                } else if (student.Gender === 'Kvinde') {
                    quotients[student.INSTITUTIONSAKT_BETEGNELSE].female.totalQuotient += kvotient;
                    quotients[student.INSTITUTIONSAKT_BETEGNELSE].female.count++;
                }
            }
        });

        const result = Object.values(quotients).map(edu => ({
            INSTITUTIONSAKT_BETEGNELSE: edu.INSTITUTIONSAKT_BETEGNELSE,
            maleAverageQuotient: edu.male.count > 0 ? (edu.male.totalQuotient / edu.male.count).toFixed(2) : "0.00",
            femaleAverageQuotient: edu.female.count > 0 ? (edu.female.totalQuotient / edu.female.count).toFixed(2) : "0.00",
            maleCount: edu.male.count,
            femaleCount: edu.female.count
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/antal_per_uddannelse', async(req,res) =>{
    try{
        const allowedEducations = [
            'Datamatiker',
            'PB i IT-arkitektur',
            'IT-teknolog',
            'Multimediedesigner',
            'Økonomi og it',
        ];

        const students = await Student.find({
            INSTITUTIONSAKT_BETEGNELSE: {$in: allowedEducations}
        });

        const educations = {};
        students.forEach(student => {
            if(!educations[student.INSTITUTIONSAKT_BETEGNELSE]){
                educations[student.INSTITUTIONSAKT_BETEGNELSE] = {
                    INSTITUTIONSAKT_BETEGNELSE: student.INSTITUTIONSAKT_BETEGNELSE,
                    count: 0
                };
            }
            educations[student.INSTITUTIONSAKT_BETEGNELSE].count ++;

        });
        // har lavet det til object da jeg synes der formaterer det pænerer
        const result = Object.values(educations);
        res.json(result);

    }catch(error){

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