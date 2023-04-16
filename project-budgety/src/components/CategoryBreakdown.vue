<template>
	<div class="breakdown-box" v-if="loaded">
		<div class="font-18">Breakdown by Category</div>
		<div class="categories">
			<div v-for="(row, index) in catList" :key="row[0]">
				<div class="category-1-top">
					<!-- If statements for icons -->
					<img
						v-if="row[0] == 'Fashion'"
						class="category-icon"
						src="../assets/icons/Fashion.png"
					/>
					<img
						v-else-if="row[0] == 'Entertainment'"
						class="category-icon"
						src="../assets/icons/Entertainment.png"
					/>
					<img
						v-else-if="row[0] == 'Food'"
						class="category-icon"
						src="../assets/icons/Food.png"
					/>
					<img
						v-else-if="row[0] == 'Healthcare'"
						class="category-icon"
						src="../assets/icons/Healthcare.png"
					/>
					<img
						v-else-if="row[0] == 'Transportation'"
						class="category-icon"
						src="../assets/icons/Transportation.png"
					/>
					<img
						v-else-if="row[0] == 'Utilities'"
						class="category-icon"
						src="../assets/icons/Utilities.png"
					/>
					<img
						v-else-if="row[0] == 'Groceries'"
						class="category-icon"
						src="../assets/icons/Groceries.png"
					/>
					<img
						v-else-if="row[0] == 'Others'"
						class="category-icon"
						src="../assets/icons/Others.png"
					/>
					<img
						v-else-if="row[0] == 'Rental'"
						class="category-icon"
						src="../assets/icons/Rental.png"
					/>
					<span class="category-text">{{ row[0] }}</span>
					<span class="category-text">{{ row[2] }}%</span>
					<span class="category-text">${{ row[1] }}</span>
				</div>
				<div class="progress">
					<v-progress-linear
						rounded="true"
						:color="getColor(row)"
						v-model="row[2]"
						height="8px"
					></v-progress-linear>
				</div>
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
			testValue: 90,
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

			let monthEnd;
			const currDate = new Date();
			const lastDayOfMonth = new Date(
				currDate.getFullYear(),
				currDate.getMonth() + 1,
				0
			);
			monthEnd = new Date(lastDayOfMonth.setHours(23, 59, 59, 59));

			// Fetch expenses data
			// Filter from beginning of the month to current time
			const amtsQuery = query(
				amtsRef,
				where("Date", ">=", new Date(monthStart)),
				where("Date", "<=", monthEnd)
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
		getColor(row) {
			if (row[0] == "Fashion") {
				return "#856dc8";
			} else if (row[0] == "Entertainment") {
				return "#eb8ad0";
			} else if (row[0] == "Food") {
				return "#4f94bc";
			} else if (row[0] == "Transportation") {
				return "#cc8a4a";
			} else if (row[0] == "Healthcare") {
				return "#539f37";
			} else if (row[0] == "Groceries") {
				return "#ac986b";
			} else if (row[0] == "Rental") {
				return "#38aca5";
			} else if (row[0] == "Utilities") {
				return "#8e451c";
			} else {
				// others
				return "#8f8f8f";
			}
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
	overflow-y: scroll;
	height: 100%;
	max-width: 400px;
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
	/* color: #856dc8; */
	font-weight: 700;
}
</style>
