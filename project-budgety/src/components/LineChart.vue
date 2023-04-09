<template>
	<!-- Only load line chart after expenses data is fetched from FireStore DB -->
	<Line
		v-if="loaded"
		id="my-chart-id"
		:options="chartOptions"
		:data="chartData"
	/>
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

import { authentication } from "../firebase.js";
import { getAuth } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
	collection,
	addDoc,
	setDoc,
	doc,
	query,
	where,
	getDocs,
	orderBy,
} from "firebase/firestore";

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

const db = getFirestore(firebaseApp);

export default {
	name: "LineChart",
	components: { Line },
	data() {
		return {
			// Find number of days in the month
			numDays: 0,
			daysLabels: [],
			// Initialise amtsList to $0 for all days of the month
			amtsList: Array(31)
				.fill()
				.map((v, i) => String(0)),
			loaded: false,
			chartData: {
				labels: this.daysLabels,
				datasets: [
					{
						label: "Amount Spent",
						backgroundColor: "#f87979",
						data: this.amtsList,
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

	async mounted() {
		try {
			const userEmail = authentication.currentUser.email;
			await this.getDailyExpenses(userEmail);
			// Mount Line Chart component after updating daily expenses
			this.loaded = true;
		} catch (err) {
			console.error(err);
		}
	},
	methods: {
		async getDailyExpenses(userEmail) {
			const date = new Date();
			const day = date.getDate();
			const month = date.getMonth();

			const newDate = new Date();
			let tempDate = new Date();

			// Set beginning of month by changing date and time
			let monthStart = newDate.setDate(1);
			let tempMonthStart = new Date(monthStart).setHours(0, 0, 0, 0);
			monthStart = new Date(tempMonthStart);

			// Get end date of month
			// Note: different possible end dates for different months, possible values: 31, 30, 29, 28
			this.numDays = 31;
			let monthEnd = tempDate.setDate(31);
			if (new Date(monthEnd).getMonth() != month) {
				this.numDays -= 1;
				let tempDate = new Date();
				monthEnd = tempDate.setDate(30);
				if (new Date(monthEnd).getMonth() != month) {
					this.numDays -= 1;

					let tempDate = new Date();
					monthEnd = tempDate.setDate(29);
					if (new Date(monthEnd).getMonth() != month) {
						this.numDays -= 1;
						let tempDate = new Date();
						monthEnd = tempDate.setDate(28);
					}
				}
			}

			// Update numDays for Line Chart horizontal axis
			this.daysLabels = Array(this.numDays)
				.fill()
				.map((v, i) => String(i + 1));
			this.chartData.labels = this.daysLabels;

			// Fetch expenses data
			const amtsRef = collection(db, userEmail, "expensesDoc", "expenses");
			// Filter only expenses in current month
			const q = query(
				amtsRef,
				where("date", ">=", new Date(monthStart)),
				where("date", "<=", new Date(monthEnd))
			);
			const amtsSnapshot = await getDocs(q);
			let amtsByDate = {};

			// Find total sum of expenses for each day
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let expDateRaw = data.date;
				let formattedDate = new Date(expDateRaw.seconds * 1000 + 28800 * 1000);
				let expDay = formattedDate.getDate().toString();
				let expAmt = data.amount;
				if (expDay in amtsByDate) {
					amtsByDate[expDay] += expAmt;
				} else {
					amtsByDate[expDay] = expAmt;
				}
			});

			for (var key in amtsByDate) {
				this.amtsList[key - 1] = amtsByDate[key];
			}

			// Update expense chart data before mounting Line Chart component
			this.chartData.datasets[0].data = this.amtsList;
		},
	},
};
</script>
