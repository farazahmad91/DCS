// Colors for charts
const defaultColors = ["#39afd1", "#fa5c7c", "#6c757d", "#727cf5", "#0acf97", "#ffbc00", "#90ee7e", "#f48024", "#212730"];

// Chart 1: Basic Bar
const basicBarColors = $("#basic-bar").data("colors") ? $("#basic-bar").data("colors").split(",") : defaultColors;

// Make the AJAX request to get the data
jQuery.post('/GetTopHospitalService')
    .done(function (res) {
        var columnData = [];
        var lineData = [];
        var xAxisData = [];
        var serviceNames = [];

        // Assuming `res` has at least two services for the column and line chart
        for (var i = 0; i < res.length; i++) {
            // Collecting data for each service
            if (i === 0) {
                columnData.push(res[i].serviceCount);
                xAxisData.push(res[i].appointdate); // Ensure this is in a valid datetime format
                serviceNames.push(res[i].serviceName); // Collect service names for the legend
            } else if (i === 1) {
                lineData.push(res[i].serviceCount);
                xAxisData.push(res[i].appointdate);
                serviceNames.push(res[i].serviceName);
            }
        }

        const basicBarOptions = {
            chart: {
                height: 380,
                type: "bar",
                toolbar: { show: false }
            },
            plotOptions: { bar: { horizontal: false } },
            dataLabels: { enabled: false },
            series: [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }],
            colors: basicBarColors,
            xaxis: {
                categories: ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy", "France", "Japan", "United States", "China", "Germany"],
                axisBorder: { show: false }
            },
            states: { hover: { filter: "none" } },
            grid: { borderColor: "#f1f3fa" }
        };
        new ApexCharts(document.querySelector("#basic-bar"), basicBarOptions).render();

    })
    .fail(function () {
        alert("error");
    });