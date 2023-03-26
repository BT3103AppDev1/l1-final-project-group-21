<template>
<body>
  <!-- <div id="analytics-page"> -->

    <div class="section1">
        <div class="analytics-header">Analytics</div>
        <div class="expense-boxes">
            <div class="expense-box">
                <div class="expense-box-header">TOTAL EXPENSES</div>
                
                <div class="expense-value">$190.56</div>
            </div>
            <div class="expense-box">
                <div class="expense-box-header">AVG EXPENSES/DAY</div>
                
                <div class="expense-value">$13.62</div>
            </div>
        </div>
    </div>

    <div class="section2">
        <div class="line-graph-box">
            <div class="font-18">Daily Expenditure</div>
            <LineChart />
        </div>
        <div class="breakdown-box">
            <div class="font-18">Breakdown by Category</div>
            <div class="categories">  </div>
        </div>
    </div>

    <div class="section3">
        <div class="top-line">
            <div class="font-18">Expenses History</div>
            <div class="filter-btn-wrapper">
              <div class="filter-btn">
                <fa icon="filter" />Filter
              </div>
            </div>
        </div>
        <div class="expenses-table">
          <ExpensesHistory />
        </div>
    </div>
  <!-- </div> -->
  
</body>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import ExpensesHistory from '../components/ExpensesHistory.vue'

export default {
      name:'Analytics',
      // local registration using components
      components: { 
        LineChart, 
        ExpensesHistory 
      },
      mounted() {
        console.log("Component Mounted")


      }
      
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'); */
/* root {
  apply to everything
  font-family: 'Inter';
} */

body {
  /* remove the centering from main.css */
  place-items: unset !important;
  display: flex;
  flex-direction: column;
}

.analytics-header, .expense-value {
  font-size: 24px;
  font-weight: 500;
}
.analytics-header {
  padding-top: 50px;
  text-align: left;
}

#analytics-page {
  /* background-color: #8CA3FC !important; */
}


.expense-boxes {
  display: flex;
}

.expense-box {
  background: linear-gradient(44.35deg, #B55656 1.1%, #8CA3FC 1.11%,
   rgba(213, 144, 219, 0.87) 85.06%, #AB8CDD 98.97%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px 45px 15px 45px;
  margin: 15px 25px 0px 0px;
}

.expense-box-header {
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 2px;
  color: #FFFFFF;
}

.expense-value {
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  color: #FFFFFF;
}

.breakdown-box {
  /* width: 282px;
  height: 233px; */
  /* max-width: fit-content; */
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.font-18 {
  font-size: 18px;
  font-weight: 500;
  margin: 30px;
  padding: 15px 0px;
}

.section2 {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}

.line-graph-box {
  /* width: 797px;
  height: 231.25px; */
  /* max-width: fit-content; */
  background: #FFFFFF;
  box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: left;
}

.section3 {
  /* width: 1090px;
  height: 366px; */
  background: #ffffff;
  box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

.top-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-btn { /* possibly for all buttons */
  align-items: center;
  background-color: #FFFFFF;
  border: 0.5px solid #F4F4F4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 5px 10px 5px 10px;
  margin-right: 35px;
  font-weight: 500;
  font-size: 12px;
  color: #ABA6A6;
  /* font-weight: var(--font-medium); */
}

.filter-btn:hover {
  background-color: #F2F2F2;
  cursor: pointer;
}

</style>