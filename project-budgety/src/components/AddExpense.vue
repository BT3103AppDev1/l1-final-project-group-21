<template>
    <div class="container">
        <form id="myform">
            <h2>Add Expense</h2>
  
            <div class="formli">
                <label for="item1">Item: </label>
                <input type="text" id="item1" required="" placeholder="Enter Item"> <br><br>
  
                <label for="date1">Date: </label>
                <input type="text" id="date1" required="" placeholder="DD/MM/YYYY"> <br><br>
  
                <label for="category1">Category: </label>
                <input type="text" id="category1" required="" placeholder="Category"> <br><br>
  
                <label for="amount1">Amount: </label>
                <input type="number" id="amount1" required="" placeholder="Enter Amount"> <br><br>
  
                <div class="save">
                    <button id="savebutton" type="button" v-on:click="savetofs">Save</button>
                </div>
            </div>
        </form>
    </div>
  </template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import { getFirestore } from "firebase/firestore";
  import { doc, setDoc } from "firebase/firestore";
  const db = getFirestore(firebaseApp);
  
  export default {
      name: "Dashboard",
      methods: {
        async savetofs() {
          console.log("IN AC")
  
          let item = document.getElementById("item1").value
          let date = document.getElementById("date1").value
          let category = document.getElementById("category1").value
          let amount = document.getElementById("amount1").value
  
          alert("Saving your data for Item: " + item)
  
          try {
            const docRef = await setDoc(doc(db, "AddExpense", item),{
              Item : item, Date: date, Category : category, Amount : amount
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

  <style>
  </style>