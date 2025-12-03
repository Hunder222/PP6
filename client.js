console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');
const lineChartCanvas = document.querySelector('#genderChart1');
const pieChartCanvas = document.querySelector('#genderChart2');
const barChartCanvas = document.querySelector('#genderChart3');
const lønChartCanvas = document.querySelector('#salaryChart')
const jobChart1Canvas = document.querySelector('#jobChart1')
const jobChart2Canvas = document.querySelector('#jobChart2')


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

function getKvotient() {
    const pipeline = [
        {

        }
    ]
    const queryResult = new mingo.Count(pipeline).run(EKdataset);

    const result = queryResult.all ? queryResult.all() : queryResult;

    if (result.length > 0) {
        const resultObj = result[0].general;

        console.log(resultObj)
    }
}

getKvotient()

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});


////// eventlisteners //////










