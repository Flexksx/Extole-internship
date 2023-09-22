function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

const quartersData = {
    Q1: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
    Q2: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
    Q3: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
    Q4: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
};

function updateBarChart(selectedQuarter) {
    const chart = Highcharts.chart('bar-chart-container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Bar Chart'
        },
        xAxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12']
        },
        yAxis: {
            title: {
                text: 'Contribution Rate'
            }
        },
        series: [{
            name: "CR, %",
            data: quartersData[selectedQuarter]
        }]
    });
}

updateBarChart('Q1');
