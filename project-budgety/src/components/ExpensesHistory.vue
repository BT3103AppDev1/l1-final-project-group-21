<template>
	<div>
		<div class="container">
			<div class="filter-button" @click="showModal = true">
				<button>
					<fa icon="filter" />
					<span>&nbsp; Filter</span>
				</button>
			</div>
		</div>

		<Filter v-show="showModal" @catSelected="childcall($event)" />
		<Filter
			v-show="showModal"
			@closeModal="childcall($event)"
			@catSelected="childcall($event)"
		/>

		<EasyDataTable
			:headers="headers"
			:items="itemsList"
			table-class-name="customize-table"
		/>
	</div>
</template>

<script>
import { parse } from "@vue/compiler-dom";
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
import Filter from "./Filter.vue";
const db = getFirestore(firebaseApp);

export default {
	name: "Expenses History",
	components: { EasyDataTable: window["vue3-easy-data-table"], Filter },
	data() {
		return {
			showModal: false,
			headers: [
				{ text: "ID", value: "id" },
				{ text: "ITEM", value: "item" },
				{ text: "DATE", value: "date", sortable: true },
				{ text: "CATEGORY", value: "category" },
				{ text: "AMOUNT", value: "amount" },
			],

			itemsList: [],
			fullItemsList: [],
		};
	},
	async mounted() {
		try {
			const userEmail = authentication.currentUser.email;
			// Fetch expenses data
			await this.getExpenses(userEmail);
			this.filterCategories("Show All Categories");
			this.loaded = true;
		} catch (err) {
			console.error(err);
		}
	},
	methods: {
		async getExpenses(userEmail) {
			const date = new Date();
			const day = date.getDate();
			const month = date.getMonth();
			const newDate = new Date();
			// Set beginning of month by changing date and time
			let monthStart = newDate.setDate(1);
			let tempMonthStart = new Date(monthStart).setHours(0, 0, 0, 0);
			monthStart = new Date(tempMonthStart);
			const amtsRef = collection(db, "users", userEmail, "expenses");

			// Filter from beginning of the month to current time
			const q = query(
				amtsRef,
				where("Date", ">=", new Date(monthStart)),
				where("Date", "<=", new Date())
			);
			const amtsSnapshot = await getDocs(q);
			// Put individual items into a list then convert nested list to dictionary after sorting by date
			// Format: id, name, date, category, amount, doc.id
			let tempExpList = [];
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let dataID = doc.id;
				let expName = data.Item;
				let expAmt = "$" + String(parseFloat(data.Amount).toFixed(2));
				let expCat = data.Category;
				let expDate = data.Date;
				// Format date
				let expDateFormatted = new Date(expDate.seconds * 1000 + 28800 * 1000);
				let expDay = expDateFormatted.getDate();
				if (expDay < 10) {
					// Convert date to double digit 1 -> 01
					expDay = expDay.toString().padStart(2, "0");
				}
				let expMonth = expDateFormatted.getMonth() + 1;
				if (expMonth < 10) {
					expMonth = expMonth.toString().padStart(2, "0");
				}
				let expYear = expDateFormatted.getFullYear();
				let formattedDate =
					String(expDay) + "/" + String(expMonth) + "/" + String(expYear);
				// NOTE: dataID = doc.id for reference to update/delete
				let itemDetails = [expName, formattedDate, expCat, expAmt, dataID];
				tempExpList.push(itemDetails);
			});
			// sort expenses by date (latest first --> on top)
			tempExpList.sort(function (x, y) {
				return parseFloat(y[1].slice(0, 2)) - parseFloat(x[1].slice(0, 2));
			});
			for (const i in tempExpList) {
				let item = tempExpList[i];
				this.itemsList.push({
					id: String(parseFloat(i) + 1),
					item: item[0],
					date: item[1],
					category: item[2],
					amount: item[3],
				});
			}
			this.fullItemsList = this.itemsList;
		},
		filterCategories(catSelected) {
			if (catSelected == "Show All Categories" || catSelected == "") {
				this.itemsList = this.fullItemsList; // Revert back to all categories
			} else {
				this.itemsList = this.fullItemsList.filter(
					(lst) => lst.category == catSelected
				);
			}
		},
		childcall(category) {
			this.filterCategories(category);
			this.showModal = false;
		},
	},
};
</script>

<style scoped>
.customize-table {
	/* remove table border */
	--easy-table-border: 0px;
	--easy-table-header-font-color: var(--color-text);
	--easy-table-header-background-color: var(--color-card);
	--easy-table-body-row-font-color: var(--color-text);
	--easy-table-body-row-background-color: var(--color-card);
	--easy-table-footer-font-color: var(--color-text);
	--easy-table-footer-background-color: var(--color-card);
}
.container {
	display: flex;
	justify-content: right;
	margin-right: 10px;
	height: 0px;
}
.filter-button {
	bottom: 50px;
	background-color: var(--color-card);
	border: 0.5px solid --color-btn-border;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	padding: 5px 10px 5px 10px;
	font-weight: 500;
	font-size: 12px;
	color: #aba6a6;
	width: 70px;
	height: 30px;
}
.filter-button:hover {
	background-color: #f2f2f2;
	cursor: pointer;
}
</style>
