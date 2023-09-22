document.getElementById("menu-button").addEventListener("click", function () {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

Highcharts.chart('pie-chart-container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Pie Chart'
    },
    series: [{
        name: 'Categories',
        data: [{
            name: 'Attributed',
            y: 35
        }, {
            name: 'Unattributed',
            y: 1023
        }]
    }]
});
