<template>
	<!-- <body> -->
	<div id="analytics-page">
		<div class="section1">
			<div class="analytics-header">Analytics for {{ monthName }}</div>
			<div class="expense-boxes">
				<div class="expense-box">
					<div class="expense-box-header">TOTAL EXPENSES</div>

					<div class="expense-value">${{ totalExpenses }}</div>
				</div>
				<div class="expense-box">
					<div class="expense-box-header">AVG EXPENSES/DAY</div>

					<div class="expense-value">${{ avgExpenses }}</div>
				</div>
			</div>
		</div>

		<div class="section2">
			<div class="line-graph-box">
				<div class="font-18">Daily Expenditure</div>
				<LineChart />
			</div>
			<div class="breakdown-box">
				<CategoryBreakdown />
			</div>
		</div>
		<!-- </div> -->

		<div class="section3">
			<div class="top-line">
				<div class="font-18">Expenses History</div>
				<div class="filter-btn"><fa icon="filter" /> Filter</div>
			</div>
			<div class="expenses-table">
				<ExpensesHistory />
			</div>
		</div>
	</div>
	<!-- </body> -->
	<Sidebar />
</template>

<script>
import LineChart from "../components/LineChart.vue";
import CategoryBreakdown from "../components/CategoryBreakdown.vue";
import ExpensesHistory from "../components/ExpensesHistory.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";

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

const db = getFirestore(firebaseApp);

export default {
	name: "Analytics",
	// local registration using components
	components: {
		LineChart,
		CategoryBreakdown,
		ExpensesHistory,
		Sidebar,
	},
	data() {
		return {
			loaded: false,
			totalExpenses: 0,
			avgExpenses: 0,
			catList: [],
			monthName: "",
			months: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
		};
	},
	async mounted() {
		try {
			const userEmail = authentication.currentUser.email;
			const amtsRef = collection(db, "users", userEmail, "expenses");
			// Update total and average expenses
			// And get breakdown by category
			await this.getExpenses(amtsRef);
			this.loaded = true;
		} catch (err) {
			console.error(err);
		}
	},
	methods: {
		async getExpenses(amtsRef) {
			const date = new Date();
			const day = date.getDate();
			const month = date.getMonth();
			this.monthName = this.months[month];
			const newDate = new Date();
			let tempDate = new Date();
			// Set beginning of month by changing date and time
			let monthStart = newDate.setDate(1);
			let tempMonthStart = new Date(monthStart).setHours(0, 0, 0, 0);
			monthStart = new Date(tempMonthStart);
			// Fetch expenses data
			// Filter from beginning of the month to current time
			const amtsQuery = query(
				amtsRef,
				where("Date", ">=", new Date(monthStart)),
				where("Date", "<=", new Date())
			);
			const amtsSnapshot = await getDocs(amtsQuery);
			let amtsByDate = {};
			// Find total sum of expenses for each day
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let expAmt = data.Amount;
				this.totalExpenses += expAmt;
			});
			this.avgExpenses = (
				parseFloat(this.totalExpenses) / parseFloat(day)
			).toFixed(2);
			this.totalExpenses = parseFloat(this.totalExpenses).toFixed(2);

			// Get expenses breakdown by category
			let catDict = {};
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let expAmt = data.Amount;
				let expCat = data.Category;
				if (expCat in catDict) {
					catDict[expCat] += expAmt;
				} else {
					catDict[expCat] = expAmt;
				}
			});
			const totExp = parseFloat(this.totalExpenses);
			// Format: [category name, total cat expense, percentage of total]
			for (var key in catDict) {
				this.catList.push([
					key,
					catDict[key].toFixed(2), // total cat expense
					((catDict[key] / totExp) * 100).toFixed(1), // percentage of total
				]);
			}
			// Sort according to highest expenditure first
			this.catList.sort(function (x, y) {
				return y[1] - x[1];
			});
		},
	},
};
</script>

<style scoped>
#analytics-page {
	margin: 0 2rem;
}
.analytics-header,
.expense-value {
	font-size: 24px;
	font-weight: 500;
}

.expense-value {
	font-size: 24px;
	font-weight: 500;
}
.analytics-header {
	padding-top: 50px;
	text-align: left;
}
.expense-boxes {
	display: flex;
	max-width: 100%;
}
.expense-box {
	background: linear-gradient(
		44.35deg,
		#b55656 1.1%,
		#8ca3fc 1.11%,
		rgba(213, 144, 219, 0.87) 85.06%,
		#ab8cdd 98.97%
	);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	padding: 20px 45px 15px 45px;
	margin: 15px 25px 0px 0px;
}
.expense-box-header {
	font-style: normal;
	font-weight: 300;
	font-size: 13px;
	letter-spacing: 2px;
	color: #ffffff;
}
.expense-value {
	font-weight: 600;
	letter-spacing: 2px;
	text-align: center;
	color: #ffffff;
}
.breakdown-box {
	/* width: 23.75rem; */
	/* height: 233px; */
	background: var(--color-card);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 0.625rem;
	flex: 1;
	overflow: auto;
	max-height: 100%;
	max-width: 400px;
}
.font-18 {
	font-size: 18px;
	font-weight: 500;
	padding: 20px;
}
.section2 {
	display: flex;
	/* flex: 1 1 auto; */
	/* justify-content: space-between; */
	gap: 1.25rem;
	margin: 1.563rem 0rem;
}
.line-graph-box {
	max-width: 50rem;
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	text-align: left;
	flex: 1;
	/* add space between line chart and container */
	padding: 0px 0.625rem 0.625rem 0.625rem;
	/* position: relative; */
	overflow: auto;
}
.section3 {
	/* width: 1090px;
  height: 366px; */
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	/* margin-right: 1.875rem; */
	/* max-width: 90%; */
}
.top-line {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.filter-btn {
	/* possibly for all buttons */
	align-items: center;
	background-color: var(--color-card);
	border: 0.5px solid --color-btn-border;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	padding: 5px 10px 5px 10px;
	margin-right: 35px;
	font-weight: 500;
	font-size: 12px;
	color: #aba6a6;
	/* font-weight: var(--font-medium); */
}
.filter-btn:hover {
	background-color: #f2f2f2;
	cursor: pointer;
}
.expenses-table {
	padding: 0rem 1.875rem;
	margin-bottom: 2rem;
}
</style>
