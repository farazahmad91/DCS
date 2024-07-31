const colors1 = ["#727cf5", "#0acf97"];
const dataColors1 = $("#line-column-mixed").data("colors");

// Make the AJAX request to get the data
jQuery.post('/GetTopHospitalService')
    .done(function (res) {
        var seriesData = [{
            name: "Service Count",
            type: "column",
            data: []
        }];
        var xAxisData = [];
        var serviceNameData = [];

        for (var i = 0; i < res.length; i++) {
            seriesData[0].data.push(res[i].serviceCount);
            xAxisData.push(res[i].appointdate); // Ensure this is in a valid datetime format
            serviceNameData.push(res[i].serviceName); // Assuming this is the name for the labels
        }

        const options1 = {
            chart: {
                height: 380,
                type: "line",
                toolbar: { show: false }
            },
            series: seriesData,
            stroke: { width: [0, 4] },
            xaxis: {
                type: "datetime",
                categories: xAxisData,
                labels: {
                    formatter: function (value) {
                        // Format the datetime value if necessary
                        return new Date(value).toLocaleDateString();
                    }
                }
            },
            colors: dataColors1 ? dataColors1.split(",") : colors1,
            yaxis: [{
                title: { text: "Service Count" }
            }],
            dataLabels: {
                enabled: true,
                formatter: function (value, { seriesIndex, dataPointIndex }) {
                    return serviceNameData[dataPointIndex]; // Display service name
                },
                offsetY: -10,
                style: {
                    fontSize: '12px',
                    colors: ["#333"]
                }
            },
            legend: { offsetY: 7 },
            grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } }
        };

        const chart1 = new ApexCharts(document.querySelector("#line-column-mixed"), options1);
        chart1.render();


    })
    .fail(function () {
        alert("error");
    });







// Chart 2: Multiple Y-Axis Mixed Chart
const colors2 = ["#727cf5", "#39afd1", "#fa5c7c"];
const dataColors2 = $("#multiple-yaxis-mixed").data("colors");
const options2 = {
    chart: {
        height: 380,
        type: "line",
        stacked: false,
        toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: { width: [0, 0, 3] },
    series: [
        {
            name: "Income",
            type: "column",
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
            name: "Cashflow",
            type: "column",
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        },
        {
            name: "Revenue",
            type: "line",
            data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
    ],
    colors: dataColors2 ? dataColors2.split(",") : colors2,
    xaxis: { categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016] },
    yaxis: [
        {
            axisTicks: { show: true },
            axisBorder: { show: true, color: colors2[0] },
            labels: { style: { color: colors2[0] } },
            title: { text: "Income (thousand crores)" }
        },
        {
            axisTicks: { show: true },
            axisBorder: { show: true, color: colors2[1] },
            labels: { style: { color: colors2[1] }, offsetX: 10 },
            title: { text: "Operating Cashflow (thousand crores)" }
        },
        {
            opposite: true,
            axisTicks: { show: true },
            axisBorder: { show: true, color: colors2[2] },
            labels: { style: { color: colors2[2] } },
            title: { text: "Revenue (thousand crores)" }
        }
    ],
    tooltip: {
        followCursor: true,
        y: { formatter: (o) => (o !== undefined ? o + " thousand crores" : o) }
    },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } },
    legend: { offsetY: 7 },
    responsive: [{ breakpoint: 600, options: { yaxis: { show: false }, legend: { show: false } } }]
};
const chart2 = new ApexCharts(document.querySelector("#multiple-yaxis-mixed"), options2);
chart2.render();

// Chart 3: Line and Area Mixed Chart
const colors3 = ["#0acf97", "#fa5c7c"];
const dataColors3 = $("#line-area-mixed").data("colors");
const options3 = {
    chart: {
        height: 380,
        type: "line",
        toolbar: { show: false }
    },
    stroke: { curve: "smooth", width: 2 },
    series: [
        {
            name: "Team A",
            type: "area",
            data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
        },
        {
            name: "Team B",
            type: "line",
            data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
        }
    ],
    fill: { type: "solid", opacity: [0.35, 1] },
    labels: ["Dec 01", "Dec 02", "Dec 03", "Dec 04", "Dec 05", "Dec 06", "Dec 07", "Dec 08", "Dec 09", "Dec 10", "Dec 11"],
    markers: { size: 0 },
    legend: { offsetY: 7 },
    colors: dataColors3 ? dataColors3.split(",") : colors3,
    yaxis: [
        { title: { text: "Series A" } },
        { opposite: true, title: { text: "Series B" } }
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: { formatter: (o) => (o !== undefined ? o.toFixed(0) + " points" : o) }
    },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } },
    responsive: [{ breakpoint: 600, options: { yaxis: { show: false }, legend: { show: false } } }]
};
const chart3 = new ApexCharts(document.querySelector("#line-area-mixed"), options3);
chart3.render();

// Chart 4: All Mixed Chart
const colors4 = ["#727cf5", "#39afd1", "#fa5c7c"];
const dataColors4 = $("#all-mixed").data("colors");
const options4 = {
    chart: {
        height: 380,
        type: "line",
        stacked: false,
        toolbar: { show: false }
    },
    stroke: { width: [0, 2, 4], curve: "smooth" },
    plotOptions: { bar: { columnWidth: "50%" } },
    colors: dataColors4 ? dataColors4.split(",") : colors4,
    series: [
        {
            name: "Team A",
            type: "column",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
            name: "Team B",
            type: "area",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
            name: "Team C",
            type: "line",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
    ],
    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: ["01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", "11/01/2003"],
    markers: { size: 0 },
    legend: { offsetY: 7 },
    xaxis: { type: "datetime" },
    yaxis: { title: { text: "Points" } },
    tooltip: {
        shared: true,
        intersect: false,
        y: { formatter: (o) => (o !== undefined ? o.toFixed(0) + " points" : o) }
    },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } }
};
const chart4 = new ApexCharts(document.querySelector("#all-mixed"), options4);
chart4.render();
