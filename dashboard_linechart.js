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

document.addEventListener("DOMContentLoaded", function() {
    const periodSelect = document.getElementById("period-select");
    const chartContainer = document.getElementById("chart-container");

    for (const quarter in quartersData) {
        const option = document.createElement("option");
        option.value = quarter;
        option.textContent = quarter;
        periodSelect.appendChild(option);
    }

    periodSelect.value = "Q1";
    updateChart("Q1");

    periodSelect.addEventListener("change", function() {
        updateChart(this.value);
    });

    function updateChart(selectedQuarter) {
        const chart = Highcharts.chart(chartContainer, {
            title: {
                text: 'Line Chart'
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
});
