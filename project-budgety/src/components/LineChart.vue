<template>
	<Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

import { db, authentication } from "../firebase.js";
import { getAuth } from "firebase/auth";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export default {
	name: "LineChart",
	components: { Line },
	data() {
		return {
			chartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				datasets: [
					{
						label: "Data One",
						backgroundColor: "#f87979",
						data: [47, 39, 15, 40, 39, 80, 40],
						backgroundColor: "rgba(108, 96, 243, 0.2)",
						fill: true,
						pointHoverBackgroundColor: "green",
					},
				],
			},
			chartOptions: {
				plugins: {
					// remove the legend on top
					legend: {
						display: false,
					},
				},
				elements: {
					line: {
						tension: 0.4,
						borderColor: "#6C60F3",
					},
				},
				responsive: true,
			},
		};
	},

	async mounted() {},
};
</script>
