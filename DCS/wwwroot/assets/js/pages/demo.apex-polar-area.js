
var colors = ["#727cf5", "#0acf97", "#fa5c7c"];
var dataColors = $("#basic-polar-area").data("colors");


jQuery.post('/GetTopAddressOfUser')
    .done(function (res) {
        var CountData = [];
        var addressNames = [];
        if (res && res.length >= 2) {
            for (var i = 0; i < res.length; i++)
            {
                CountData.push(res[i].visitCount);
                addressNames.push(res[i].address); 
                
            }

            var basicPolarAreaOptions = {
                series: CountData,
                chart: {
                    height: 380,
                    type: "polarArea"
                },
                stroke: {
                    colors: ["#fff"]
                },
                fill: {
                    opacity: 0.8
                },
                labels: addressNames,
                legend: {
                    position: "bottom"
                },
                colors: dataColors ? dataColors.split(",") : colors,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }]
            };

            var basicPolarAreaChart = new ApexCharts(document.querySelector("#basic-polar-area"), basicPolarAreaOptions);
            basicPolarAreaChart.render();
        } else {
            console.warn('Not enough data to render charts.');
        }

    })
    .fail(function () {
        alert("Error fetching data");
    });






// Second Chart Configuration (Monochrome Polar Area)
var monochromePolarAreaOptions = {
    series: [42, 47, 52, 58, 65],
    chart: {
        height: 380,
        type: "polarArea"
    },
    labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
    fill: {
        opacity: 1
    },
    stroke: {
        width: 1
    },
    yaxis: {
        show: false
    },
    legend: {
        position: "bottom"
    },
    plotOptions: {
        polarArea: {
            rings: {
                strokeWidth: 0
            },
            spokes: {
                strokeWidth: 0
            }
        }
    },
    theme: {
        monochrome: {
            enabled: true,
            shadeTo: "light",
            color: "#727cf5",
            shadeIntensity: 0.6
        }
    }
};

var monochromePolarAreaChart = new ApexCharts(document.querySelector("#monochrome-polar-area"), monochromePolarAreaOptions);
monochromePolarAreaChart.render();
