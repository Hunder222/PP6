console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html
console.log(educationData);
console.log(otherData);



////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');
const genderChart1Canvas = document.querySelector('#genderChart1');
const genderChart2Canvas = document.querySelector('#genderChart2');
const genderChart3Canvas = document.querySelector('#genderChart3');
const salaryChartCanvas = document.querySelector('#salaryChart')
const wellbeingChart1Canvas = document.querySelector('#wellbeingChart1')
const wellbeingChart2Canvas = document.querySelector('#wellbeingChart2')
const wellbeingChart3Canvas = document.querySelector('#wellbeingChart3')
const wellbeingChart4Canvas = document.querySelector('#wellbeingChart4')
const wellbeingChart5Canvas = document.querySelector('#wellbeingChart5')
const jobUnemployChartCanvas = document.querySelector('#jobChart1')
const jobSurveyQ1Canvas = document.querySelector('#jobChart2')
const jobSurveyQ2Canvas = document.querySelector('#jobChart3')
const jobSurveyQ3Canvas = document.querySelector('#jobChart4')
const jobSurveyQ4Canvas = document.querySelector('#jobChart5')
const btmSocial = document.querySelector("#kvotient")
const btmFaglig = document.querySelector("#alder")
const BtmJobstart = document.querySelector("#BtmJobstart")
const Btmløn = document.querySelector("#Btmløn")
const BtmKønsfordeling = document.querySelector("#BtmKønsfordeling")
const Btmtrivsel = document.querySelector("#Btmtrivsel")
const dropdowngen = document.querySelector("#dropdowngen")
const dropdownmax = document.querySelector("#dropdownmax")
const dropdownmin = document.querySelector("#dropdownmin")
const salaryButton = document.querySelector('#salaryChartInfo')
const jobMultiButton = document.querySelector('#jobMultiInfo')

// object to store data for charts, from server db or local db
const queriedData = {
    totalPctM: 0,
    totalPctF: 0,
    allKvoM: [],
    allKvoF: [],
    allPctM: [],
    allPctF: [],
    allSalaryStart: [],
    allSalaryAvg: [],
    allSalaryHighest: [],
    allUnemployedNewGradPct: [],
    allDropoutFirstYearPct: [],
    avgBusinessAcademyDropoutPct: 0,
    avgBusinessAcademyUnemploymentNewGradPct: 0,
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
}


////// charts //////

// chart color
const borderColor = 'rgba(255, 255, 255, 0.8)'
const gridColor = 'rgba(255, 255, 255, 0.5)'
const gridTextColor = 'rgba(255, 255, 255, 0.8)'
const genderChartColorM = 'rgba(92, 122, 143, 0.9)'
const genderChartColorF = 'rgba(253, 62, 103, 0.9)'
const chartPrimaryColor = 'rgba(191, 248, 176, 0.9)'

// other chart variables
const chartAllEduLabels = ['CYB', 'DATA', 'ITAR', 'ITTE', 'MEKO', 'ØKIT']
const chartAllEduNames = [
    'Cybersikkerhed',
    'Datamatiker',
    'IT-Arkitektur',
    'IT-Teknolog',
    'Multimediedesigner',
    'Økonomi og IT'
]
const chartAllEduNamesITARstar = chartAllEduNames.with(2, 'IT-Arkitektur*')
const chartAllEduLabelsITARstar = chartAllEduLabels.with(2, 'ITAR*')

// salary section

let salaryChart = new Chart(salaryChartCanvas, {
    type: 'bar',
    data: {
        labels: chartAllEduNamesITARstar,
        datasets: [{
            label: [], //update chart
            data: [], //update chart
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {

        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            title: {
                display: true,
                text: ['Høj løn for nye IT-uddannede'],
                font: { size: 18 },
                color: 'white'
            },
            legend: {display: false},
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y
                        let valueSplitted = value.toString().split('')

                        const indexToSlice = valueSplitted.length - 3;
                        const part1 = valueSplitted.slice(0, indexToSlice);
                        const part2 = valueSplitted.slice(indexToSlice);

                        const newValue = part1.join('') + '.' + part2.join('');
                        return newValue + 'kr'
                    }
                }
            }
        },
        scales: {
            x: {
                border: {color: borderColor},
                grid: {color: gridColor},
                ticks: {color: gridTextColor}
            },
            y: {
                border: {color: borderColor},
                grid: {color: gridColor},
                ticks: {color: gridTextColor}
            }
        }
    }
})


// gender section
let genderBarChart1 = new Chart(genderChart1Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduNames, //navn på uddannelse
        datasets: [
            {
                label: "Adgangskvotient Mænd",
                data: [],
                backgroundColor: genderChartColorM,
                borderWidth: 1
            },
            {
                label: "Adgangskvotient Kvinder",
                data: [],
                backgroundColor: genderChartColorF,
                borderWidth: 1
            }
        ]
    },
    options: {

        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: ['Kvinderne hæver barren med højt fagligt niveau på IT-uddannelserne:'],
                font: { size: 18 },
                color: 'white'
            },
            legend: {
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            }
        },
        scales: {
            x: {
                border: {color: borderColor},
                grid: {color: gridColor},
                ticks: {color: gridTextColor}
            },
            y: {
                border: {color: borderColor},
                grid: {color: gridColor},
                ticks: {color: gridTextColor}
            }
        }
    }
})

let genderPieChart = new Chart(genderChart2Canvas, {
    type: 'pie',
    data: {
        labels: ["Mænd", "Kvinder"],
        datasets: [{
            label: [], //procentvis kønsfordeling
            data: [45, 60], //updateChart
            backgroundColor: [
                genderChartColorM,
                genderChartColorF
            ]
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: ['Glem myten om herreklubben:', 'Kvinder er stærkt repræsenteret på IT-uddannelserne!'],
                font: { size: 18 },
                color: 'white'
            },
            legend: {
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed
                        return value + '%'
                    }
                }
            }
        }
    }
})

let genderBarChart2 = new Chart(genderChart3Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduNames,
        datasets: [
            {
                label: ["Mænd"],
                data: [], //updateChart
                backgroundColor: genderChartColorM
            },
            {
                label: ["Kvinder"],
                data: [], //updateChart
                backgroundColor: genderChartColorF
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                border: {color: borderColor},
                grid: {color: gridColor},
                ticks: {color: gridTextColor}
            },
            y: {
                stacked: true,
                border: {color: borderColor},
                grid: {color: gridColor},
                ticks: {color: gridTextColor}
            }
        },
        plugins: {
            title: {
                display: true,
                text: ['Har du modet? Vi har uddannelsen:', 'Vær med til at tegne fremtidens kønsfordeling'],
                font: { size: 18 },
                color: 'white'
            },
            legend: {
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y
                        return value + '%'
                    }
                }
            }
        }
    }
})


// wellbeingSection
let wellbeingDropoutChart = new Chart(wellbeingChart1Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    plugins: [{
        // a line drawn vertically to show avg dropout pct
        id: 'avgLine',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea: { left, right }, scales: { y } } = chart;

            const yPos = y.getPixelForValue(queriedData.avgBusinessAcademyDropoutPct);

            ctx.save();

            // Draw a linee from edge to edge
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'red';
            ctx.setLineDash([6, 6]); // Dashed styling
            ctx.moveTo(left, yPos);  // Start at very left axis
            ctx.lineTo(right, yPos); // End at very right axis
            ctx.stroke();

            // 3. Draw Text
            ctx.fillStyle = 'red';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(`Gennemsnitlig frafald (Erhvervsakademi): ${queriedData.avgBusinessAcademyDropoutPct}%`, left + 5, yPos - 8);

            ctx.restore();
        }
    }],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Procentvis frafald første år',
                font: {size: 18},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y
                        return value + '%'
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            },
            y: {
                min: 0,
                max: 100,
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {color: gridColor},
            }
        }
    }
})

// Q3 and Q4 scales are updated by updateSurveyCharts()
let wellbeingSurveyScales = {
    Q1scale: ['Helt uenig', 'Uenig', 'Hverken eller', 'Enig', 'Helt enig'],
    Q2scale: ['Helt uenig', 'Uenig', 'Hverken eller', 'Enig', 'Helt enig'],
    Q3scale: ['Altid', 'Næsten altid', 'Hverken eller', 'Næsten aldrig', 'Aldrig'],
    Q4scale: ['Altid', 'Næsten altid', 'Hverken eller', 'Næsten aldrig', 'Aldrig'],
}

let wellbeingSurveryQ1 = new Chart(wellbeingChart2Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [], // updated by updateSurveyCharts()
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,



        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: '', // updated by updateSurveyCharts()
                font: { size: 16 },
                color: 'white'
            },
            subtitle: {
                display: true,
                text: ['', ''],
                color: '#aaa',
                font: { size: 12 },
                padding: { bottom: 10 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = wellbeingSurveyScales.Q1scale[0]
                        } else if (value < 38) {
                            valueToUse = wellbeingSurveyScales.Q1scale[1]
                        } else if (value < 68) {
                            valueToUse = wellbeingSurveyScales.Q1scale[2]
                        } else if (value < 88) {
                            valueToUse = wellbeingSurveyScales.Q1scale[3]
                        } else {
                            valueToUse = wellbeingSurveyScales.Q1scale[4]
                        }
                        return valueToUse
                    },
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    }
                }
            }
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {color: gridColor},
                ticks: {
                    color: gridTextColor,
                    stepSize: 25,
                    callback: function (value, index, ticks) {
                        if (value === 0) return wellbeingSurveyScales.Q1scale[0]
                        else if (value === 25) return wellbeingSurveyScales.Q1scale[1]
                        else if (value === 50) return wellbeingSurveyScales.Q1scale[2]
                        else if (value === 75) return wellbeingSurveyScales.Q1scale[3]
                        else if (value === 100) return wellbeingSurveyScales.Q1scale[4]
                        return value;
                    }
                },
                border: {
                    color: borderColor
                },
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})

let wellbeingSurveryQ2 = new Chart(wellbeingChart3Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [], // updated by updateSurveyCharts()
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,


        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: '', // updated by updateSurveyCharts()
                font: { size: 16 },
                color: 'white'
            },
            subtitle: {
                display: true,
                text: ['', 'Jeg føler mig generelt rigtig godt tilpas på min uddannelse'],
                color: '#aaa',
                font: { size: 12 },
                padding: { bottom: 10 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = wellbeingSurveyScales.Q1scale[0]
                        } else if (value < 38) {
                            valueToUse = wellbeingSurveyScales.Q1scale[1]
                        } else if (value < 68) {
                            valueToUse = wellbeingSurveyScales.Q1scale[2]
                        } else if (value < 88) {
                            valueToUse = wellbeingSurveyScales.Q1scale[3]
                        } else {
                            valueToUse = wellbeingSurveyScales.Q1scale[4]
                        }
                        return valueToUse
                    },
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    }
                }
            }
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {color: gridColor},
                ticks: {
                    color: gridTextColor,
                    stepSize: 25,
                    callback: function (value, index, ticks) {
                        if (value === 0) return wellbeingSurveyScales.Q2scale[0]
                        else if (value === 25) return wellbeingSurveyScales.Q2scale[1]
                        else if (value === 50) return wellbeingSurveyScales.Q2scale[2]
                        else if (value === 75) return wellbeingSurveyScales.Q2scale[3]
                        else if (value === 100) return wellbeingSurveyScales.Q2scale[4]
                        return value;
                    }
                },
                border: {
                    color: borderColor
                },
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})

let wellbeingSurveryQ3 = new Chart(wellbeingChart4Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [], // updated by updateSurveyCharts()
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,



        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: '',  // updated by updateSurveyCharts()
                font: { size: 16 },
                color: 'white'
            },
            subtitle: {
                display: true,
                text: ['', 'Har du oplevet at føle dig ensom på studiet?'],
                color: '#aaa',
                font: { size: 12 },
                padding: { bottom: 10 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = wellbeingSurveyScales.Q1scale[0]
                        } else if (value < 38) {
                            valueToUse = wellbeingSurveyScales.Q1scale[1]
                        } else if (value < 68) {
                            valueToUse = wellbeingSurveyScales.Q1scale[2]
                        } else if (value < 88) {
                            valueToUse = wellbeingSurveyScales.Q1scale[3]
                        } else {
                            valueToUse = wellbeingSurveyScales.Q1scale[4]
                        }
                        return valueToUse
                    },
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    }
                }
            }
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {color: gridColor},
                ticks: {
                    color: gridTextColor,
                    stepSize: 25,
                    callback: function (value, index, ticks) {
                        if (value === 0) return wellbeingSurveyScales.Q2scale[0]
                        else if (value === 25) return wellbeingSurveyScales.Q2scale[1]
                        else if (value === 50) return wellbeingSurveyScales.Q2scale[2]
                        else if (value === 75) return wellbeingSurveyScales.Q2scale[3]
                        else if (value === 100) return wellbeingSurveyScales.Q2scale[4]
                        return value;
                    }
                },
                border: {
                    color: borderColor
                },
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})

let wellbeingSurveryQ4 = new Chart(wellbeingChart5Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [], // updated by updateSurveyCharts()
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,



        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: '', // updated by updateSurveyCharts()
                font: { size: 16 },
                color: 'white'
            },
            subtitle: {
                display: true,
                text: ['Har du oplevet stærke stress-symptomer', 'i forbindelse med dit studie i dagligdagen?'],
                color: '#aaa',
                font: { size: 12 },
                padding: { bottom: 10 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = wellbeingSurveyScales.Q1scale[0]
                        } else if (value < 38) {
                            valueToUse = wellbeingSurveyScales.Q1scale[1]
                        } else if (value < 68) {
                            valueToUse = wellbeingSurveyScales.Q1scale[2]
                        } else if (value < 88) {
                            valueToUse = wellbeingSurveyScales.Q1scale[3]
                        } else {
                            valueToUse = wellbeingSurveyScales.Q1scale[4]
                        }
                        return valueToUse
                    },
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    }
                }
            }
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {color: gridColor},
                ticks: {
                    color: gridTextColor,
                    stepSize: 25,
                    callback: function (value, index, ticks) {
                        if (value === 0) return wellbeingSurveyScales.Q2scale[0]
                        else if (value === 25) return wellbeingSurveyScales.Q2scale[1]
                        else if (value === 50) return wellbeingSurveyScales.Q2scale[2]
                        else if (value === 75) return wellbeingSurveyScales.Q2scale[3]
                        else if (value === 100) return wellbeingSurveyScales.Q2scale[4]
                        return value;
                    }
                },
                border: {
                    color: borderColor
                },
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})


// job section
let jobUnemployChart = new Chart(jobUnemployChartCanvas, {
    type: 'bar',
    data: {
        labels: chartAllEduNamesITARstar,
        datasets: [{
            label: [],
            data: [],
            backgroundColor: chartPrimaryColor
        }]
    },
    plugins: [{
        // a line drawn vertically to show avg unemployment pct
        id: 'avgLine',
        afterDatasetsDraw(chart) {
            const { ctx, chartArea: { left, right }, scales: { y } } = chart;

            const yPos = y.getPixelForValue(queriedData.avgBusinessAcademyUnemploymentNewGradPct);

            ctx.save();

            // Draw a linee from edge to edge
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'red';
            ctx.setLineDash([6, 6]); // Dashed styling
            ctx.moveTo(left, yPos);  // Start at very left axis
            ctx.lineTo(right, yPos); // End at very right axis
            ctx.stroke();

            // 3. Draw Text
            ctx.fillStyle = 'red';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(`Gennemsnitlig arbejdsløshed (Erhvervsakademi): ${queriedData.avgBusinessAcademyUnemploymentNewGradPct}%`, left + 5, yPos - 8);

            ctx.restore();
        }
    }],
    options: {


        responsive: true,
        maintainAspectRatio: false,

        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Arbejdsløshed blandt nyuddannede',
                font: {size: 18},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y
                        return value + '%'
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            },
            y: {
                min: 0,
                max: 100,
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            }
        }
    }
})

let jobSurveyQ1 = new Chart(jobSurveyQ1Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabelsITARstar,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Jeg søgte og blev ansat efter et stillingsopslag', ' '],
                font: {size: 16},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    },
                    label: function (context) {
                        const value = context.parsed.x
                        return value + '%'
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})

let jobSurveyQ2 = new Chart(jobSurveyQ2Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabelsITARstar,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,


        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Jeg fik job gennem mit netværk', ' '],
                font: { size: 16 },
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    },
                    label: function (context) {
                        const value = context.parsed.x
                        return value + '%'
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})

let jobSurveyQ3 = new Chart(jobSurveyQ3Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabelsITARstar,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {

        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: ['Jeg fortsatte i job på den arbejdsplads,', 'hvor jeg skrev opgave / projekt / speciale,', 'eller var i praktik'],
                font: {size: 16},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    },
                    label: function (context) {
                        const value = context.parsed.x
                        return value + '%'
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})

let jobSurveyQ4 = new Chart(jobSurveyQ4Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabelsITARstar,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {


        responsive: true,
        maintainAspectRatio: false,

        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: ['Jeg fortsatte i job på den arbejdsplads', 'hvor jeg havde studiejob', ''],
                font: { size: 16 },
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        return textToUse;
                    },
                    label: function (context) {
                        const value = context.parsed.x
                        return value + '%'
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {color: gridColor},
                ticks: {color: gridTextColor},
                border: {color: borderColor},
            },
            y: {
                border: {color: borderColor},
                ticks: {color: gridTextColor},
                grid: {
                    color: gridColor,
                    display: false
                },
            }
        }
    }
})


////// leaflet //////

// map init
let map = L.map('leafletMap').setView([55.695, 12.56], 12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// add markers to EK IT schools
function mapEkSchools() {
    const EKschools = [
        {name: "EK Guldbergsgade", latlng: [55.69149690984243, 12.555008402914718]},
        {name: "EK Landemærket", latlng: [55.68202742413432, 12.576277748303877]},
        {name: "EK Lygten", latlng: [55.706369426829156, 12.539137981532795]},
        {name: "EK Nansensgade", latlng: [55.68192028780662, 12.562680082210507]},
        {name: "EK Prinsesse Charlottes Gade", latlng: [55.6944551895993, 12.550846762451158]}
    ];

    EKschools.forEach(school => {
        L.marker(school.latlng, {
            color: "white", opacity: 0.5,
            fillColor: 'blue', fillOpacity: 0.5, radius: 250,
            pane: 'markerPane'
        }).bindTooltip(`<b>${school.name}</b>`).addTo(map);
    });
}

mapEkSchools()


////// misc functions //////

// modulo function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});


// pipeline for local mingo query
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


function updateSalaryChart(chartType) {
    if (chartType === 1) {
        salaryChart.data.datasets[0].data = queriedData.allSalaryAvg
    } else if (chartType === 2) {
        salaryChart.data.datasets[0].data = queriedData.allSalaryStart
    } else {
        salaryChart.data.datasets[0].data = queriedData.allSalaryHighest
    }
    salaryChart.update()
}

// updateSalaryChart(1)  // show avg
// updateSalaryChart(2)  // show start
// updateSalaryChart(3)  // show highest


function updateSurveryCharts(surveyType) {
    if (surveyType === 1) {
        wellbeingSurveyScales.Q3scale = ['Altid', 'Næsten altid', 'Hverken eller', 'Næsten aldrig', 'Aldrig']
        wellbeingSurveyScales.Q4scale = ['Altid', 'Næsten altid', 'Hverken eller', 'Næsten aldrig', 'Aldrig']

        wellbeingSurveryQ1.options.plugins.title.text = ['De studerende er enige: ', 'Et socialt studiemiljø i topklasse']
        wellbeingSurveryQ1.options.plugins.subtitle.text[0] = ''
        wellbeingSurveryQ1.options.plugins.subtitle.text[1] = queriedData.socialSurvey.socialSurveyQuestions[0]
        wellbeingSurveryQ1.data.datasets[0].data = queriedData.socialSurvey.allQuestion5Answers
        wellbeingSurveryQ1.update()

        wellbeingSurveryQ2.options.plugins.title.text = ['Mere end bare en skole:', 'Langt de fleste føler sig godt tilpas på studiet']
        wellbeingSurveryQ2.options.plugins.subtitle.text[0] = ''
        wellbeingSurveryQ2.options.plugins.subtitle.text[1] = queriedData.socialSurvey.socialSurveyQuestions[1]
        wellbeingSurveryQ2.data.datasets[0].data = queriedData.socialSurvey.allQuestion6Answers
        wellbeingSurveryQ2.update()

        wellbeingSurveryQ3.options.plugins.title.text = ['Ingen elever står alene:', 'Størstedelen oplever sjældent ensomhed']
        wellbeingSurveryQ3.options.plugins.subtitle.text[0] = ''
        wellbeingSurveryQ3.options.plugins.subtitle.text[1] = queriedData.socialSurvey.socialSurveyQuestions[2]
        wellbeingSurveryQ3.data.datasets[0].data = queriedData.socialSurvey.allQuestion7Answers
        wellbeingSurveryQ3.update()

        wellbeingSurveryQ4.options.plugins.title.text = ['Plads til at være menneske:', 'Balance med lav grad af stress i hverdagen']
        wellbeingSurveryQ4.options.plugins.subtitle.text = queriedData.socialSurvey.socialSurveyQuestions[3]
        wellbeingSurveryQ4.data.datasets[0].data = queriedData.socialSurvey.allQuestion8Answers
        wellbeingSurveryQ4.update()
    } else {
        wellbeingSurveyScales.Q3scale = ['Helt uenig', 'Uenig', 'Hverken eller', 'Enig', 'Helt enig']
        wellbeingSurveyScales.Q4scale = ['Helt uenig', 'Uenig', 'Hverken eller', 'Enig', 'Helt enig']

        wellbeingSurveryQ1.options.plugins.title.text = ['Faglighed der løfter dig:', 'Studerende vurderer fagmiljøet helt i top']
        wellbeingSurveryQ1.options.plugins.subtitle.text[0] = ''
        wellbeingSurveryQ1.options.plugins.subtitle.text[1] = queriedData.professionalSurvey.professionalSurveyQuestions[0]
        wellbeingSurveryQ1.data.datasets[0].data = queriedData.professionalSurvey.allQuestion9Answers
        wellbeingSurveryQ1.update()

        wellbeingSurveryQ2.options.plugins.title.text = ['Samarbejde er en hjørnesten på studiet:', 'Vi skaber succesen sammen']
        wellbeingSurveryQ2.options.plugins.subtitle.text = queriedData.professionalSurvey.professionalSurveyQuestions[1]
        wellbeingSurveryQ2.data.datasets[0].data = queriedData.professionalSurvey.allQuestion10Answers
        wellbeingSurveryQ2.update()

        wellbeingSurveryQ3.options.plugins.title.text = ['Her står du aldrig alene med en svær opgave:', 'Vi lærer bedst, når vi vender med hinanden']
        wellbeingSurveryQ3.options.plugins.subtitle.text = queriedData.professionalSurvey.professionalSurveyQuestions[2]
        wellbeingSurveryQ3.data.datasets[0].data = queriedData.professionalSurvey.allQuestion11Answers
        wellbeingSurveryQ3.update()

        wellbeingSurveryQ4.options.plugins.title.text = ['Undervisning der virker:', 'det faglige udbytte af undervisningen er højt']
        wellbeingSurveryQ4.options.plugins.subtitle.text[0] = ''
        wellbeingSurveryQ4.options.plugins.subtitle.text[1] = queriedData.professionalSurvey.professionalSurveyQuestions[3]
        wellbeingSurveryQ4.data.datasets[0].data = queriedData.professionalSurvey.allQuestion12Answers
        wellbeingSurveryQ4.update()
    }
}



function showCharts() {
    // salary chart
    salaryChart.data.datasets[0].data = queriedData.allSalaryAvg
    salaryChart.update()

    // gender charts
    genderBarChart1.data.datasets[0].data = queriedData.allKvoM
    genderBarChart1.data.datasets[1].data = queriedData.allKvoF
    genderBarChart1.update()

    genderPieChart.data.datasets[0].data = [queriedData.totalPctM, queriedData.totalPctF]
    genderPieChart.update()

    genderBarChart2.data.datasets[0].data = queriedData.allPctM
    genderBarChart2.data.datasets[1].data = queriedData.allPctF
    genderBarChart2.update()

    // wellbeing charts
    wellbeingDropoutChart.data.datasets[0].data = queriedData.allDropoutFirstYearPct
    wellbeingDropoutChart.update()

    wellbeingSurveryQ1.data.datasets[0].data = queriedData.socialSurvey.allQuestion5Answers
    wellbeingSurveryQ1.update()
    wellbeingSurveryQ2.data.datasets[0].data = queriedData.socialSurvey.allQuestion6Answers
    wellbeingSurveryQ2.update()
    wellbeingSurveryQ3.data.datasets[0].data = queriedData.socialSurvey.allQuestion7Answers
    wellbeingSurveryQ3.update()
    wellbeingSurveryQ4.data.datasets[0].data = queriedData.socialSurvey.allQuestion8Answers
    wellbeingSurveryQ4.update()

    // job charts
    jobUnemployChart.data.datasets[0].data = queriedData.allUnemployedNewGradPct
    jobUnemployChart.update()

    jobSurveyQ1.data.datasets[0].data = queriedData.jobSurvey.allQuestion1Answers
    jobSurveyQ1.update()
    jobSurveyQ2.data.datasets[0].data = queriedData.jobSurvey.allQuestion2Answers
    jobSurveyQ2.update()
    jobSurveyQ3.data.datasets[0].data = queriedData.jobSurvey.allQuestion3Answers
    jobSurveyQ3.update()
    jobSurveyQ4.data.datasets[0].data = queriedData.jobSurvey.allQuestion4Answers
    jobSurveyQ4.update()
}


async function getChartData() {


    try {

        //mongodb part
        // TODO catch (use local EKdataset)
        const result = await fetch('http://localhost:3000/Ekdata')
        if (result.ok) {


            let localResult = await result.json();
            localResult = localResult[0];
            queriedData.allKvoM = localResult.allKvoM
            queriedData.allKvoF = localResult.allKvoF
            queriedData.allPctM = localResult.allPctM
            queriedData.allPctF = localResult.allPctF
            queriedData.totalPctM = localResult.totalPctM
            queriedData.totalPctF = localResult.totalPctF
        } else {
            console.warn("No results returned");
        }

        //mongodb end


        console.log("trying to connect")
        const response = await fetch('http://localhost:3000/thirdPartyData/');
        if (!response.ok) {
            console.log("didnt work")
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("worked")
        const data = await response.json();

        for (key in data) {
            queriedData[key] = data[key];
        }

        showCharts()
        updateSurveryCharts(1)  // show social survey
        // updateSurveryCharts(2)  // show professional survey

    } catch (error) {
        console.log("local data")
        const aggregator = new mingo.Aggregator(pipeline);

        // TODO catch (use local EKdataset)
        const result = aggregator.run(EKdataset);
        if (result.length > 0) {
            const localResult = result[0];
            console.log("Calculation successful local:", localResult);
            queriedData.allKvoM = localResult.allKvoM
            queriedData.allKvoF = localResult.allKvoF
            queriedData.allPctM = localResult.allPctM
            queriedData.allPctF = localResult.allPctF
            queriedData.totalPctM = localResult.totalPctM
            queriedData.totalPctF = localResult.totalPctF
        } else {
            console.warn("No results returned");
        }


        // TODO  try fetch "/thirdPartyData"


        // TODO catch (use local ThirdPartyData)
        console.log(educationData[0]);

        for (const edu of educationData) {
            console.log(edu.startingSalary);

            queriedData.allSalaryStart.push(edu.startingSalary)
            queriedData.allSalaryAvg.push(edu.averageSalary)
            queriedData.allSalaryHighest.push(edu.highestSalary)

            queriedData.allUnemployedNewGradPct.push(edu.unemploymentNewGraduatePct)
            queriedData.allDropoutFirstYearPct.push(edu.dropOutFirstYearPct)

            queriedData.jobSurvey.allQuestion1Answers.push(edu.reasonsForApplying[0].percent)
            queriedData.jobSurvey.allQuestion2Answers.push(edu.reasonsForApplying[1].percent)
            queriedData.jobSurvey.allQuestion3Answers.push(edu.reasonsForApplying[2].percent)
            queriedData.jobSurvey.allQuestion4Answers.push(edu.reasonsForApplying[3].percent)

            queriedData.socialSurvey.allQuestion5Answers.push(edu.socialEnvironment[0].percent)
            queriedData.socialSurvey.allQuestion6Answers.push(edu.socialEnvironment[1].percent)
            queriedData.socialSurvey.allQuestion7Answers.push(edu.socialEnvironment[2].percent)
            queriedData.socialSurvey.allQuestion8Answers.push(edu.socialEnvironment[3].percent)

            queriedData.professionalSurvey.allQuestion9Answers.push(edu.professionalEnvironment[0].percent)
            queriedData.professionalSurvey.allQuestion10Answers.push(edu.professionalEnvironment[1].percent)
            queriedData.professionalSurvey.allQuestion11Answers.push(edu.professionalEnvironment[2].percent)
            queriedData.professionalSurvey.allQuestion12Answers.push(edu.professionalEnvironment[3].percent)
        }
        for (let i = 0; i < 4; i++) {
            queriedData.jobSurvey.jobSurveyQuestions.push(educationData[0].reasonsForApplying[i].question)
            queriedData.socialSurvey.socialSurveyQuestions.push(educationData[0].socialEnvironment[i].question)
            queriedData.professionalSurvey.professionalSurveyQuestions.push(educationData[0].professionalEnvironment[i].question)
        }
        queriedData.avgBusinessAcademyDropoutPct = otherData.avgBusinessAcademyDropoutPct
        queriedData.avgBusinessAcademyUnemploymentNewGradPct = otherData.avgBusinessAcademyUnemploymentNewGradPct

        console.log(educationData[0].socialEnvironment[3].question);
        
        showCharts()
        updateSurveryCharts(1)  // show social survey
        // updateSurveryCharts(2)  // show professional survey
    }
}

// kvotient fordeling af køn alle udannelser - line chart
// generel kønsfordeling
// udannelses baggrund
getChartData()









////// eventlisteners //////

//// Info Buttons ////

salaryButton.addEventListener("click", function() {
        alert("Da ITAR er en ny uddannelse er der ikke tal på løn endnu. Vi har baseret vores tal på en af de mulige stillinger man kan få som færdiguddannet, navnligt IT-projektleder")
})

jobMultiButton.addEventListener("click", function() {
    alert("Da Itar er for ny en uddannelse til at vi har data på den, har vi antaget at jobløseheden ligger på niveau med de andre uddannelser. Det er også derfor \"jobstart\" er tom for Itar.")
})


//// nav buttons/////


BtmJobstart.addEventListener("click", function () {
    const section = document.querySelector("#jobSection")
    section.scrollIntoView({behavior: "smooth"});
})

Btmløn.addEventListener("click", function () {
    const section = document.querySelector("#salarySection")
    section.scrollIntoView({behavior: "smooth"});
})

BtmKønsfordeling.addEventListener("click", function () {
    const section = document.querySelector("#genderSection")
    section.scrollIntoView({behavior: "smooth"});
})

Btmtrivsel.addEventListener("click", function () {
    const section = document.querySelector("#wellbeingSection")
    section.scrollIntoView({behavior: "smooth"});
})
///////
btmSocial.addEventListener("click", function () {
    updateSurveryCharts(1)

})
btmFaglig.addEventListener("click", function () {
    updateSurveryCharts(2)

})

////


const menu = document.querySelector("#lønmenu");


menu.addEventListener("change", function () {


    if (menu.value === "gennemsnit") {
        updateSalaryChart(1);
    } else if (menu.value === "max") {
        updateSalaryChart(3);
    } else if (menu.value === "min") {
        updateSalaryChart(2);
    }
});


const mobilemenu = document.querySelector("#mobil-menu")
mobilemenu.addEventListener("change", function () {
    if (mobilemenu.value === "#salarySection") {
        const section = document.querySelector("#salarySection")

        section.scrollIntoView({behavior: "smooth"})
    } else if (mobilemenu.value === "#genderSection") {
        const section = document.querySelector("#genderSection")

        section.scrollIntoView({behavior: "smooth"})
    } else if (mobilemenu.value === "#jobSection") {
        const section = document.querySelector("#jobSection")

        section.scrollIntoView({behavior: "smooth"})
    } else if (mobilemenu.value === "#wellbeingSection") {
        const section = document.querySelector("#wellbeingSection")

        section.scrollIntoView({behavior: "smooth"})
    }
})