<template>
	<div id="dashboard-page">
		<div class="dashboard-section1">
			<div class="left">
				<div class="welcome">
					<div class="title">Welcome back, {{ username }}!</div>
					<div class="subtitle">
						Here's an overview of your weekly expenses:
					</div>
				</div>
				<div class="expense-box">
					<div class="expense-box-header">EXPENSES</div>
					<div class="expense-value-dashboard">$132.56</div>
				</div>
			</div>

			<div class="weekly">
				<div class="weekly-title">WEEKLY SPENDING</div>
				<div class="spending-container">
					<div class="doughnutchart">
						<DoughnutChart />
					</div>
					<div class="top3">
						<div class="top3-title">TOP 3 CATEGORIES</div>
						<div class="top3-content">
							<div class="each-content">
								<!-- change icon colour through .cat1 in style -->
								<fa icon="square" class="cat1" />
								Fashion, 40%
							</div>
							<div class="each-content">
								<fa icon="square" class="cat2" />
								Food, 25%
							</div>
							<div class="each-content">
								<fa icon="square" class="cat3" />
								Groceries, 20%
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="dashboard-section2">
			<div class="top-line">
				<div class="font-18">Recent Expenses</div>
				<div class="add-btn">
					<fa icon="add" />
				</div>
			</div>
			<div class="expenses-table">
				<RecentExpenses />
			</div>
		</div>
	</div>
	<Sidebar />
</template>

<script>
import DoughnutChart from "../components/DoughnutChart.vue";
import RecentExpenses from "../components/RecentExpenses.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";

import { authentication } from "../firebase.js";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";

export default {
	name: "Dashboard",
	// local registration using components
	components: {
		DoughnutChart,
		RecentExpenses,
		Sidebar,
	},
	data() {
		return {
			username: "",
		};
	},
	mounted() {
		this.username = authentication.currentUser.displayName;
		console.log("Component Mounted");
	},
};
</script>

<style scoped>
#dashboard-page {
	display: flex;
	flex-direction: column;
	margin: 0rem 2rem;
}
.dashboard-section1 {
	display: flex;
	padding-top: 3.125rem;
	margin: 1.563rem 0rem;
	/* align-items: baseline; */
	/* justify-content: baseline; */
}
.left {
	display: flex;
	flex-direction: column;
	margin-right: 1rem;
	overflow: auto;
	flex: 0.8;
	/* flex: 0.5 0.5 auto; */
}
.title {
	font-size: 24px;
	font-weight: 500;
}
.weekly-title {
	font-size: 24px;
	font-weight: 300;
	letter-spacing: 1px;
	margin: 1rem 0rem;
}
.subtitle {
	font-size: 14px;
	font-weight: 300;
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
	border-radius: 2.5rem;
	padding: 4.5rem 0rem;
	margin: 25px 15px 0px 0px;
	text-align: center;
	color: #ffffff;
	/* max-width: 350px; */
}
.expense-box-header {
	font-style: normal;
	font-weight: 300;
	font-size: 24x;
	letter-spacing: 2px;
}
.expense-value-dashboard {
	font-weight: 600;
	font-size: 55px;
}

.weekly {
	background: var(--color-card);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 2.4rem;
	text-align: center;
	flex: 1.5;
	overflow: auto;
}
.spending-container {
	display: flex;
	padding: 0rem 2.2rem;
	/* centralise doughnut and top3 */
	align-items: center;
}
.doughnutchart {
	height: 250px;
}

.top3 {
	flex: 1;
	/* align with top3-content */
	display: flex;
	flex-direction: column;
	align-items: center;
}

.top3-title {
	font-size: 18px;
	font-weight: 700;
}

.top3-content {
	text-align: start;
}

.each-content {
	margin-top: 0.9rem;
	font-size: 16px;
	font-weight: 500;
}
/* color of square for each category - can be changed later */
.cat1 {
	color: #d4c5ff;
}

.cat2 {
	color: #cfedfe;
}

.cat3 {
	color: #ffecc0;
}

.font-18 {
	font-size: 18px;
	font-weight: 500;
	padding: 20px;
}
.dashboard-section2 {
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

.top-line {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.add-btn {
	align-items: center;
	text-align: center;
	background-color: var(--color-card);
	border: 0.5px solid --color-btn-border;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 40px;
	padding: 5px 10px 5px 10px;
	margin-right: 35px;
	font-weight: 500;
	font-size: 15px;
	color: #aba6a6;
}

.add-btn:hover {
	background-color: #f2f2f2;
	cursor: pointer;
}

.expenses-table {
	padding: 0rem 1.875rem;
}
</style>
