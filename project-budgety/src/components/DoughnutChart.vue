<template>
    <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
</template>
  
<script>
import { authentication } from "../firebase.js";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
  
ChartJS.register(ArcElement, Tooltip, Legend)
  
const db = getFirestore(firebaseApp);

export default {
    name: "DoughnutChart",
    components: { Doughnut },

	async mounted() {
		console.log("In DoughnutChart vue");
		try {
			const userEmail = authentication.currentUser.email;
			// Fetch expenses data
			await this.getTop3Cats(userEmail);
			this.loaded = true;
		} catch (err) {
			console.error(err);
		}
	},

    data() {
		return {
			loaded:false,
			categoryColours: {
				"Fashion": '#856dc8',
				"Entertainment": '#eb8ad0',
				"Food": '#4f94bc',
				"Transportation": '#cc8a4a',
				"Healthcare": '#539f37',
				"Groceries": '#ac986b',
				"Rental": '38aca5',
				"Utilities": '8e451c',
				"Others": "8f8f8f",

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
						// position: 'right'
					}
				},
				elements: {
	
				},
				responsive: true,
				// aspectRatio: 2,
				// maintainAspectRatio: true
				
			}
		};
	},

	methods: {
		async getTop3Cats(userEmail) {
			const today = new Date();
			// First day is the day of the month - the day of the week
			const firstDay = today.getDate() - today.getDay(); 
			// Last day is first day + 6
			const lastDay = firstDay + 6;

			const weekStart = new Date(today.setDate(firstDay));
			const weekEnd = new Date(today.setDate(lastDay));

			// Set beginning of week by changing date and time
			const amtsRef = collection(db, "users", userEmail, "expenses");

			// Filter from beginning of the month to current time
			const q = query(
				amtsRef,
				where("Date", ">=", weekStart),
				where("Date", "<=", new Date())
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
			this.$emit('sendCatDict', allCatDict);
			
			// Iterate through each category present and add to ChartJS data
			let allCatList = Object.entries(allCatDict);
			allCatList.forEach((cat) => {
				let category = cat[0];
				let amount = cat[1];
				this.catLabels.push(category);
				this.catColours.push(this.categoryColours[category]);
				this.catData.push(amount);
			})
			// Add to chartData
			this.chartData.labels = this.catLabels;
			this.chartData.datasets[0].backgroundColor = this.catColours;
			this.chartData.datasets[0].data = this.catData;
		}		
	}
}
</script>
  