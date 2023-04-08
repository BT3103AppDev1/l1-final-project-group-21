<template>
	<body>
		<div class="section1">
			<div class="analytics-header">Analytics</div>
			<div class="expense-boxes">
				<div class="expense-box">
					<div class="expense-box-header">TOTAL EXPENSES</div>

					<div class="expense-value">$190.56</div>
				</div>
				<div class="expense-box">
					<div class="expense-box-header">AVG EXPENSES/DAY</div>

					<div class="expense-value">$13.62</div>
				</div>
			</div>
		</div>

		<div class="section2">
			<div class="line-graph-box">
				<div class="font-18">Daily Expenditure</div>
				<LineChart />
			</div>
			<div class="breakdown-box">
				<div class="font-18">Breakdown by Category</div>
				<div class="categories">
					<!-- <div class="category-1"> -->
					<div class="category-1-top">
						<img class="category-icon" src="../assets/icons/Fashion.png" />
						<span class="category-text">Fashion</span>
						<span class="category-text">27.8%</span>
						<span class="category-text">$59.91</span>
					</div>
					<div class="progress">
						<v-progress-linear
							rounded="true"
							color="#856DC8"
							model-value="27.8"
							height="8px"
						></v-progress-linear>
						<!-- <LinearProgressBar /> -->
					</div>
					<!-- </div>   -->
					<!-- second category -->
					<div class="category-1-top">
						<img class="category-icon" src="../assets/icons/Food.png" />
						<span class="category-text blue">Food</span>
						<span class="category-text blue">17.4%</span>
						<span class="category-text blue">$33.14</span>
					</div>
					<div class="progress">
						<v-progress-linear
							rounded="true"
							color="#4F94BC"
							model-value="27.8"
							height="8px"
						></v-progress-linear>
						<!-- <LinearProgressBar /> -->
					</div>
				</div>
			</div>
		</div>
		<!-- </div> -->

		<div class="section3">
			<div class="top-line">
				<div class="font-18">Expenses History</div>
				<!-- <div class="filter-btn-wrapper"> -->
				<div class="filter-btn">
					<fa icon="filter" /> Filter
					<!-- </div> -->
				</div>
			</div>
			<div class="expenses-table">
				<ExpensesHistory />
			</div>
		</div>
	</body>
	<Sidebar />
</template>

<script>
import LineChart from "../components/LineChart.vue";
import ExpensesHistory from "../components/ExpensesHistory.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";

import { db, authentication } from "../firebase.js";
import { getAuth } from "firebase/auth";

export default {
	name: "Analytics",
	// local registration using components
	components: {
		LineChart,
		ExpensesHistory,
		Sidebar,
	},

	data() {
		return {};
	},
	mounted() {},
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'); */
/* root {
  apply to everything
  font-family: 'Inter';
} */

body {
	/* remove the centering from main.css */
	place-items: unset !important;
	display: flex;
	flex-direction: column;
	margin-left: 230px;
}

.analytics-header,
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
	width: 380px;
	/* height: 233px; */
	background: var(--color-card);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
}

.font-18 {
	font-size: 18px;
	font-weight: 500;
	padding: 20px;
}

.section2 {
	display: flex;
	/* justify-content: space-between; */
	gap: 20px;
	margin: 25px 0px;
}

.line-graph-box {
	width: 800px;
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	text-align: left;
	/* add space between line chart and container */
	padding: 0px 10px 10px 10px;
}

.progress {
	/* add space between each category */
	margin-bottom: 20px;
}

.categories {
	padding: 0px 20px;
}

.category-1-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.category-icon {
	width: 40px;
}

.category-text {
	color: #856dc8;
	font-weight: 700;
}

.blue {
	color: #4f94bc;
}

.section3 {
	/* width: 1090px;
  height: 366px; */
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	margin-right: 30px;
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
	padding: 0px 30px;
}
</style>
