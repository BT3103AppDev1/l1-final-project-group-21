<template>
	<div class="easyDataTable">
		<EasyDataTable
			:headers="headers"
			:items="itemsList"
			table-class-name="customize-table"
		>
<<<<<<< HEAD
		<!--delete and edit button-->
		<template #item-edit="data">
			<div class="operation-wrapper">
				<button type="button" @click="showModal = true" class="operation-icon" data-bs-toggle="modal" data-bs-target="#exampleModal">
					<fa icon="edit"/>
				</button>
				<UpdateExpense v-show="showModal"/>
				<UpdateExpense v-show="showModal" @close-modal="showModal = false" />
			</div>
		</template>
		<template #item-delete="data">
			<div class="operation-wrapper">
				<button class="operation-icon" v-on:click="deleteItem(data)">
					<fa icon="trash" /></button>
			</div>
		</template>
=======
			<!--delete and edit button-->
			<template #item-edit="data">
				<div class="operation-wrapper">
					<button
						type="button"
						@click="showModal = true"
						class="operation-icon"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					>
						<fa icon="edit" />
					</button>
					<UpdateExpense v-show="showModal" />
					<UpdateExpense v-show="showModal" @close-modal="showModal = false" />
				</div>
			</template>
			<template #item-delete="data">
				<div class="operation-wrapper">
					<button class="operation-icon" v-on:click="deleteItem(data.item)">
						<fa icon="trash" />
					</button>
				</div>
			</template>
>>>>>>> d8c166a4d598792b5ffcc623e14eebcf8c92421c
		</EasyDataTable>
	</div>
</template>

<script>
import { authentication } from "../firebase.js";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";
import UpdateExpense from "./UpdateExpense.vue";

import {
	collection,
	addDoc,
	setDoc,
	doc,
	query,
	where,
	getDocs,
	getFirestore,
	deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
	name: "Recent Expenses",

	components: { EasyDataTable: window["vue3-easy-data-table"], UpdateExpense },

	emits: ["sendWeeklyExp"],

	data() {
		return {
			headers: [
				{ text: "ID", value: "id" },
				{ text: "ITEM", value: "item" },
				{ text: "DATE", value: "date", sortable: true },
				{ text: "CATEGORY", value: "category" },
				{ text: "AMOUNT", value: "amount" },
<<<<<<< HEAD
				{ text: "EDIT", value: "edit"},
				{ text: "DELETE", value: "delete" }
=======
				{ text: "EDIT", value: "edit" },
				{ text: "DELETE", value: "delete" },
>>>>>>> d8c166a4d598792b5ffcc623e14eebcf8c92421c
			],

			itemsList: [],
			showModal: false,
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
			const today = new Date();
			// First day is the day of the month - the day of the week
			const firstDay = today.getDate() - today.getDay();
			// Last day is first day + 7
			const lastDay = firstDay + 7;

			const weekStart = new Date(today.setDate(firstDay));
			// const tempDate = new Date();
			const formattedFullStartDate = this.formatDate(weekStart, "start");

			const weekEnd = new Date(today.setDate(lastDay));
			const formattedFullEndDate = this.formatDate(weekEnd, "end");

			// Set beginning of week by changing date and time
			const amtsRef = collection(db, "users", userEmail, "expenses");
			// Filter from beginning of the week to current time
			const q = query(
				amtsRef,
<<<<<<< HEAD
				where("Date", ">=", weekStart),
				// undo
				where("Date", "<=", weekEnd)
=======
				where("Date", ">=", formattedFullStartDate),
				where("Date", "<", formattedFullEndDate)
>>>>>>> d8c166a4d598792b5ffcc623e14eebcf8c92421c
			);
			const amtsSnapshot = await getDocs(q);

			// Put individual items into a list then convert nested list to dictionary after sorting by date
			// Format: id, name, date, category, amount, doc.id
			let weeklyExp = 0;
			let tempExpList = [];
			amtsSnapshot.forEach((doc) => {
				let data = doc.data();
				let dataID = doc.id;
				let expName = data.Item;
				let expAmt = "$" + String(parseFloat(data.Amount).toFixed(2));
				weeklyExp += parseFloat(data.Amount);
				let expCat = data.Category;
				let expDate = data.Date;
				// Format date
				let expDateFormatted = expDate.toDate();
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

			this.$emit("sendWeeklyExp", [weeklyExp.toFixed(2), weekStart, weekEnd]);

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
					generate: item[4]
				});
			}
		},
<<<<<<< HEAD
		async deleteItem(allData) {
			const itemtoDelete = allData.item
			if (confirm("Are you sure you would like to delete " + itemtoDelete)) {
				try {
					alert("Deleting item " + itemtoDelete + " in table");
					// remove from database
					const userEmail = authentication.currentUser.email;
					var documentToDelete = allData.generate;
					await deleteDoc(doc(db,"users", userEmail, "expenses", documentToDelete));
					console.log("Document succesfully deleted!", itemtoDelete)
					// remove this row from table
					var allItems = this.itemsList;
					// user filter are Array.remove is not an official constructor and gives an error
					allItems = allItems.filter(function(name) {
						// filter by the id on the table and the documentID to prevent multiple deletes
						return (name.generate != allData.generate && name.id != allData.id)
					})
				}
				catch(error) {
					console.error("Error adding document: " + error);
=======
		async deleteItem(item) {
			if (confirm("Are you sure you would like to delete " + item)) {
				alert("Deleting item " + item + " in table");
				// remove from database
				const userEmail = authentication.currentUser.email;
				await deleteDoc(doc(db, "users", userEmail, "expenses", item));
				console.log("Document succesfully deleted!", item);
				// remove this row from table
				const allItems = this.itemsList;
				while (i < allItems.length) {
					if (allItems[i].item == item) {
						allItems.remove(i, 1);
					}
>>>>>>> d8c166a4d598792b5ffcc623e14eebcf8c92421c
				}
			}
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

.operation-wrapper .operation-icon {
	width: 30px;
	cursor: pointer;
}
</style>
