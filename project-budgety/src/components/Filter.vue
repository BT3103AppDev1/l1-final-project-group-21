<template>
	<div class="modal-overlay">
		<div class="modal">
			<h3>Filter By Category</h3>
			<form id="myform">
				<div class="formli">
					<label for="category1">Category: &nbsp;</label>
					<select
						name="categorie_drop"
						id="category1"
						v-model="selectedCategory"
					>
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
						<option>Show All Categories</option>
					</select>
					<br /><br />

					<div class="save">
						<button
							id="savebutton"
							type="button"
							v-on:click="
								$emit('close-modal'), filterCategories(selectedCategory)
							"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
		<div class="close" @click="this.$emit('close-modal')">
			<button>close</button>
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
	props: {
		"close-modal": Boolean,
	},
	emits: ["catSelected"],
	methods: {
		filterCategories(selectedCategory) {
			this.$emit("catSelected", selectedCategory);
		},
	},
};
</script>

<style scoped>
label {
	font-size: 15px;
	display: inline-block;
	width: 80px;
	text-align: right;
}

input,
select {
	width: 210px;
	font-family: Inter;
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
}

.modal {
	text-align: center;
	background-color: white;
	height: 270px;
	width: 500px;
	margin-top: 10%;
	padding: 60px 0;
	border-radius: 20px;
}
.close {
	margin: 10% 0 0 16px;
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
