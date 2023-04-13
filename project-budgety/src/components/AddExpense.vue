<template>
  <div class="modal-overlay">
    <div class="mymodal">
      <div class="close" @click="$emit('close-modal')">
        <button id="closeButton"><fa icon="close" /></button>
      </div>
      <h3><b>Add New Expense</b></h3>
      
      <form id="myform">
        <div class="formli">
          <label for="item1">Item:</label>
          <input type="text" v-model="item1" required="" placeholder="Enter Item"> <br><br>

          <label for="date1">Date: </label>
          <input type="datetime-local" v-model="date1" required="" placeholder="DD/MM/YYYY"> <br><br>

          <label for="category1">Category: </label>
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
          <br><br>

          <label for="amount1">Amount: </label>
          <input type="number" v-model="amount1" required="" placeholder="Enter Amount"> <br><br>

          <div class="save">
            <button id="saveButton" type="button" v-on:click="saveData" class="btn btn-white" data-dismiss="modal">Save</button>
          </div>
        </div>
      </form>
    </div>
    <!-- <div class="close" @click="$emit('close-modal')">
      <button id="closeButton"><fa icon="close" /></button>
    </div> -->
  </div>
</template>
  
<script>
import firebaseApp, { authentication } from '../firebase.js';
import { DocumentReference, getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    data() {
      return {
        item1: this.item1,
        date1: this.date1,
        category1: this.category1,
        amount1: this.amount1,
      }
    },
    methods: {
        async saveData() {
            console.log("IN AC")

            let item = this.item1
            let date = this.date1
            let category = this.category1
            let amount = this.amount1
            
            alert("Saving your data for Item: " + item)

            try {
              const userEmail = authentication.currentUser.email;
                const docRef = await setDoc(doc(db,"users", userEmail, "expenses", date),{
                    item : item, date : date, category : category, amount : amount
                })
                console.log(docRef)
                document.getElementById('myform').reset();
                this.$emit("added")
            }
            catch(error) {
                console.error("Error adding document: " + error);
            }
        }
    }
}
</script>

<style scoped>
h3 {
  color: #6C60F3;
}

label {
  font-size: 15px;
  display: inline-block;
  width: 80px;
  text-align: right;
  padding: 5px;
}

input, select {
  width: 210px;
  font-family: Arial, Helvetica, sans-serif
}

input {
  color: grey;
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
  background-color: white;
  /* height: 50vh; */
  height: 28rem;
  /* width: 60vh; */
  width: 33.5rem;
  margin-top: 10%;
  /* padding: 60px 0; */
  padding: 20px 0;
  border-radius: 20px;
  margin-left: 220px;
  margin-right: 20px;
}
.close {
  /* margin: 10% 0 0 0; */
  margin: 0 -90% 0 0;
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

#saveButton {
  background-color: #6C60F3;
  width: 120px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 10px;
  margin-top: 50px;
  border: none;
}

#closeButton {
	align-items: center;
	text-align: center;
	background-color: var(--color-card);
	border: 0.5px solid --color-btn-border;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 40px;
	padding: 5px 10px 5px 10px;
	margin-right: 10px;
	font-weight: 500;
	font-size: 15px;
	background-color: #6C60F3;
  color: white;
}
.save{
    text-align: center;
}

input {
  outline-color: grey;
}

</style>