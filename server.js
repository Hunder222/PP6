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

const query1 = "SELECT * from educations\n" +
    " inner join survey_answers\n" +
    " using(id)\n" +
    " inner join survey_questions\n" +
    " using(question_id)\n" +
    " inner join survey\n" +
    " using(survey_id)\n" +
    "order by id"

const query2 = "SELECT * FROM other_data"

// pipeline mongo
const pipeline = [
    {
        // STAGE 1: Sum everything up
        $group: {
            _id: null,

            // Total count of IT educations
            totalCount: {
                $sum: {
                    $cond: [
                        {$in: ["$INSTITUTIONSAKT_BETEGNELSE", ["Cybersikkerhed", "Datamatiker", "IT-Arkitektur", "IT-Teknolog", "Multimediedesigner", "Økonomi og IT"]]},
                        1,
                        0
                    ]
                }
            },
            // Total men of IT educations
            totalM: {
                $sum: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$Gender", "Mand"]},
                                {$in: ["$INSTITUTIONSAKT_BETEGNELSE", ["Cybersikkerhed", "Datamatiker", "IT-Arkitektur", "IT-Teknolog", "Multimediedesigner", "Økonomi og IT"]]}
                            ]
                        },
                        1,
                        0
                    ]
                }
            },
            // Total women of IT educations
            totalF: {
                $sum: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$Gender", "Kvinde"]},
                                {$in: ["$INSTITUTIONSAKT_BETEGNELSE", ["Cybersikkerhed", "Datamatiker", "IT-Arkitektur", "IT-Teknolog", "Multimediedesigner", "Økonomi og IT"]]}
                            ]
                        },
                        1, 0
                    ]
                }
            },

            // sum gender kvotient
            avgCYBSkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"]},
                                {$eq: ["$Gender", "Mand"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgCYBSkvoF: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"]},
                                {$eq: ["$Gender", "Kvinde"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgDATAkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]},
                                {$eq: ["$Gender", "Mand"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgDATAkvoF: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]},
                                {$eq: ["$Gender", "Kvinde"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgMEKOkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]},
                                {$eq: ["$Gender", "Mand"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgMEKOkvoF: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]},
                                {$eq: ["$Gender", "Kvinde"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgITTEkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]},
                                {$eq: ["$Gender", "Mand"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgITTEkvoF: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]},
                                {$eq: ["$Gender", "Kvinde"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgITARkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]},
                                {$eq: ["$Gender", "Mand"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgITARkvoF: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]},
                                {$eq: ["$Gender", "Kvinde"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgØKITkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]},
                                {$eq: ["$Gender", "Mand"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },
            avgØKITkvoF: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]},
                                {$eq: ["$Gender", "Kvinde"]}
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },

            // the followwing is collapsed for better overview
            // count edu used to project pct in next stage
            countCYBS: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"]}, 1, 0]}},
            countDATA: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, 1, 0]}},
            countITTE: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, 1, 0]}},
            countMEKO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, 1, 0]}},
            countITAR: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, 1, 0]}},
            countØKIT: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, 1, 0]}},


            // count gender edu
            countCYBSM: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"]}, {$eq: ["$Gender", "Mand"]}]}, 1, 0]}},
            countCYBSF: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"]}, {$eq: ["$Gender", "Kvinde"]}]}, 1, 0]}},
            countDATAM: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, {$eq: ["$Gender", "Mand"]}]}, 1, 0]}},
            countDATAF: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, {$eq: ["$Gender", "Kvinde"]}]}, 1, 0]}},
            countMEKOM: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, {$eq: ["$Gender", "Mand"]}]}, 1, 0]}},
            countMEKOF: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, {$eq: ["$Gender", "Kvinde"]}]}, 1, 0]}},
            countITTEM: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, {$eq: ["$Gender", "Mand"]}]}, 1, 0]}},
            countITTEF: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, {$eq: ["$Gender", "Kvinde"]}]}, 1, 0]}},
            countITARM: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, {$eq: ["$Gender", "Mand"]}]}, 1, 0]}},
            countITARF: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, {$eq: ["$Gender", "Kvinde"]}]}, 1, 0]}},
            countØKITM: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, {$eq: ["$Gender", "Mand"]}]}, 1, 0]}},
            countØKITF: {$sum: {$cond: [{$and: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, {$eq: ["$Gender", "Kvinde"]}]}, 1, 0]}},
        }
    },
    {
        $project: {
            _id: 0,
            totalM: 1,
            totalF: 1,
            totalCount: 1,

            // avg kvotient, rounded to 1 decimal
            avgCYBSkvoM: {
                $round: ["$avgCYBSkvoM", 1]
            },
            avgCYBSkvoF: {
                $round: ["$avgCYBSkvoF", 1]
            },
            avgDATAkvoM: {
                $round: ["$avgDATAkvoM", 1]
            },
            avgDATAkvoF: {
                $round: ["$avgDATAkvoF", 1]
            },
            avgMEKOkvoM: {
                $round: ["$avgMEKOkvoM", 1]
            },
            avgMEKOkvoF: {
                $round: ["$avgMEKOkvoF", 1]
            },
            avgITTEkvoM: {
                $round: ["$avgITTEkvoM", 1]
            },
            avgITTEkvoF: {
                $round: ["$avgITTEkvoF", 1]
            },
            avgITARkvoM: {
                $round: ["$avgITARkvoM", 1]
            },
            avgITARkvoF: {
                $round: ["$avgITARkvoF", 1]
            },
            avgØKITkvoM: {
                $round: ["$avgØKITkvoM", 1]
            },
            avgØKITkvoF: {
                $round: ["$avgØKITkvoF", 1]
            },

            // gender percent for each edu, rounded to 1 decimal
            pctCYBSM: {
                $round: [
                    {$multiply: [{$divide: ["$countCYBSM", "$countCYBS"]}, 100]}, 1
                ]
            },
            pctCYBSF: {
                $round: [
                    {$multiply: [{$divide: ["$countCYBSF", "$countCYBS"]}, 100]}, 1
                ]
            },
            pctDATAM: {
                $round: [
                    {$multiply: [{$divide: ["$countDATAM", "$countDATA"]}, 100]}, 1
                ]
            },
            pctDATAF: {
                $round: [
                    {$multiply: [{$divide: ["$countDATAF", "$countDATA"]}, 100]}, 1
                ]
            },
            pctMEKOM: {
                $round: [
                    {$multiply: [{$divide: ["$countMEKOM", "$countMEKO"]}, 100]}, 1
                ]
            },
            pctMEKOF: {
                $round: [
                    {$multiply: [{$divide: ["$countMEKOF", "$countMEKO"]}, 100]}, 1
                ]
            },
            pctITTEM: {
                $round: [
                    {$multiply: [{$divide: ["$countITTEM", "$countITTE"]}, 100]}, 1
                ]
            },
            pctITTEF: {
                $round: [
                    {$multiply: [{$divide: ["$countITTEF", "$countITTE"]}, 100]}, 1
                ]
            },
            pctITARM: {
                $round: [
                    {$multiply: [{$divide: ["$countITARM", "$countITAR"]}, 100]}, 1
                ]
            },
            pctITARF: {
                $round: [
                    {$multiply: [{$divide: ["$countITARF", "$countITAR"]}, 100]}, 1
                ]
            },
            pctØKITM: {
                $round: [
                    {$multiply: [{$divide: ["$countØKITM", "$countØKIT"]}, 100]}, 1
                ]
            },
            pctØKITF: {
                $round: [
                    {$multiply: [{$divide: ["$countØKITF", "$countØKIT"]}, 100]}, 1
                ]
            },
        }
    },
    {
        // 3rd stage to make result arrays, ordered by our specific order of educations
        $project: {
            _id: 0,
            allKvoM: ["$avgCYBSkvoM", "$avgDATAkvoM", "$avgITARkvoM", "$avgITTEkvoM", "$avgMEKOkvoM", "$avgØKITkvoM"],
            allKvoF: ["$avgCYBSkvoF", "$avgDATAkvoF", "$avgITARkvoF", "$avgITTEkvoF", "$avgMEKOkvoF", "$avgØKITkvoF"],
            allPctM: ["$pctCYBSM", "$pctDATAM", "$pctITARM", "$pctITTEM", "$pctMEKOM", "$pctØKITM"],
            allPctF: ["$pctCYBSF", "$pctDATAF", "$pctITARF", "$pctITTEF", "$pctMEKOF", "$pctØKITF"],
            totalPctM: {$round: [{$multiply: [{$divide: ["$totalM", "$totalCount"]}, 100]}, 1]},
            totalPctF: {$round: [{$multiply: [{$divide: ["$totalF", "$totalCount"]}, 100]}, 1]}
        }
    }
];

//////// endpoints ////////





// henter alle studerende i EKDatasetLocal
app.get('/Ekdata', async (req, res) => {
    console.log("Forsøger at hente fra db");
    try {
        // Query MongoDB
        const students = await Student.aggregate(pipeline);
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({msg: error.message});

    }
});
/*
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
        })).sort((a, b) =>
            a.INSTITUTIONSAKT_BETEGNELSE.localeCompare(b.INSTITUTIONSAKT_BETEGNELSE)
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
        })).sort((a, b) =>
            a.INSTITUTIONSAKT_BETEGNELSE.localeCompare(b.INSTITUTIONSAKT_BETEGNELSE)
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// endpoint til at få data om antal studerende på hver uddannelse
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
        const result = Object.values(educations).sort((a, b) =>
            a.INSTITUTIONSAKT_BETEGNELSE.localeCompare(b.INSTITUTIONSAKT_BETEGNELSE)
        );
        res.json(result);

    }catch(error){
        res.status(500).json({ msg: error.message });
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


            res.send(formatSurveyData(results));
            console.log("succes");
        });

    } catch (error) {
        console.log("Kunne ikke hente fra db, henter fra lokal fil");
    }
});


app.get('/otherData', async (req, res) => {
    try{
        mysqlConnection.query(query2, (error, result) => {
            res.send(result);
        });
    }catch(error){
        console.log("Kunne ikke hente fra db, henter fra lokal fil");
    };
});
/*start of new*/

function formatSurveyData(data) {
    const result = {
        allSalaryStart: [],
        allSalaryAvg: [],
        allSalaryHighest: [],
        allUnemployedNewGradPct: [],
        allDropoutFirstYearPct: [],
        jobSurvey: {
            jobSurveyQuestions: [],
            allQuestion1Answers: [],
            allQuestion2Answers: [],
            allQuestion3Answers: [],
            allQuestion4Answers: [],
        },
        socialSurvey: {
            socialSurveyQuestions: [],
            allQuestion5Answers: [],
            allQuestion6Answers: [],
            allQuestion7Answers: [],
            allQuestion8Answers: [],
        },
        professionalSurvey: {
            professionalSurveyQuestions: [],
            allQuestion9Answers: [],
            allQuestion10Answers: [],
            allQuestion11Answers: [],
            allQuestion12Answers: [],
        }
    };

    // Group by survey_id
    const surveyGroups = {};
    const addedPrograms = new Set(); // Track which programs we've added salary data for

    data.forEach(item => {
        // Add salary and stats data for each unique program (by id)
        if (!addedPrograms.has(item.id)) {
            result.allSalaryStart.push(item.starting_salary);
            result.allSalaryAvg.push(item.average_salary);
            result.allSalaryHighest.push(item.highest_salary);
            result.allUnemployedNewGradPct.push(item.unemployment_new_grad_pct);
            result.allDropoutFirstYearPct.push(item.dropout_first_year_pct);
            addedPrograms.add(item.id);
        }

        // Group questions by survey
        if (!surveyGroups[item.survey_name]) {
            surveyGroups[item.survey_name] = [];
        }
        surveyGroups[item.survey_name].push(item);
    });

    Object.keys(surveyGroups).forEach(surveyId => {
        const surveyKey = surveyId;
        const questions = surveyGroups[surveyId].sort((a, b) => a.question_id - b.question_id);
        const addedQuestions = new Set(); // Track which questions we've already added

        questions.forEach((item, index) => {
            const questionKey = `allQuestion${item.question_id}Answers`;
            const questionsArrayKey = `${surveyId}Questions`;

            // Only add question text once per question_id
            if (!addedQuestions.has(item.question_id)) {

                result[surveyKey][questionsArrayKey].push(item.question_text);
                addedQuestions.add(item.question_id);
            }

            result[surveyKey][questionKey].push(item.answer_pct);
        });
    });
    return result;
}



/* end of new*/
//////// server listener ////////
app.listen(port, () => {
    console.log(`Application is now running on port ${port}`);
});