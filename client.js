console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

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
const jobChart2Canvas = document.querySelector('#jobChart2')
const jobChart3Canvas = document.querySelector('#jobChart3')
const jobChart4Canvas = document.querySelector('#jobChart4')
const jobChart5Canvas = document.querySelector('#jobChart5')
const btmSocial = document.querySelector("#kvotient")
const btmFaglig = document.querySelector("#alder")
const BtmJobstart = document.querySelector("#BtmJobstart")
const Btmløn = document.querySelector("#Btmløn")
const BtmKønsfordeling = document.querySelector("#BtmKønsfordeling")
const Btmtrivsel = document.querySelector("#Btmtrivsel")
const dropdowngen = document.querySelector("#dropdowngen")
const dropdownmax = document.querySelector("#dropdownmax")
const dropdownmin = document.querySelector("#dropdownmin")

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
const gridColor = 'rgba(255, 255, 255, 0.8)'
const gridTextColor = 'rgba(255, 255, 255, 0.8)'
const genderChartColorM = 'rgba(73, 141, 186, 0.9)'
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

// salary section

let salaryChart = new Chart(salaryChartCanvas, {
    type: 'bar', //skal jeg høre design team omkring
    data: {
        labels: chartAllEduNames,
        datasets: [{
            label: [], //update chart
            data: [], //update chart
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        plugins: {
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
let genderLineChart = new Chart(genderChart1Canvas, {
    type: 'line',
    data: {
        labels: chartAllEduNames, //navn på uddannelse
        datasets: [
            {
                label: "Avg Kvotient Mænd",
                data: [],
                borderColor: genderChartColorM,
                borderWidth: 3
            },
            {
                label: "Avg Kvotient Kvinder",
                data: [],
                borderColor: genderChartColorF,
                borderWidth: 4
            }
        ]
    },
    options: {
        plugins: {
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

let genderBarChart = new Chart(genderChart3Canvas, {
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
    options: {
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

let wellbeingSurveryQ1 = new Chart(wellbeingChart2Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Der er et godt socialt miljø', ' '],
                font: {size: 14},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = 'Meget uenig'
                        } else if (value < 38) {
                            valueToUse = 'Uenig'
                        } else if (value < 68) {
                            valueToUse = 'Hverken eller'
                        } else if (value < 88) {
                            valueToUse = 'Enig'
                        } else {
                            valueToUse = 'Helt Enig'
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
                        if (value === 0) return 'Helt uenig';
                        if (value === 25) return 'Uenig';
                        if (value === 50) return 'Hverken eller';
                        if (value === 75) return 'Enig';
                        if (value === 100) return 'Helt enig';
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
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Jeg føler mig generelt rigtig godt tilpas', 'på min uddannelse'],
                font: {size: 14},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = 'Meget uenig'
                        } else if (value < 38) {
                            valueToUse = 'Uenig'
                        } else if (value < 68) {
                            valueToUse = 'Hverken eller'
                        } else if (value < 88) {
                            valueToUse = 'Enig'
                        } else {
                            valueToUse = 'Helt Enig'
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
                        if (value === 0) return 'Helt uenig';
                        if (value === 25) return 'Uenig';
                        if (value === 50) return 'Hverken eller';
                        if (value === 75) return 'Enig';
                        if (value === 100) return 'Helt enig';
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
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Har du oplevet at føle dig ensom på studiet?', ' '],
                font: {size: 14},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = 'Altid'
                        } else if (value < 38) {
                            valueToUse = 'Næsten altid'
                        } else if (value < 68) {
                            valueToUse = 'Hverken eller'
                        } else if (value < 88) {
                            valueToUse = 'Næsten aldrig'
                        } else {
                            valueToUse = 'Aldrig'
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
                        if (value === 0) return 'Altid';
                        if (value === 25) return 'Næsten altid';
                        if (value === 50) return 'Hverken eller';
                        if (value === 75) return 'Næsten aldrig';
                        if (value === 100) return 'Aldrig';
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
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Har du oplevet stærke stress-symptomer', 'i forbindelse med dit studie i dagligdagen?'],
                font: {size: 14},
                color: 'white'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.x
                        let valueToUse
                        if (value < 13) {
                            valueToUse = 'Altid'
                        } else if (value < 38) {
                            valueToUse = 'Næsten altid'
                        } else if (value < 68) {
                            valueToUse = 'Hverken eller'
                        } else if (value < 88) {
                            valueToUse = 'Næsten aldrig'
                        } else {
                            valueToUse = 'Aldrig'
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
                        if (value === 0) return 'Altid';
                        if (value === 25) return 'Næsten altid';
                        if (value === 50) return 'Hverken eller';
                        if (value === 75) return 'Næsten aldrig';
                        if (value === 100) return 'Aldrig';
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
        labels: chartAllEduNames,
        datasets: [{
            label: [], //løngrundlag (måske opdelt i køn)
            data: [1, 3, 2],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
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

let jobChart2 = new Chart(jobChart2Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Jeg søgte og blev ansat efter et stillingsopslag', ' '],
                font: {size: 14},
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

let jobChart3 = new Chart(jobChart3Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Jeg søgte og blev ansat efter et stillingsopslag', ' '],
                font: {size: 14},
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

let jobChart4 = new Chart(jobChart4Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: ['Jeg fortsatte i job på den arbejdsplads,', 'hvor jeg skrev opgave / projekt / speciale,', 'eller var i praktik'],
                font: {size: 14},
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

let jobChart5 = new Chart(jobChart5Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: chartPrimaryColor
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: [' ', 'Jeg fortsatte i job på den arbejdsplads', 'hvor jeg havde studiejob'],
                font: {size: 14},
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


async function getChartData() {
    const aggregator = new mingo.Aggregator(pipeline);


    // TODO try fetch "/getEKchartData"


    // TODO catch (use local EKdataset)
    const result = aggregator.run(EKdataset);
    if (result.length > 0) {
        const localResult = result[0];
        console.log("Calculation successful:", localResult);
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
        queriedData.jobSurvey.jobSurveyQuestions.push(educationData[0].reasonsForApplying[i])
        queriedData.socialSurvey.socialSurveyQuestions.push(educationData[0].socialEnvironment[i])
        queriedData.professionalSurvey.professionalSurveyQuestions.push(educationData[0].professionalEnvironment[i])
    }

    console.log(queriedData.allDropoutFirstYearPct);
}

// kvotient fordeling af køn alle udannelser - line chart
// generel kønsfordeling
// udannelses baggrund

getChartData()

function showCharts() {
    // salary chart
    salaryChart.data.datasets[0].data = queriedData.allSalaryAvg
    salaryChart.update()

    // gender charts
    genderLineChart.data.datasets[0].data = queriedData.allKvoM
    genderLineChart.data.datasets[1].data = queriedData.allKvoF
    genderLineChart.update()

    genderPieChart.data.datasets[0].data = [queriedData.totalPctM, queriedData.totalPctF]
    genderPieChart.update()

    genderBarChart.data.datasets[0].data = queriedData.allPctM
    genderBarChart.data.datasets[1].data = queriedData.allPctF
    genderBarChart.update()

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

    jobChart2.data.datasets[0].data = queriedData.jobSurvey.allQuestion1Answers
    jobChart2.update()
    jobChart3.data.datasets[0].data = queriedData.jobSurvey.allQuestion2Answers
    jobChart3.update()
    jobChart4.data.datasets[0].data = queriedData.jobSurvey.allQuestion3Answers
    jobChart4.update()
    jobChart5.data.datasets[0].data = queriedData.jobSurvey.allQuestion4Answers
    jobChart5.update()
}

showCharts()

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
        wellbeingSurveryQ1.data.datasets[0].data = queriedData.socialSurvey.allQuestion5Answers
        wellbeingSurveryQ1.update()
        wellbeingSurveryQ2.data.datasets[0].data = queriedData.socialSurvey.allQuestion6Answers
        wellbeingSurveryQ2.update()
        wellbeingSurveryQ3.data.datasets[0].data = queriedData.socialSurvey.allQuestion7Answers
        wellbeingSurveryQ3.update()
        wellbeingSurveryQ4.data.datasets[0].data = queriedData.socialSurvey.allQuestion8Answers
        wellbeingSurveryQ4.update()
    } else {
        wellbeingSurveryQ1.data.datasets[0].data = queriedData.professionalSurvey.allQuestion9Answers
        wellbeingSurveryQ1.update()
        wellbeingSurveryQ2.data.datasets[0].data = queriedData.professionalSurvey.allQuestion10Answers
        wellbeingSurveryQ2.update()
        wellbeingSurveryQ3.data.datasets[0].data = queriedData.professionalSurvey.allQuestion11Answers
        wellbeingSurveryQ3.update()
        wellbeingSurveryQ4.data.datasets[0].data = queriedData.professionalSurvey.allQuestion12Answers
        wellbeingSurveryQ4.update()
    }
}

// updateSurveryCharts(1)  // show social survey
// updateSurveryCharts(2)  // show professional survey


////// eventlisteners //////


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
    }
    else if (menu.value === "max") {
        updateSalaryChart(2);
    }
    else if (menu.value === "min") {
        updateSalaryChart(3);
    }
});


const mobilemenu = document.querySelector("#mobil-menu")
mobilemenu.addEventListener("change", function (){
     if (mobilemenu.value === "#salarySection"){
         const section = document.querySelector("#salarySection")

         section.scrollIntoView({behavior: "smooth"})
     }
     else if (mobilemenu.value === "#genderSection"){
         const section = document.querySelector("#genderSection")

         section.scrollIntoView({behavior: "smooth"})
     }
     else if (mobilemenu.value === "#jobSection"){
         const section = document.querySelector("#jobSection")

         section.scrollIntoView({behavior: "smooth"})
     }
     else if (mobilemenu.value === "#wellbeingSection"){
         const section = document.querySelector("#wellbeingSection")

         section.scrollIntoView({behavior: "smooth"})
     }
})