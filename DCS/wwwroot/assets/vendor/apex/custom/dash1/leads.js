var options = {
	series: [20, 25, 30],
	chart: {
		height: 300,
		type: "polarArea",
	},
	labels: ["New", "InProgress", "Completed"],
	fill: {
		opacity: 1,
	},
	stroke: {
		width: 1,
		colors: undefined,
	},
	colors: ["#1c6148", "#33715a", "#49816d", "#60907f", "#77a091", "#8eb0a4", "#a4c0b6", "#bbd0c8", "#d2dfda"],
	yaxis: {
		show: false,
	},
	legend: {
		position: "bottom",
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return "$" + val;
			},
		},
	},
	plotOptions: {
		polarArea: {
			rings: {
				strokeWidth: 0,
			},
			spokes: {
				strokeWidth: 0,
			},
		},
	},
};

var chart = new ApexCharts(document.querySelector("#leads"), options);
chart.render();
