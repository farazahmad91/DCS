var options = {
	chart: {
		width: 300,
		type: "pie",
	},
	labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
	series: [20, 20, 20, 20, 20],
	legend: {
		position: "bottom",
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 0,
	},
		colors: ["#1c6148", "#33715a", "#49816d", "#60907f", "#77a091", "#8eb0a4", "#a4c0b6", "#bbd0c8", "#d2dfda"],
};
var chart = new ApexCharts(document.querySelector("#pie"), options);
chart.render();
