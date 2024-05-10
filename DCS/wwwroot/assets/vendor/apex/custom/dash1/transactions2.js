var options = {
	chart: {
		height: 237,
		type: "radialBar",
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		radialBar: {
			dataLabels: {
				name: {
					fontSize: "12px",
					fontColor: "black",
				},
				value: {
					fontSize: "21px",
				},
				total: {
					show: true,
					label: "Income",
					formatter: function (w) {
						// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
						return "89k";
					},
				},
			},
			track: {
				background: "#e6ecf3",
			},
		},
	},
	series: [80, 70, 50],
	labels: ["Transactions", "Expenses", "Profits"],
	colors: ["#1c6148", "#33715a", "#49816d", "#60907f", "#77a091", "#8eb0a4", "#a4c0b6", "#bbd0c8", "#d2dfda"],
};

var chart = new ApexCharts(document.querySelector("#transactions"), options);
chart.render();
