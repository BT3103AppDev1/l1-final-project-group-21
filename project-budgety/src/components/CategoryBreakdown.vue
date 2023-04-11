<template>
	<div class="breakdown-box" v-if="loaded">
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

const db = getFirestore(firebaseApp);

export default {
	name: "CategoryBreakdown",
	data() {
		return {
			catList: [],
			totalExpenses: 0,
			loaded: false,
		};
	},
	async mounted() {
		try {
			const userEmail = authentication.currentUser.email;
			const amtsRef = collection(db, "users", userEmail, "expenses");
			// Update total and average expenses
			// And get breakdown by category
			await this.getBreakdown(amtsRef);
			this.loaded = true;
		} catch (err) {
			console.error(err);
		}
	},
	methods: {
		async getBreakdown(amtsRef) {
			const date = new Date();
			const day = date.getDate();
			const month = date.getMonth();
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
			let catDict = {};
			// Find total sum of expenses for each day
			// Get expenses breakdown by category
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let expAmt = data.Amount;
				this.totalExpenses += expAmt;

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
.breakdown-box {
	/* width: 23.75rem; */
	/* height: 233px; */
	background: var(--color-card);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 0.625rem;
	flex: 1;
	overflow: auto;
	height: 100%;
}
.font-18 {
	font-size: 18px;
	font-weight: 500;
	padding: 20px;
}
.progress {
	/* add space between each category */
	margin-bottom: 1.25rem;
}
.categories {
	padding: 0rem 1.25rem;
}
.category-1-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.625rem;
}
.category-icon {
	width: 2.5rem;
}
.category-text {
	color: #856dc8;
	font-weight: 700;
}
.blue {
	color: #4f94bc;
}
</style>
