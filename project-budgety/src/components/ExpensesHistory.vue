<template>
	<EasyDataTable
		:headers="headers"
		:items="itemsList"
		table-class-name="customize-table"
	/>
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
	components: { EasyDataTable: window["vue3-easy-data-table"] },
	data() {
		return {
			headers: [
				{ text: "ID", value: "id" },
				{ text: "ITEM", value: "item" },
				{ text: "DATE", value: "date", sortable: true },
				{ text: "CATEGORY", value: "category" },
				{ text: "AMOUNT", value: "amount" },
			],
			itemsList: [],
		};
	},
	async mounted() {
		try {
			const userEmail = authentication.currentUser.email;
			// Fetch expenses data
			await this.getExpenses(userEmail);
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
			const amtsRef = collection(db, userEmail, "expensesDoc", "expenses");
			// Filter from beginning of the month to current time
			const q = query(
				amtsRef,
				where("date", ">=", new Date(monthStart)),
				where("date", "<=", new Date())
			);
			const amtsSnapshot = await getDocs(q);
			// Put individual items into a list then convert nested list to dictionary after sorting by date
			// Format: id, name, date, category, amount, doc.id
			let tempExpList = [];
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let dataID = doc.id;
				let expName = data.name;
				let expAmt = "$" + String(parseFloat(data.amount).toFixed(2));
				let expCat = data.category;
				let expDate = data.date;
				// Format date
				let expDateFormatted = new Date(expDate.seconds * 1000 + 28800 * 1000);
				let expDay = expDateFormatted.getDate();
				if (expDay < 10) {
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
		},
	},
};
</script>

<style>
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
</style>
