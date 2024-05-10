// Sparkline 3
var options3 = {
	series: [
		{
			name: "Sales",
			data: [1, 3, 2, 3, 2],
		},
	],
	chart: {
		type: "line",
		height: 107,
		width: "50%",
		sparkline: {
			enabled: true,
		},
	},
	colors: ["#1c6148"],
	stroke: {
		curve: "smooth",
		width: 3,
	},
	tooltip: {
		fixed: {
			enabled: false,
		},
		x: {
			show: false,
		},
		marker: {
			show: false,
		},
	},
	xaxis: {
		type: "day",
		categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return val + "K";
			},
		},
	},
};
var chart3 = new ApexCharts(document.querySelector("#sparkline3"), options3);
chart3.render();

// Sparkline 4
var options4 = {
	series: [
		{
			name: "Expenses",
			data: [1, 2, 3, 3, 2],
		},
	],
	chart: {
		type: "area",
		height: 107,
		width: "50%",
		sparkline: {
			enabled: true,
		},
	},
	colors: ["#1c6148"],
	stroke: {
		curve: "smooth",
		width: 3,
	},
	tooltip: {
		fixed: {
			enabled: false,
		},
		x: {
			show: false,
		},
		marker: {
			show: false,
		},
	},
	xaxis: {
		type: "day",
		categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return val + "K";
			},
		},
	},
};
var chart4 = new ApexCharts(document.querySelector("#sparkline4"), options4);
chart4.render();

// Sparkline 5
var options5 = {
	series: [
		{
			name: "Income",
			data: [1, 2, 3, 4, 1, 2, 3],
		},
	],
	chart: {
		type: "bar",
		height: 107,
		width: "65%",
		sparkline: {
			enabled: true,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: "70%",
			distributed: true,
		},
	},
	colors: ["#1c6148", "#33715a", "#49816d", "#60907f", "#77a091", "#8eb0a4", "#a4c0b6", "#bbd0c8", "#d2dfda"],
	stroke: {
		curve: "smooth",
		width: 1,
	},
	tooltip: {
		fixed: {
			enabled: false,
		},
		x: {
			show: false,
		},
		marker: {
			show: false,
		},
	},
	xaxis: {
		type: "day",
		categories: [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		],
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return val + "K";
			},
		},
	},
};
var chart5 = new ApexCharts(document.querySelector("#sparkline5"), options5);
chart5.render();
