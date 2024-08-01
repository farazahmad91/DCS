// Colors for charts
const defaultColors = ["#39afd1", "#fa5c7c", "#6c757d", "#727cf5", "#0acf97", "#ffbc00", "#90ee7e", "#f48024", "#212730"];

// Get custom colors for the basic bar chart, or use default
const basicBarColors = $("#basic-bar").data("colors") ? $("#basic-bar").data("colors").split(",") : defaultColors;

// Make the AJAX request to get the data
jQuery.post('/GetTopHospitalService')
    .done(function (res) {
        // Initialize arrays to hold chart data
        var columnData = [];
        var lineData = [];
        var xAxisData = [];
        var serviceNames = [];

        // Check if `res` has at least two items for column and line data
        if (res && res.length >= 2) {
            for (var i = 0; i < res.length; i++) {
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
                plotOptions: {
                    bar: { horizontal: false }
                },
                dataLabels: {
                    enabled: false
                },
                series: [{ data: columnData }],
                colors: basicBarColors,
                xaxis: {
                    categories: serviceNames,
                    axisBorder: { show: false }
                },
                states: {
                    hover: { filter: "none" }
                },
                grid: { borderColor: "#f1f3fa" }
            };

            new ApexCharts(document.querySelector("#basic-bar"), basicBarOptions).render();
        } else {
            console.warn('Not enough data to render charts.');
        }

    })
    .fail(function () {
        alert("Error fetching data");
    });
