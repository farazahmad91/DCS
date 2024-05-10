var options = {
	chart: {
		height: 300,
		type: "area",
		toolbar: {
			show: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
		width: 3,
	},
	series: [
		{
			name: "Visits",
			data: [10, 40, 15, 40, 20, 35, 20, 10, 31, 43, 56, 29],
		},
		{
			name: "Clicks",
			data: [6, 8, 25, 7, 20, 20, 51, 35, 42, 20, 33, 67],
		},
	],
	grid: {
		borderColor: "#dfd6ff",
		strokeDashArray: 5,
		xaxis: {
			lines: {
				show: true,
			},
		},
		yaxis: {
			lines: {
				show: false,
			},
		},
	},
	xaxis: {
		categories: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
	},
	yaxis: {
		labels: {
			show: false,
		},
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return val + "k";
			},
		},
	},
	colors: ["#1c6148", "#33715a", "#49816d", "#60907f", "#77a091", "#8eb0a4", "#a4c0b6", "#bbd0c8", "#d2dfda"],
};

var chart = new ApexCharts(document.querySelector("#visits"), options);

chart.render();
