<template>
	<body>
		<div class="welcome">
			<h2 style="font-weight: bold">Welcome back, {{ username }}!</h2>
			<h4>Here's an overview of your weekly expenses:</h4>
		</div>

		<div class="expenses">
			<h3 style="font-size: 1.5em; letter-spacing: 0.2em">EXPENSES</h3>
			<h1 style="font-size: 5em">$123.45</h1>
		</div>

		<div class="weekly">
			<h3 style="font-family: Verdana; letter-spacing: 0.2em">
				WEEKLY SPENDING
			</h3>
			<div class="donut">
				<div class="hole"></div>
			</div>
			<div class="top3">
				<h2 style="font-weight: bold; font-size: 1.2em">TOP 3 CATEGORIES</h2>
			</div>
		</div>

		<div class="section3">
			<div class="top-line">
				<div class="font-18">Recent Expenses</div>
				<div class="filter-btn"><fa icon="add" /> Add</div>
			</div>
			<div class="expenses-table">
				<RecentExpenses />
			</div>
		</div>
	</body>
	<Sidebar />
</template>

<script>
import LineChart from "../components/LineChart.vue";
import RecentExpenses from "../components/RecentExpenses.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";

import { db, authentication } from "../firebase.js";
import { getAuth } from "firebase/auth";

export default {
	name: "Dashboard",
	// local registration using components
	components: {
		LineChart,
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
	},
};
</script>

<style scoped>
.top3 {
	position: absolute;
	left: 30em;
	top: 8em;
}

.donut {
	margin: 1.8em;
	width: 15em;
	height: 15em;
	border-radius: 50%;
	background: conic-gradient(#ffdbb9, #a383ff);
	display: flex;
	align-items: center;
	justify-content: center;
}

.hole {
	width: 8em;
	height: 8em;
	border-radius: 50%;
	background: #ffffff;
}

.welcome {
	margin: 1.6em;
	padding: 1.6em 1.6em 0em 0em;
	float: left;
	height: 5em;
	width: 25em;
}

.expenses {
	color: white;
	margin: 1.6em 1.6em 2.8em 1em;
	float: left;
	height: 18em;
	width: 25em;
	padding: 3.5em;
	border: solid 1px black;
	background: linear-gradient(0.15turn, #8ca3fc, #d590db, #ab8cdd);
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 10px;
	text-align: center;
}

.weekly {
	position: absolute;
	left: 30em;
	top: 3em;
	height: 24.5em;
	width: 53em;
	padding: 2em;
	border: solid 1px black;
	box-shadow: rgba(0, 0, 0, 0.814) 0px 3px 8px;
	border-radius: 10px;
	text-align: center;
}
</style>
