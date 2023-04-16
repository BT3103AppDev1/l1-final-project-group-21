<template>
	<div class="modal-overlay">
		<div class="mymodal">
			<div class="close" @click="close()">
				<fa icon="close" />
			</div>
			<div class="modal-title">FILTER BY CATEGORY</div>

			<form id="myform">
				<div class="formli">
					<br />
					<label for="category1">Category:</label>
					<select
						name="categorie_drop"
						id="category1"
						v-model="selectedCategory"
						placeholder="Select Category"
					>
						<option value="" selected disabled>Select Category</option>
						<option>Food</option>
						<option>Groceries</option>
						<option>Fashion</option>
						<option>Transportation</option>
						<option>Healthcare</option>
						<option>Rental</option>
						<option>Utilities</option>
						<option>Entertainment</option>
						<option>Others</option>
						<option>Show All Categories</option>
					</select>
					<br /><br />

					<div class="save">
						<button
							id="savebutton"
							type="button"
							v-on:click="close(), filterCategories(selectedCategory)"
						>
							Filter
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
	name: "Filter",
	data() {
		return {
			selectedCategory: "",
		};
	},
	emits: ["catSelected", "closeModal"],
	methods: {
		filterCategories(selectedCategory) {
			this.$emit("catSelected", selectedCategory);
		},
		close() {
			this.$emit("closeModal", "close");
		},
	},
};
</script>

<style scoped>
label {
	font-size: 15px;
	color: #6c60f3;
	display: inline-block;
	width: 80px;
	text-align: right;
	padding: 5px;
	margin-right: 10px;
}

input,
select {
	width: 210px;
	font-family: Inter, Arial, Helvetica, sans-serif;
	background: var(--color-card);
	border: 1px solid rgb(230, 230, 230);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

input {
	border-radius: 4px;
}

select {
	color: var(--color-text);
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
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 100;
}

.mymodal {
	text-align: center;
	background-color: var(--color-card);
	height: 20rem;
	width: 33.5rem;
	margin-top: 10%;
	padding: 20px 0;
	border-radius: 20px;
	margin-left: 220px;
	margin-right: 20px;
}

.modal-title {
	color: #6c60f3;
	font-weight: 600;
	font-size: 20px;
	letter-spacing: 3px;
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

.close-img {
	width: 25px;
}

.check {
	width: 150px;
}

h6 {
	font-weight: 500;
	font-size: 28px;
	margin: 20px 0;
}

p {
	font-size: 16px;
	margin: 20px 0;
}

button {
	background-color: #6c60f3;
	width: 120px;
	height: 40px;
	color: white;
	font-size: 14px;
	border-radius: 10px;
	margin-top: 50px;
	border: none;
}
</style>
