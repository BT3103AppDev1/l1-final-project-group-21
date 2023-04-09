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
			// Initialise amtsList to 30 days of $0
			amtsList: Array(30)
				.fill()
				.map((v, i) => String(0)),
			loaded: false,
			chartData: null,
			chartData: {
				// Labels for 30 days of expenditure
				labels: Array(30)
					.fill()
					.map((v, i) => String(i + 1)),
				datasets: [
					{
						label: "Data One",
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
		let monthEnd = tempDate.setDate(31);
		if (new Date(monthEnd).getMonth() != month) {
			let tempDate = new Date();
			monthEnd = tempDate.setDate(30);
			if (new Date(monthEnd).getMonth() != month) {
				let tempDate = new Date();
				monthEnd = tempDate.setDate(29);
				if (new Date(monthEnd).getMonth() != month) {
					let tempDate = new Date();
					monthEnd = tempDate.setDate(28);
				}
			}
		}
		// console.log(new Date(monthStart), new Date(monthEnd));

		try {
			// Fetch expenses data
			const userEmail = authentication.currentUser.email;
			const amtsRef = collection(db, userEmail, "expensesDoc", "expenses");
			// Filter only expenses in current month
			const q = query(
				amtsRef,
				where("date", ">=", new Date(monthStart)),
				where("date", "<=", new Date(monthEnd))
			);
			const amtsSnapshot = await getDocs(q);
			// console.log(amtsSnapshot);
			let amtsByDate = {};

			// Find total sum of expenses for each day
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let expDateRaw = data.date;
				let formattedDate = new Date(expDateRaw.seconds * 1000 + 28800 * 1000);
				console.log(formattedDate);
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

			// Mount Line Chart component
			this.loaded = true;
		} catch (err) {
			console.error(err);
		}
	},

	/*
		const userEmail = authentication.currentUser.email;
		const colRef = collection(db, userEmail, "expensesDoc", "expenses");
		// console.log(colRef);
		// ***for query need to add in: where date = for that specific month only
		const q = query(
			collection(db, userEmail, "expensesDoc", "expenses")
			// where("category", "==", "food")
		);

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// console.log(doc.id, " => ", doc.data());
		});

		const expRef = collection(db, userEmail, "expensesDoc", "expenses");
		const expSnapshot = await getDocs(colRef);
		const expList = expSnapshot.docs.map((doc) => [doc.id, doc.data()]);
		// console.log(expList);
		*/

	// let amtList = amtsSnapshot.docs
	// 	.map((doc) => doc.data())
	// 	// .map((doc) => doc.amount);
	// 	.sort((x, y) => x.amount < y.amount);
	// .map((doc) => doc[1].amount);
	// .sort((x, y) => x[1].date.seconds < y[1].date.seconds) // sort by earlier date first
	// .map(
	// 	(doc) => new Date(doc[1].date.seconds * 1000 + 28800 * 1000),
	// 	doc[1].amount
	// );
	// console.log(this.amtsList);
	// console.log(amtsByDate);
	// },
};
</script>
