<template>
	<div class="easyDataTable">
		<EasyDataTable
			:headers="headers"
			:items="itemsList"
			table-class-name="customize-table"
		>
			<!--delete and edit button-->
			<template #item-edit="data">
				<div class="operation-wrapper">
					<button class="operation-icon" v-on:click="editItem(data)">
						<fa icon="edit" />
					</button>
				</div>

				<div class="modal-overlay" v-if="!isHidden">
					<div class="mymodal" v-if="!isHidden">
						<div class="close" v-on:click="hideModal">
							<fa icon="close" />
						</div>
						<div class="modal-title">UPDATE EXPENSE</div>

						<form id="myform" name="myForm" v-if="!isHidden">
							<div class="formli">
								<label for="item1">Item </label>
								<input
									type="text"
									v-model="item1"
									name="fitem"
									placeholder=" Enter Item"
								/>
								<br /><br />

								<label for="date1">Date </label>
								<input
									type="datetime-local"
									v-model="date1"
									name="fdate"
									placeholder="  DD/MM/YYYY"
									:max="this.currTime"
								/>
								<br /><br />

								<label for="category1">Category </label>
								<select name="categorie_drop" v-model="category1">
									<option value="">Select Category</option>
									<option>Food</option>
									<option>Groceries</option>
									<option>Fashion</option>
									<option>Transportation</option>
									<option>Healthcare</option>
									<option>Rental</option>
									<option>Utilities</option>
									<option>Entertainment</option>
									<option>Others</option>
								</select>
								<br /><br />

								<label for="amount1">Amount </label>
								<!-- Users must input a min value of 0 -->
								<input
									type="number"
									v-model="amount1"
									min="0"
									step="0.01"
									name="famount"
									placeholder=" Enter Amount"
								/>
								<br />
							</div>
							<div class="save">
								<button
									id="saveButton"
									type="button"
									v-on:click="updateData(data)"
									class="btn btn-white"
									data-dismiss="modal"
								>
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</template>
			<template #item-delete="data">
				<div class="operation-wrapper">
					<button class="operation-icon" v-on:click="deleteItem(data)">
						<fa icon="trash" />
					</button>
				</div>
			</template>
		</EasyDataTable>
	</div>
</template>

<script>
import { authentication } from "../firebase.js";
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UpdateExpense from "./UpdateExpense.vue";
import { Timestamp, updateDoc } from "firebase/firestore";

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

	emits: ["sendWeeklyExp", "reRender"],

	data() {
		return {
			headers: [
				{ text: "ID", value: "id" },
				{ text: "ITEM", value: "item" },
				{ text: "DATE", value: "date", sortable: true },
				{ text: "CATEGORY", value: "category" },
				{ text: "AMOUNT", value: "amount" },
				{ text: "EDIT", value: "edit" },
				{ text: "DELETE", value: "delete" },
			],

			itemsList: [],
			isHidden: true,
			currTime: "",
			item1: "",
			date1: "",
			category1: "",
			amount1: 0,
		};
	},
	async mounted() {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				this.$router.push({ name: "Login" });
			} else {
				this.activateGetExpensesFn();
				this.activateGetTime();
			}
		});
	},
	methods: {
		async hideModal() {
			this.isHidden = true;
		},
		async activateGetExpensesFn() {
			const auth = getAuth();
			const userEmail = auth.currentUser.email;
			try {
				// Fetch expenses data
				await this.getExpenses(userEmail);
				this.loaded = true;
			} catch (err) {
				console.error(err);
			}
		},
		async getExpenses(userEmail) {
			const today = new Date();
			// First day is the day of the month - the day of the week
			const firstDay = today.getDate() - today.getDay();
			// Last day is first day + 7
			const lastDay = firstDay + 7;

			const weekStart = new Date(today.setDate(firstDay));
			const formattedFullStartDate = this.formatDate(weekStart, "start");

			const weekEnd = new Date();
			const formattedFullEndDate = this.formatDate(weekEnd, "end");
			const endOfWeek = new Date(today.setDate(lastDay));

			// Set beginning of week by changing date and time
			const amtsRef = collection(db, "users", userEmail, "expenses");
			// Filter from beginning of the week to current time
			const q = query(
				amtsRef,
				where("Date", ">=", formattedFullStartDate),
				where("Date", "<=", formattedFullEndDate)
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

			this.$emit("sendWeeklyExp", [weeklyExp.toFixed(2), weekStart, endOfWeek]);

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
					generate: item[4],
				});
			}
		},
		async editItem(allData) {
			this.isHidden = false;
			this.item1 = allData.item;
			const tempdate1 = allData.date;
			const tempYear = tempdate1.slice(6);
			const tempMonth = tempdate1.slice(3, 5);
			const tempDay = tempdate1.slice(0, 2);
			this.date1 = `${tempYear}-${tempMonth}-${tempDay}T00:00`;
			this.category1 = allData.category;
			this.amount1 = parseFloat(allData.amount.slice(1));
		},
		async activateGetTime() {
			try {
				await this.getCurrentTime();
			} catch (err) {
				console.error(err);
			}
		},
		async getCurrentTime() {
			const currDateTime = new Date();
			const currYear = currDateTime.getFullYear();
			const currMonth = currDateTime.getMonth() + 1; // Month is zero-based so need to add 1
			const formatMonth = currMonth.toString().padStart(2, "0");
			const currDay = currDateTime.getDate();
			const formatDay = currDay.toString().padStart(2, "0");
			const currHours = currDateTime.getHours();
			const formatHours = currHours.toString().padStart(2, "0");
			const currMins = currDateTime.getMinutes();
			const formatMins = currMins.toString().padStart(2, "0");
			const formattedFullDate = `${currYear}-${formatMonth}-${formatDay}T${formatHours}:${formatMins}`;
			this.currTime = formattedFullDate;
		},
		async updateData(allData) {
			if (
				this.item1 == "" ||
				this.date1 == "" ||
				this.category1 == "" ||
				this.amount1 == ""
			) {
				alert("Please fill out all required fields.");
				return false;
			}
			let item = this.item1;

			let date = this.date1;
			// convert to TimeStamp
			let time = new Date(date);

			let category = this.category1;
			let amount = this.amount1;
			const current_timestamp = Timestamp.fromDate(new Date(time));

			if (confirm("Are you sure you would like to update " + item + "?")) {
				alert("Updating your data for item: " + item);
				try {
					var documentEdit = allData.generate;
					const userEmail = authentication.currentUser.email;
					await updateDoc(
						doc(db, "users", userEmail, "expenses", documentEdit),
						{
							Item: item,
							Category: category,
							Amount: amount,
							Date: current_timestamp,
						}
					);
					// forms resets to blank after submission
					(this.item1 = ""),
						(this.date1 = ""),
						(this.category1 = ""),
						(this.amount1 = ""),
						(this.isHidden = true);
					this.$emit("reRender");
				} catch (error) {
					console.error("Error updating document: " + error);
				}
			}
		},
		async deleteItem(allData) {
			const itemtoDelete = allData.item;
			if (confirm("Are you sure you would like to delete " + itemtoDelete)) {
				try {
					alert("Deleting item " + itemtoDelete + " in table");
					// remove from database
					const userEmail = authentication.currentUser.email;
					var documentToDelete = allData.generate;
					await deleteDoc(
						doc(db, "users", userEmail, "expenses", documentToDelete)
					);
					var allItems = this.itemsList;
					// user filter are Array.remove is not an official constructor and gives an error
					allItems = allItems.filter(function (name) {
						// filter by the id on the table and the documentID to prevent multiple deletes
						return name.generate != allData.generate && name.id != allData.id;
					});
					this.$emit("reRender");
				} catch (error) {
					console.error("Error deleting document: " + error);
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

h3 {
	color: #6c60f3;
}
label {
	font-size: 15px;
	color: var(--color-text);
	display: inline-block;
	width: 80px;
	text-align: right;
	padding: 5px;
	margin-right: 10px;
}
input,
select {
	width: 210px;
	font-size: 15px; /* adjust size of input text */
	font-family: Inter, Arial, Helvetica, sans-serif;
	background: var(--color-card);
	border: 1px solid rgb(230, 230, 230);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	color: var(--color-text);
	margin-bottom: 0.45rem;
}

input {
	border-radius: 4px;
	outline-color: rgb(230, 230, 230);
}

form {
	margin-top: 30px;
}
.modal-overlay {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.1);
	z-index: 100;
}
.mymodal {
	text-align: center;
	background-color: var(--color-card);
	height: 28rem;
	width: 33.5rem;
	margin-top: 10%;
	padding: 20px 0;
	border-radius: 20px;
	margin-left: 220px;
	margin-right: 20px;
}
.close {
	text-align: end;
	margin: 0 -90% 0 0;
	display: inline-flex;
	text-align: right;
	font-size: 20px;
	font-weight: 700;
	color: #6c60f3;
	cursor: pointer;
}
p {
	font-size: 16px;
	margin: 20px 0;
}
#saveButton {
	background: radial-gradient(
				144.64% 144.64% at 94.27% -44.64%,
				rgba(255, 255, 255, 0.3) 0%,
				rgba(255, 255, 255, 0) 100%
			)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
		#6c60f3;
	border: 1px solid #aba6a6;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 12px;
	width: 120px;
	height: 40px;
	color: white;
	font-size: 16px;
	font-weight: 700;
	margin-top: 50px;
	border: none;
}
.save {
	text-align: center;
}

.modal-title {
	color: #6c60f3;
	font-weight: 600;
	font-size: 20px;
	letter-spacing: 3px;
}

select {
	color: var(--color-text);
}
</style>
