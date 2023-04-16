<template>
	<Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
</template>

<script>
import { authentication } from "../firebase.js";
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	collection,
	addDoc,
	setDoc,
	doc,
	query,
	where,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const db = getFirestore(firebaseApp);

export default {
	name: "DoughnutChart",
	components: { Doughnut },

	async mounted() {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				this.$router.push({ name: "Login" });
			} else {
				this.activateGetCats();
			}
		});
	},

	data() {
		return {
			loaded: false,
			categoryColours: {
				Fashion: "#856dc8",
				Entertainment: "#eb8ad0",
				Food: "#4f94bc",
				Transportation: "#cc8a4a",
				Healthcare: "#539f37",
				Groceries: "#ac986b",
				Rental: "#38aca5",
				Utilities: "#8e451c",
				Others: "#8f8f8f",
			},
			catLabels: [],
			catColours: [],
			catData: [],
			chartData: {
				labels: [],
				datasets: [
					{
						label: "Total Amount",
						backgroundColor: [],
						data: [],
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
				elements: {},
				responsive: true,
			},
		};
	},

	methods: {
		async activateGetCats() {
			const auth = getAuth();
			try {
				const userEmail = auth.currentUser.email;
				// Fetch expenses data
				await this.getTop3Cats(userEmail);
				this.loaded = true;
			} catch (err) {
				console.error(err);
			}
		},
		async getTop3Cats(userEmail) {
			const today = new Date();
			// First day is the day of the month - the day of the week
			const firstDay = today.getDate() - today.getDay();
			// Last day is first day + 7
			const lastDay = firstDay + 7;

			const weekStart = new Date(today.setDate(firstDay));
			const formattedFullStartDate = this.formatDate(weekStart, "start");
			const weekEnd = new Date();
			const formattedFullEndDate = this.formatDate(weekEnd, "end");

			// Set beginning of week by changing date and time
			const amtsRef = collection(db, "users", userEmail, "expenses");

			// Filter from beginning of the month to current time
			const q = query(
				amtsRef,
				where("Date", ">=", formattedFullStartDate),
				where("Date", "<=", formattedFullEndDate)
			);
			const amtsSnapshot = await getDocs(q);

			// Store categories as {"Food": 0, "Fashion": 35, ...}
			let allCatDict = {};
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let expAmt = parseFloat(data.Amount);
				let expCat = data.Category;

				// Check for categories and add expense amount to dictionary
				if (expCat in allCatDict) {
					allCatDict[expCat] += expAmt;
				} else {
					allCatDict[expCat] = expAmt;
				}
			});

			// Emit event to parent DashboardPage for Top 3 Categories section
			this.$emit("sendCatDict", allCatDict);

			// Iterate through each category present and add to ChartJS data
			let allCatList = Object.entries(allCatDict);
			allCatList.forEach((cat) => {
				let category = cat[0];
				let amount = cat[1];
				this.catLabels.push(category);
				this.catColours.push(this.categoryColours[category]);
				this.catData.push(amount);
			});
			// Add to chartData
			this.chartData.labels = this.catLabels;
			this.chartData.datasets[0].backgroundColor = this.catColours;
			this.chartData.datasets[0].data = this.catData;
		},
		formatDate(dateObj, str) {
			const currYear = dateObj.getFullYear();
			const currMonth = dateObj.getMonth() + 1; // Month is zero-based so need to add 1
			const formatMonth = currMonth.toString().padStart(2, "0");
			const currDay = dateObj.getDate();
			const formatDay = currDay.toString().padStart(2, "0");
			let formattedFullDate;
			if (str == "start") {
				formattedFullDate = new Date(
					`${currYear}-${formatMonth}-${formatDay}T00:00:00`
				);
			} else {
				formattedFullDate = new Date(
					`${currYear}-${formatMonth}-${formatDay}T23:59:59.99`
				);
			}
			return formattedFullDate;
		},
	},
};
</script>
