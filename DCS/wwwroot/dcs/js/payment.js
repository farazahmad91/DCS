const colors1 = ["#727cf5", "#0acf97"];
const dataColors1 = $("#line-column-mixed").data("colors");

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

        const options1 = {
            chart: {
                height: 380,
                type: "line",
                toolbar: { show: false }
            },
            series: [
                {
                    name: serviceNames[0], // First service name for the column series
                    type: "column",
                    data: columnData
                },
                {
                    name: serviceNames[1], // Second service name for the line series
                    type: "line",
                    data: lineData
                }
            ],
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
            yaxis: [
                { title: { text: serviceNames[0] } },
                { opposite: true, title: { text: serviceNames[1] } }
            ],
            legend: { offsetY: 7 },
            grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } }
        };

        const chart1 = new ApexCharts(document.querySelector("#line-column-mixed"), options1);
        chart1.render();

    })
    .fail(function () {
        alert("error");
    });