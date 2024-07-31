// Colors
var colors = ["#727cf5", "#6c757d", "#0acf97", "#fa5c7c", "#e3eaef"];
var dataColors = $("#simple-pie").data("colors");
colors = dataColors ? dataColors.split(",") : colors;

// Simple Pie Chart
var pieOptions = {
    chart: { height: 320, type: "pie" },
    series: [44, 55, 41, 17, 15],
    labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
    colors: colors,
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: { height: 240 },
            legend: { show: false }
        }
    }]
};
var pieChart = new ApexCharts(document.querySelector("#simple-pie"), pieOptions);
pieChart.render();

// Simple Donut Chart
colors = ["#39afd1", "#ffbc00", "#313a46", "#fa5c7c", "#0acf97"];
dataColors = $("#simple-donut").data("colors");
colors = dataColors ? dataColors.split(",") : colors;

var donutOptions = {
    chart: { height: 320, type: "donut" },
    series: [44, 55, 41, 17, 15],
    labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
    colors: colors,
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: { height: 240 },
            legend: { show: false }
        }
    }]
};
var donutChart = new ApexCharts(document.querySelector("#simple-donut"), donutOptions);
donutChart.render();

// Monochrome Pie Chart
var monochromeOptions = {
    chart: { height: 320, type: "pie" },
    series: [25, 15, 44, 55, 41, 17],
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7
    },
    theme: { monochrome: { enabled: true } },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: { height: 240 },
            legend: { show: false }
        }
    }]
};
var monochromeChart = new ApexCharts(document.querySelector("#monochrome-pie"), monochromeOptions);
monochromeChart.render();

// Gradient Donut Chart
colors = ["#39afd1", "#ffbc00", "#313a46", "#fa5c7c", "#0acf97"];
dataColors = $("#gradient-donut").data("colors");
colors = dataColors ? dataColors.split(",") : colors;

var gradientDonutOptions = {
    chart: { height: 320, type: "donut" },
    series: [44, 55, 41, 17, 15],
    labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
    colors: colors,
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7
    },
    fill: { type: "gradient" },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: { height: 240 },
            legend: { show: false }
        }
    }]
};
var gradientDonutChart = new ApexCharts(document.querySelector("#gradient-donut"), gradientDonutOptions);
gradientDonutChart.render();

// Patterned Donut Chart
colors = ["#39afd1", "#ffbc00", "#727cf5", "#0acf97"];
dataColors = $("#patterned-donut").data("colors");
colors = dataColors ? dataColors.split(",") : colors;

// Make the AJAX request to get the data
jQuery.post('/GetApointmentForDonutChart')
    .done(function (res) {
        var seriesData = [];
        var labelsData = [];

        for (var i = 0; i < res.length; i++) {
            seriesData.push(res[i].totalAppoint); // Assuming res[i].totalAppoint is the data point
            labelsData.push(res[i].yearMonth); // Assuming res[i].yearMonth is the label
        }

        var patternedDonutOptions = {
            chart: {
                height: 320,
                type: "donut",
                dropShadow: {
                    enabled: true,
                    color: "#111",
                    top: -1,
                    left: 3,
                    blur: 3,
                    opacity: 0.2
                }
            },
            stroke: { show: true, width: 2 },
            series: seriesData, // Assuming this is an array of numbers
            colors: colors,
            labels: labelsData, // Assuming this is an array of strings
            dataLabels: { dropShadow: { blur: 3, opacity: 0.8 } },
            fill: {
                type: "pattern",
                opacity: 1,
                pattern: {
                    enabled: true,
                    style: ["verticalLines", "squares", "horizontalLines", "circles", "slantedLines"]
                }
            },
            states: { hover: { enabled: false } },
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                verticalAlign: "middle",
                floating: false,
                fontSize: "14px",
                offsetX: 0,
                offsetY: 7
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: { height: 240 },
                    legend: { show: false }
                }
            }]
        };

        // Initialize and render the chart with the options
        var patternedDonutChart = new ApexCharts(document.querySelector("#patterned-donut"), patternedDonutOptions);
        patternedDonutChart.render();
    })
    .fail(function () {
        alert("error");
    });

// Ensure colors variable is defined
var colors = ["#727cf5", "#6c757d", "#0acf97", "#fa5c7c", "#e3eaef"];


// Image Pie Chart
colors = ["#727cf5", "#6c757d", "#0acf97", "#fa5c7c"];
dataColors = $("#image-pie").data("colors");
colors = dataColors ? dataColors.split(",") : colors;

var imagePieOptions = {
    chart: { height: 320, type: "pie" },
    labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
    colors: colors,
    series: [44, 33, 54, 45],
    fill: {
        type: "image",
        opacity: 0.85,
        image: {
            src: ["assets/images/small/small-1.jpg", "assets/images/small/small-2.jpg", "assets/images/small/small-3.jpg", "assets/images/small/small-4.jpg"],
            width: 25,
            imagedHeight: 25
        }
    },
    stroke: { width: 4 },
    dataLabels: { enabled: false },
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: { height: 240 },
            legend: { show: false }
        }
    }]
};
var imagePieChart = new ApexCharts(document.querySelector("#image-pie"), imagePieOptions);
imagePieChart.render();

// Update Donut Chart
colors = ["#727cf5", "#6c757d", "#0acf97", "#fa5c7c"];
dataColors = $("#update-donut").data("colors");
colors = dataColors ? dataColors.split(",") : colors;

var updateDonutOptions = {
    chart: { height: 320, type: "donut" },
    dataLabels: { enabled: false },
    series: [44, 55, 13, 33],
    colors: colors,
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: { height: 240 },
            legend: { show: false }
        }
    }]
};

var updateDonutChart = new ApexCharts(document.querySelector("#update-donut"), updateDonutOptions);
updateDonutChart.render();

// Chart Update Functions
function appendData() {
    var e = updateDonutChart.w.globals.series.map(function () {
        return Math.floor(100 * Math.random()) + 1;
    });
    e.push(Math.floor(100 * Math.random()) + 1);
    return e;
}

function removeData() {
    var e = updateDonutChart.w.globals.series.map(function () {
        return Math.floor(100 * Math.random()) + 1;
    });
    e.pop();
    return e;
}

function randomize() {
    return updateDonutChart.w.globals.series.map(function () {
        return Math.floor(100 * Math.random()) + 1;
    });
}

function reset() {
    return updateDonutOptions.series;
}

// Event Listeners
document.querySelector("#randomize").addEventListener("click", function () {
    updateDonutChart.updateSeries(randomize());
});

document.querySelector("#add").addEventListener("click", function () {
    updateDonutChart.updateSeries(appendData());
});

document.querySelector("#remove").addEventListener("click", function () {
    updateDonutChart.updateSeries(removeData());
});

document.querySelector("#reset").addEventListener("click", function () {
    updateDonutChart.updateSeries(reset());
});
