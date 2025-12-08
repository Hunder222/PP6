console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');
const genderChart1Canvas = document.querySelector('#genderChart1');
const genderChart2Canvas = document.querySelector('#genderChart2');
const genderChart3Canvas = document.querySelector('#genderChart3');
const lønChartCanvas = document.querySelector('#salaryChart')
const welbeingChart1Canvas = document.querySelector('#wellbeingChart1')
const welbeingChart2Canvas = document.querySelector('#wellbeingChart2')
const welbeingChart3Canvas = document.querySelector('#wellbeingChart3')
const welbeingChart4Canvas = document.querySelector('#wellbeingChart4')
const welbeingChart5Canvas = document.querySelector('#wellbeingChart5')
const jobChart1Canvas = document.querySelector('#jobChart1')
const jobChart2Canvas = document.querySelector('#jobChart2')

const queriedData = {
    educations: {
        countITAR: 0,
        countDATA: 0,
        countITTEkvo: 0,
        countMEKO: 0,
        countØKIT: 0,
        countCYBS: 0,
        countOPcyber: 0,
    },
    educationsKvo: {
        countITARKVO: 0,
        countDATAKVO: 0,
        countITTEkvoKVO: 0,
        countMEKOKVO: 0,
        countCYBSKVO: 0,
        countOPcyberKVO: 0,
    },
    educationsGender: {
        countCYBSM: 0,
        countCYBSF: 0,
        countDATAM: 0,
        countDATAF: 0,
        countITTEkvoM: 0,
        countITTEkvoF: 0,
        countMEKOM: 0,
        countMEKOF: 0,
        countITARM: 0,
        countITARF: 0,
        countØKITM: 0,
        countØKITF: 0
    },
    allKvoM: [],
    allKvoF: [],
    allPctM: [],
    allPctF: [],
}


////// charts //////


const borderColor = 'rgba(255, 255, 255, 1)'
const gridColor = 'rgba(255, 255, 255, 1)'
const gridTextColor = 'rgba(255, 255, 255, 1)'
const chartAllEduLabels = ['CYB', 'DATA', 'ITAR', 'IITE', 'MEKO', 'ØKIT']
const chartAllEduNames = [
    'Cybersikkerhed',
    'Datamatiker',
    'IT-Arkitektur',
    'IT-Teknolog',
    'Multimediedesigner',
    'Økonomi og IT'
]

let genderLineChart = new Chart(genderChart1Canvas, {
    type: 'line',
    data: {
        labels: chartAllEduNames, //navn på uddannelse
        datasets: [
            {
                label: "Avg Kvotient Mænd",
                data: [], 
            },
            {
                label: "Avg Kvotient Kvinder",
                data: [],
            }
        ]
    },
    options: { 
        scales: {
            x: { 
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            },
            y: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            }
        }
    }
})

let genderPieChart = new Chart(genderChart2Canvas, {
    type: 'pie',
    data: {
        labels: ["Kønsfordeling på uddannelser"],
        datasets: [{
            label: ["Mand", "Kvinde"], //procentvis kønsfordeling
            data: [], //updateChart
            backgroundColor: '', //brug chart farver fra docs
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            },
            y: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            }
        }
    }
})

let genderBarChart = new Chart(genderChart3Canvas, {
    type: 'bar',
    data: {
        labels: [], //uddannelser
        datasets: [{
            label: [], // uddannelsesnavn
            data: [], //updateChart
            backgroundColor: '' //brug chart farver fra docs
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            },
            y: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            }
        }
    }
})

let lønChart = new Chart(lønChartCanvas, {
    type: 'bar', //skal jeg høre design team omkring
    data: {
        labels: [], //navn på uddannelse
        datasets: [{
            label: [], //update chart
            data: [], //update chart
            backgroundColor: ''
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            },
            y: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            }
        }
    }
})


// wellbeingSection

let welbeingChart1 = new Chart(welbeingChart1Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [], 
            data: [33, 66, 99],
            backgroundColor: ''
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true, 
                text: 'Der er et godt socialt miljø', 
                font: {size: 18},
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
                        return `${value}: ${valueToUse}`
                    },
                    title: function (context) {
                        const dataIndex = context[0].dataIndex;
                        const textToUse = chartAllEduNames[dataIndex]
                        // For example, display the category label only
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
                    maxRotation: 0,
                    minRotation: 0,
                    align: 'center',
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

let welbeingChart2 = new Chart(welbeingChart2Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: ''
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Der er et godt socialt miljø',
                font: {size: 18},
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
                        // For example, display the category label only
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

let welbeingChart3 = new Chart(welbeingChart3Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: ''
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Der er et godt socialt miljø',
                font: {size: 18},
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
                        // For example, display the category label only
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

let welbeingChart4 = new Chart(welbeingChart4Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: ''
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Der er et godt socialt miljø',
                font: {size: 18},
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
                        // For example, display the category label only
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

let welbeingChart5 = new Chart(welbeingChart5Canvas, {
    type: 'bar',
    data: {
        labels: chartAllEduLabels,
        datasets: [{
            label: [],
            data: [33, 66, 99],
            backgroundColor: ''
        }]
    },
    options: {
        indexAxis: 'y',
        label: {display: false},
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Der er et godt socialt miljø',
                font: {size: 18},
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
                        // For example, display the category label only
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


let jobChart1 = new Chart(jobChart1Canvas, {
    type: 'bar',
    data: {
        labels: [], //uddannelse
        datasets: [{
            label: [], //løngrundlag (måske opdelt i køn)
            data: [],
            options: {
                indexAxis: 'y'
            }, //update chart
            backgroundColor: ''
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            },
            y: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            }
        }
    }
})

let jobChart2 = new Chart(jobChart2Canvas, {
    type: 'bar',
    data: {
        labels: [], //uddannelse
        datasets: [{
            label: [], //arbejdsløshed (måske opdelt i køn)
            data: [],
            options: {
                indexAxis: 'y'
            }, //update chart
            backgroundColor: ''
        }]
    },
    options: {
        scales: {
            x: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            },
            y: {
                border: {
                    color: borderColor
                },
                grid: {
                    color: gridColor
                },
                ticks: {
                    color: gridTextColor
                }
            }
        }
    }
})


////// misc functions //////

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});












const pipeline = [
    {
        // STAGE 1: Sum everything up
        $group: {
            _id: null,
            totalCount: { $sum: 1 },

            // sum gender kvotient
            avgCYBSkvoM: {
                $avg: {
                    $cond: [
                        {
                            $and: [
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"] },
                                { $eq: ["$Gender", "Mand"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"] },
                                { $eq: ["$Gender", "Kvinde"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"] },
                                { $eq: ["$Gender", "Mand"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"] },
                                { $eq: ["$Gender", "Kvinde"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"] },
                                { $eq: ["$Gender", "Mand"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"] },
                                { $eq: ["$Gender", "Kvinde"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"] },
                                { $eq: ["$Gender", "Mand"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"] },
                                { $eq: ["$Gender", "Kvinde"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"] },
                                { $eq: ["$Gender", "Mand"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"] },
                                { $eq: ["$Gender", "Kvinde"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"] },
                                { $eq: ["$Gender", "Mand"] }
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
                                { $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"] },
                                { $eq: ["$Gender", "Kvinde"] }
                            ]
                        },
                        "$KVOTIENT", null
                    ]
                }
            },

            // the followwing is collapsed for better overview
            // count edu used to project pct in next stage
            countCYBS: { $sum: { $cond: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"] }, 1, 0] } },
            countDATA: { $sum: { $cond: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"] }, 1, 0] } },
            countITTE: { $sum: { $cond: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"] }, 1, 0] } },
            countMEKO: { $sum: { $cond: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"] }, 1, 0] } },
            countITAR: { $sum: { $cond: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"] }, 1, 0] } },
            countØKIT: { $sum: { $cond: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"] }, 1, 0] } },
            

            // count gender edu
            countCYBSM: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"] }, { $eq: ["$Gender", "Mand"] }] }, 1, 0] } },
            countCYBSF: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-sikkerhed"] }, { $eq: ["$Gender", "Kvinde"] }] }, 1, 0] } },
            countDATAM: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"] }, { $eq: ["$Gender", "Mand"] }] }, 1, 0] } },
            countDATAF: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"] }, { $eq: ["$Gender", "Kvinde"] }] }, 1, 0] } },
            countMEKOM: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"] }, { $eq: ["$Gender", "Mand"] }] }, 1, 0] } },
            countMEKOF: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"] }, { $eq: ["$Gender", "Kvinde"] }] }, 1, 0] } },
            countITTEM: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"] }, { $eq: ["$Gender", "Mand"] }] }, 1, 0] } },
            countITTEF: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"] }, { $eq: ["$Gender", "Kvinde"] }] }, 1, 0] } },
            countITARM: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"] }, { $eq: ["$Gender", "Mand"] }] }, 1, 0] } },
            countITARF: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"] }, { $eq: ["$Gender", "Kvinde"] }] }, 1, 0] } },
            countØKITM: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"] }, { $eq: ["$Gender", "Mand"] }] }, 1, 0] } },
            countØKITF: { $sum: { $cond: [{ $and: [{ $eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"] }, { $eq: ["$Gender", "Kvinde"] }] }, 1, 0] } },
        }
    },
    {
        $project: {
            _id: 0,

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
                    { $multiply: [{ $divide: ["$countCYBSM", "$countCYBS"] }, 100] }, 1
                ] 
            },
            pctCYBSF: { 
                $round: [
                    { $multiply: [{ $divide: ["$countCYBSF", "$countCYBS"] }, 100] }, 1
                ] 
            },
            pctDATAM: { 
                $round: [
                    { $multiply: [{ $divide: ["$countDATAM", "$countDATA"] }, 100] }, 1
                ] 
            },
            pctDATAF: { 
                $round: [
                    { $multiply: [{ $divide: ["$countDATAF", "$countDATA"] }, 100] }, 1
                ] 
            },
            pctMEKOM: { 
                $round: [
                    { $multiply: [{ $divide: ["$countMEKOM", "$countMEKO"] }, 100] }, 1
                ] 
            },
            pctMEKOF: {
                $round: [
                    { $multiply: [{ $divide: ["$countMEKOF", "$countMEKO"] }, 100] }, 1
                ] 
            },
            pctITTEM: { 
                $round: [
                    { $multiply: [{ $divide: ["$countITTEM", "$countITTE"] }, 100] }, 1
                ] 
            },
            pctITTEF: {
                $round: [
                    { $multiply: [{ $divide: ["$countITTEF", "$countITTE"] }, 100] }, 1
                ] 
            },
            pctITARM: { 
                $round: [
                    { $multiply: [{ $divide: ["$countITARM", "$countITAR"] }, 100] }, 1
                ] 
            },
            pctITARF: {
                $round: [
                    { $multiply: [{ $divide: ["$countITARF", "$countITAR"] }, 100] }, 1
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
            allPctM: ["$pctCYBSM", "$pctDATAM", "$pctMEKOM", "$pctITTEM", "$pctITARM", "$pctØKITM"],
            allPctF: ["$pctCYBSF", "$pctDATAF", "$pctMEKOF", "$pctITTEF", "$pctITARF", "$pctØKITF"]
        }
    }
];



async function getChartData() {
    const aggregator = new mingo.Aggregator(pipeline);
    const result = aggregator.run(EKdataset);

    if (result.length > 0) {
        const stats = result[0];
        console.log("Calculation successful:", stats);
        console.log("allKvoM:", stats.allKvoM);
        queriedData.allKvoM = stats.allKvoM
        queriedData.allKvoF = stats.allKvoF
        queriedData.allPctM = stats.allPctM
        queriedData.allPctF = stats.allPctF
    } else {
        console.warn("No results returned");
    }
}

// kvotient fordeling af køn alle udannelser - line chart
// generel kønsfordeling
// udannelses baggrund

getChartData()

function showKvotient() {
    console.log(queriedData.allKvoF);
    genderLineChart.data.datasets[0].data = queriedData.allKvoM 
    genderLineChart.data.datasets[1].data = queriedData.allKvoF 
    genderLineChart.update()
    
}

showKvotient()

function showGender() {
    genderPieChart.data.datasets[0].data = queriedData.educationsGender.countCYBSM
    genderPieChart.data.datasets[1].data = queriedData.educationsGender.countCYBSF
    genderPieChart.data.datasets[2].data = queriedData.educationsGender.countDATAM
    genderPieChart.data.datasets[3].data = queriedData.educationsGender.countDATAF
    genderPieChart.data.datasets[4].data = queriedData.educationsGender.countITTEkvoM
    genderPieChart.data.datasets[5].data = queriedData.educationsGender.countITTEkvoF
    genderPieChart.data.datasets[6].data = queriedData.educationsGender.countMEKOM
    genderPieChart.data.datasets[7].data = queriedData.educationsGender.countMEKOF
    genderPieChart.data.datasets[8].data = queriedData.educationsGender.countITARM
    genderPieChart.data.datasets[9].data = queriedData.educationsGender.countØKITM
    genderPieChart.data.datasets[10].data = queriedData.educationsGender.countØKITF
}

showGender()

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});


////// eventlisteners //////









