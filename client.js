console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');
const lineChartCanvas = document.querySelector('#genderChart1');
const pieChartCanvas = document.querySelector('#genderChart2');
const barChartCanvas = document.querySelector('#genderChart3');
const lønChartCanvas = document.querySelector('#salaryChart')
const jobChart1Canvas = document.querySelector('#jobChart1')
const jobChart2Canvas = document.querySelector('#jobChart2')
const chartLabels = ["Cybersikkerhed", "Datamatiker", "IT-sikkerhed", "Multimediedesigner", "PB i IT-arkitektur", "Økonomi og it"]

const queriedData = {
    educations: {
        countITArk: 0,
        countData: 0,
        countITTek: 0,
        countMulti: 0,
        countØko: 0,
        countCyber: 0,
        countOPcyber: 0,
    },
    educationsKvo: {
        countITArkKVO: 0,
        countDataKVO: 0,
        countITTekKVO: 0,
        countMultiKVO: 0,
        countCyberKVO: 0,
        countOPcyberKVO: 0,
    },
    educationsGender: {
        countCyberGenderM: 0,
        countCyberGenderF: 0,
        countDataGenderM: 0,
        countDataGenderF: 0,
        countITTekGenderM: 0,
        countITTekGenderF: 0,
        countMultiGenderM: 0,
        countMultiGenderF: 0,
        countITArkGenderM: 0,
        countITArkGenderF: 0,
        countØkoGenderM: 0,
        countØkoGenderF: 0
    }
}


////// charts //////


const borderColor = 'rgba(255, 255, 255, 1)'
const gridColor = 'rgba(255, 255, 255, 1)'
const gridTextColor = 'rgba(255, 255, 255, 1)'


let lineChart = new Chart(lineChartCanvas, {
    type: 'line',
    data: {
        labels: chartLabels, //navn på uddannelse
        datasets: [{
            label: [],
            data: [], //kvotient
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

let pieChart = new Chart(pieChartCanvas, {
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

let barChart = new Chart(barChartCanvas, {
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

const pipeline = {
    $group: {
        _id: "$INSTITUTIONSAKT_BETEGNELSE",
        totalCount: {$sum: 1},
        countCyber: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Cybersikkerhed"]}, 1, 0]}},
        countData: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, 1, 0]}},
        countITTek: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, 1, 0]}},
        countMulti: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, 1, 0]}},
        countITArk: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, 1, 0]}},
        countØko: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, 1, 0]}},

        countCyberKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Cybersikkerhed"]}, "$KVOTIENT", null]}},
        countDataKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, "$KVOTIENT", null]}},
        countMultiKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, "$KVOTIENT", null]}},
        countITTekKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, "$KVOTIENT", null]}},
        countITArkKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, "$KVOTIENT", null]}},
        countØkoKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, "$KVOTIENT", null]}},

        countCyberGenderM: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Cybersikkerhed"]}, {$eq: ["$Køn", "Mand"]}, 1, 0]}},
        countCyberGenderF: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Cybersikkerhed"]}, {$eq: ["$Køn", "Kvinde"]}, 1, 0]}},
        countDataGenderM : {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, {$eq: ["$Køn", "Mand"]}, 1, 0]}},
        countDataGenderF : {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, {$eq: ["$Køn", "Kvinde"]}, 1, 0]}},
        countITTekGenderM: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-Teknolog"]}, {$eq: ["$Køn", "Mand"]}, 1, 0]}},
        countITTekGenderF: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, {$eq: ["$Køn", "Kvinde"]}, 1, 0]}},
        countMultiGenderM: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, {$eq: ["$Køn", "Mand"]}, 1, 0]}},
        countMultiGenderF: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, {$eq: ["$Køn", "Kvinde"]}, 1, 0]}},
        countITArkGenderM: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, {$eq: ["$Køn", "Mand"]}, 1, 0]}},
        countITArkGenderF: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, {$eq: ["$Køn", "Kvinde"]}, 1, 0]}},
        countØkoGenderM: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, {$eq: ["$Køn", "Mand"]}, 1, 0]}},
        countØkoGenderF: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, {$eq: ["$Køn", "Kvinde"]}, 1, 0]}},

    }

}

function getKvotient() {

    const queryResult = new mingo.Aggregator(pipeline).run(EKdataset);

    const result = queryResult.all ? queryResult.all() : queryResult;

    if (result.length > 0) {
        const resultObj = result[0].general;

        console.log(resultObj)
    }
}

getKvotient()

function showKvotient() {
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countCyberKVO
    lineChart.data.datasets[1].data = queriedData.educationsKvo.countDataKVO
    lineChart.data.datasets[2].data = queriedData.educationsKvo.countITTekKVO
    lineChart.data.datasets[3].data = queriedData.educationsKvo.countMultiKVO
    lineChart.data.datasets[4].data = queriedData.educationsKvo.countITArkKVO
    lineChart.data.datasets[5].data = queriedData.educationsKvo.countØkoKVO
}

showKvotient()

function showGender() {
    pieChart.data.datasets[0].data = queriedData.educationsGender.countCyberGenderM
    pieChart.data.datasets[1].data = queriedData.educationsGender.countCyberGenderF
    pieChart.data.datasets[2].data = queriedData.educationsGender.countDataGenderM
    pieChart.data.datasets[3].data = queriedData.educationsGender.countDataGenderF
    pieChart.data.datasets[4].data = queriedData.educationsGender.countITTekGenderM
    pieChart.data.datasets[5].data = queriedData.educationsGender.countITTekGenderF
    pieChart.data.datasets[6].data = queriedData.educationsGender.countMultiGenderM
    pieChart.data.datasets[7].data = queriedData.educationsGender.countMultiGenderF
    pieChart.data.datasets[8].data = queriedData.educationsGender.countITArkGenderM
    pieChart.data.datasets[9].data = queriedData.educationsGender.countØkoGenderM
    pieChart.data.datasets[10].data = queriedData.educationsGender.countØkoGenderF
}

showGender()

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});


////// eventlisteners //////










