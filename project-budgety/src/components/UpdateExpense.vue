<template>
    <div class="modal-overlay">
      <div class="mymodal">
        <div class="close" @click="$emit('close-modal')">
            <fa icon="close" />
        </div>
        <div class="modal-title">UPDATE EXPENSE</div>
        
        <form id="myform" name="myForm">
          <div class="formli">
            <label for="item1">Item </label>
            <input type="text" v-model="item1" name="fitem" placeholder=" Enter Item"> <br><br>
  
            <label for="date1">Date </label>
            <input type="datetime-local" v-model="date1" name="fdate" placeholder="  DD/MM/YYYY"> <br><br>
  
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
            <br><br>
  
            <label for="amount1">Amount </label>
            <!-- Users must input a min value of 0 -->
            <input type="number" v-model="amount1" min="0" step="0.01" name="famount" placeholder=" Enter Amount"> <br>
          </div>
          <div class="save">
            <button id="saveButton" type="button" v-on:click="saveData" class="btn btn-white" data-dismiss="modal">Update</button>
          </div>
        </form>
      </div>
    </div>
  </template>
    
  <script>
  import firebaseApp, { authentication } from '../firebase.js';
  import { DocumentReference, Timestamp, getFirestore } from "firebase/firestore";
  import { doc, setDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  const db = getFirestore(firebaseApp);
  export default {
      data() {
        return {
          item1: "",
          date1: "",
          category1: "",
          amount1: "",
          showModal: false,
        }
      },
      methods: {
          async saveData() {
              // All inputs of form must be filled
              if (this.item1 == "") {
                alert("Please fill in Item");
                return false;
              }
              if (this.date1 == "") {
                alert("Please fill in Date");
                return false;
              }
              if (this.category1 == "") {
                alert("Please select a Category");
                return false;
              }
              if (this.amount1 == "") {
                alert("Please fill in Amount");
                return false;
              }
              // Only if all inputs have been filled
              let item = this.item1
  
              let date = this.date1
              // convert to TimeStamp
              let time = new Date(date);
  
              let category = this.category1
              let amount = this.amount1
              const current_timestamp = Timestamp.fromDate(new Date(time))
              alert("Saving your data for Item: " + item)
              try {
                const userEmail = authentication.currentUser.email;
                  const docRef = await setDoc(doc(db,"users", userEmail, "expenses", item),{
                      Item : item, Date : current_timestamp, Category : category, Amount : amount
                  })
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
    color: #6C60F3;
    display: inline-block;
    width: 80px;
    text-align: right;
    padding: 5px;
    margin-right: 10px;
  }
  input, select {
    width: 210px;
    font-family: Inter, Arial, Helvetica, sans-serif;
    background: var(--color-card);
    border: 1px solid rgb(230, 230, 230);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  select {
    color: var(--color-text);
  }
  input {
    border-radius: 4px;
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
    background-color: rgba(0, 0, 0, 0.2);
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
    color: #6C60F3;
    cursor: pointer;
  }
  p {
    font-size: 16px;
    margin: 20px 0;
  }
  #saveButton {
    background: radial-gradient(144.64% 144.64% at 94.27% -44.64%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #6C60F3;
    border: 1px solid #ABA6A6;
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
  .save{
      text-align: center;
  }
  input {
    outline-color: rgb(230, 230, 230);
  }
  .modal-title {
    color: #6C60F3;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 3px;
  }
  </style>