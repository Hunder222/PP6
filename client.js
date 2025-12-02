console.log(EKdataset); // local dataset from EKDatasetLocal.js imported via index.html

////// import and DOM //////
const subSections = document.querySelectorAll('.subSections');
const lineChartCanvas = document.querySelectorAll('#genderChart1');
const pieChartCanvas = document.querySelectorAll('#genderChart2');
const barChartCanvas = document.querySelectorAll('#genderChart3');






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
            backgroundColor: '', //brug chart farver fra docs
        }]
    }
})








////// misc functions //////

// function to reverse every 2nd subsection direction, for zigzag effekt
subSections.forEach((section, i) => {
    if (i % 2 !== 0) {
        section.classList.add('reversed');
    }
});









////// eventlisteners //////










