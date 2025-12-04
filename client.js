console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');
const lineChartCanvas = document.querySelector('#genderChart1');
const pieChartCanvas = document.querySelector('#genderChart2');
const barChartCanvas = document.querySelector('#genderChart3');
const lønChartCanvas = document.querySelector('#salaryChart')
const jobChart1Canvas = document.querySelector('#jobChart1')
const jobChart2Canvas = document.querySelector('#jobChart2')

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
    }
}


////// charts //////
let lineChart = new Chart(lineChartCanvas, {
    type: 'line',
    data: {
        labels: [], //navn på uddannelse
        datasets: [{
            label: '',
            data: [], //kvotient
            backgroundColor: '', //brug chart farver fra docs
        }]
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
    }
})


////// misc functions //////

const pipeline = {
    $group: {
        _id: "$INSTITUTIONSAKT_BETEGNELSE",
        totalCount: {$sum: 1},
        countITArk: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, 1, 0]}},
        countData: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, 1, 0]}},
        countITTek: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, 1, 0]}},
        countMulti: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, 1, 0]}},
        countØko: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, 1, 0]}},
        countCyber: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Cybersikkerhed"]}, 1, 0]}},
        countOPcyber: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Operationel Cybersikkerhed"]}, 1, 0]}},

        countITArkKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "PB i IT-arkitektur"]}, "$KVOTIENT", null]}},
        countDataKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Datamatiker"]}, "$KVOTIENT", null]}},
        countITTekKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "IT-teknolog"]}, "$KVOTIENT", null]}},
        countMultiKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Multimediedesigner"]}, "$KVOTIENT", null]}},
        countØkoKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Økonomi og it"]}, "$KVOTIENT", null]}},
        countCyberKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Cybersikkerhed"]}, "$KVOTIENT", null]}},
        countOPcyberKVO: {$sum: {$cond: [{$eq: ["$INSTITUTIONSAKT_BETEGNELSE", "Operationel Cybersikkerhed"]}, "$KVOTIENT", null]}},
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
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countITArkKVO
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countDataKVO
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countITTekKVO
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countMultiKVO
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countØkoKVO
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countCyberKVO
    lineChart.data.datasets[0].data = queriedData.educationsKvo.countOPcyberKVO

    lineChart.update()
}

showKvotient()

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});


////// eventlisteners //////










