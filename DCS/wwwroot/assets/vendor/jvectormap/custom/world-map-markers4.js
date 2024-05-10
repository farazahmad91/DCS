$(function () {
	$("#world-map-markers4").vectorMap({
		map: "continents_mill",
		hoverColor: false,
		zoomOnScroll: false,
		series: {
			regions: [
				{
					values: gdpData,
					scale: ["#1c6148", "#33715a", "#49816d", "#60907f", "#77a091", "#8eb0a4", "#a4c0b6", "#bbd0c8", "#d2dfda"],
				},
			],
		},
		markerStyle: {
			initial: {
				fill: "#ffffff",
				stroke: "#000000",
				"fill-opacity": 0.6,
				"stroke-width": 10,
				"stroke-opacity": 0.2,
				r: 10,
			},
			hover: {
				fill: "#ffffff",
				stroke: "#e13d4b",
				"fill-opacity": 0.8,
				"stroke-width": 10,
				"stroke-opacity": 0.4,
				r: 20,
				cursor: "pointer",
			},
		},
		regionStyle: {
			initial: {
				fill: "#a4c0b6",
			},
			hover: {
				"fill-opacity": 0.8,
			},
			selected: {
				fill: "#333333",
			},
		},
		backgroundColor: "transparent",
		markers: [
			{ latLng: [12, 23], name: "Africa" },
			{ latLng: [65, 100], name: "Europe" },
			{ latLng: [37, 85], name: "Asia" },
			{ latLng: [49, -105], name: "North America" },
			{ latLng: [-15, -60], name: "South America" },
			{ latLng: [-25, 140], name: "Australia" },
		],
	});
});
