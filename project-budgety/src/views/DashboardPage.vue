<template>
    <div id="dashboard-page">
        <div class="dashboard-section1">
            <div class="left">
                <div class="welcome">
                    <div class="title">Welcome back, {{ username }}!</div>
                    <div class="subtitle">Here's an overview of your weekly expenses:</div>
                </div>
                <div class="expense-box">
                    <div class="expense-box-header">WEEKLY EXPENSES</div>
                    <div class="expense-value-dashboard">${{ weeklyExp }}</div>
                </div>
            </div>
			<!-- Start of Doughnut Chart div -->
            <div class="weekly">
                <div class="weekly-title">WEEKLY SPENDING</div>
                <div class="spending-container">
                    <div class="doughnutchart">
                        <DoughnutChart @sendCatDict = "getTop3Cat($event)" :key="reloadD" /> 
                    </div>
                    <div class="top3">
                        <div class="top3-title">TOP 3 CATEGORIES</div>
                        <div class="top3-content">
							<div v-bind:class="(catCount>0) ? 'each-content' : 'notVisible'" >
                                <fa icon="square" id="cat1"/>
                                {{ cat1 }}
                            </div>
                            <div v-bind:class="(catCount>1) ? 'each-content' : 'notVisible'">
                                <fa icon="square" id="cat2"/>
								{{ cat2 }}
                            </div>
                            <div v-bind:class="(catCount>2)? 'each-content' : 'notVisible'">
                                <fa icon="square" id="cat3"/>
								{{ cat3 }}
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
		<!-- Start of Recent Expenses div -->
        <div class="dashboard-section2">
            <div class="top-line">
                <div class="font-18">Recent Expenses [{{ weekStart }} - {{ weekEnd }}]</div>
					<div class="expenses-btn">
						<button @click="showModal = true"><fa icon="add" /></button>
					</div>

					<AddExpense v-show="showModal"/>
					<AddExpense v-show="showModal" @close-modal="showModal = false" @reRender = "forceReRender()"/>
            </div>
            <div class="expenses-table">
              <RecentExpenses 
			  @sendWeeklyExp = "getWeeklyExpense($event)" 
			  :key="reloadRE"
			   />
            </div>
        </div>
    </div>
    <Sidebar/>
</template>

<script>
import DoughnutChart from "../components/DoughnutChart.vue";
import RecentExpenses from "../components/RecentExpenses.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import AddExpense from "../components/AddExpense.vue";

import { authentication } from "../firebase.js";

export default {
        name:'Dashboard',
        // local registration using components
        components: { 
        	DoughnutChart, 
        	RecentExpenses,
        	Sidebar,
		    AddExpense
        },
        data() {
		      return {
				username: "",
				weeklyExp: "",
				weekStart: "",
				weekEnd: "",
				cat1: "",
				cat2: "",
				cat3: "",
				catCount: 0,
				showModal: false,
				categoryColours: {
				"Fashion": '#856dc8',
				"Entertainment": '#eb8ad0',
				"Food": '#4f94bc',
				"Transportation": '#cc8a4a',
				"Healthcare": '#539f37',
				"Groceries": '#ac986b',
				"Rental": '#38aca5',
				"Utilities": '#8e451c',
				"Others": "#8f8f8f",
				},
				reloadRE: 0,
				reloadD: 0,
		      };
	      },
		  
        mounted() {
			this.username = authentication.currentUser.displayName;
        	console.log("Component Mounted")
        },

		methods: {
			forceReRender() {
				this.reloadRE += 1;
				this.reloadD += 1;
				console.log("rerender in progress")
			},

			async getWeeklyExpense(weeklyExp) {
				// Set total expenses
				this.weeklyExp = weeklyExp[0];

				// Display week dates
				// Week Start Date
				let weekStartDate = weeklyExp[1];
				let weekStartDay = weekStartDate.getDate();
				if (weekStartDay < 10) {
				weekStartDay = weekStartDay.toString().padStart(2, "0"); 
				}
				let weekStartMonth = weekStartDate.getMonth() + 1;
				if (weekStartMonth < 10) {
					weekStartMonth = weekStartMonth.toString().padStart(2, "0");
				}
				let weekStartYear = weekStartDate.getFullYear();
				let formattedWeekStart = String(weekStartDay) + "/" + String(weekStartMonth) + "/" + String(weekStartYear);
				this.weekStart = formattedWeekStart;
			
				// Week End Date
				let weekEndDate = weeklyExp[2];
				let weekEndDay = weekEndDate.getDate();
				if (weekEndDay < 10) {
				weekEndDay = weekEndDay.toString().padStart(2, "0"); 
				}
				let weekEndMonth = weekEndDate.getMonth() + 1;
				if (weekEndMonth < 10) {
				weekEndMonth = weekEndMonth.toString().padStart(2, "0");
				}
				let weekEndYear = weekEndDate.getFullYear();
				let formattedWeekEnd = String(weekEndDay) + "/" + String(weekEndMonth) + "/" + String(weekEndYear);
				this.weekEnd = formattedWeekEnd;
			},

			async getTop3Cat(allCatDict) {
				// Take top 3 categories for breakdown
				let topCatList = Object.entries(allCatDict);
				topCatList.sort(function (x, y) {
					return y[1] - x[1];
				});
				topCatList = topCatList.slice(0,3);
				this.catCount = topCatList.length;

				// Calculate Total Weekly Expense amount
				let cat1Amt = 0;
				let cat2Amt = 0;
				let cat3Amt = 0;
				let totalExpense = 0; 
				if (this.catCount > 0) {
					cat1Amt = topCatList[0][1];
					totalExpense += cat1Amt;
				}
				if (this.catCount > 1) {
					cat2Amt = topCatList[1][1];
					totalExpense += cat2Amt;
				}
				if (this.catCount > 2) {
					cat3Amt = topCatList[2][1];
					totalExpense += cat3Amt;
				}	
					
				if (this.catCount > 0) {
					// There is only 1 top category
					const cat1Cat = topCatList[0][0];
					const cat1Per = (parseFloat(cat1Amt) / parseFloat(totalExpense) * 100)
					this.cat1 = cat1Cat + ", " + parseFloat(cat1Per).toFixed(1) + "%";
					document.getElementById("cat1").style.color = this.categoryColours[cat1Cat];
				}
				if (this.catCount > 1) {
					// There are 2 top categories
					const cat2Cat = topCatList[1][0];
					const cat2Per = (parseFloat(cat2Amt) / parseFloat(totalExpense) * 100)
					this.cat2 = cat2Cat + ", " + parseFloat(cat2Per).toFixed(1) + "%";
					document.getElementById("cat2").style.color = this.categoryColours[cat2Cat];
				}

				if (this.catCount > 2) {
					// There are 3 top categories
					const cat3Cat = topCatList[2][0];
					const cat3Per = (parseFloat(cat3Amt) / parseFloat(totalExpense) * 100)
					this.cat3 = cat3Cat + ", " + parseFloat(cat3Per).toFixed(1) + "%";
					document.getElementById("cat3").style.color = this.categoryColours[cat3Cat];
				}
			},
		}
    }
</script>

<style scoped>
#dashboard-page {
	display: flex;
	flex-direction: column;
	margin: 0rem 2rem;
}
.dashboard-section1 {
	display: flex;
	padding-top: 3.125rem;
	margin: 1.563rem 0rem;
	/* align-items: baseline; */
	/* justify-content: baseline; */
}
.left {
	display: flex;
	flex-direction: column;
	margin-right: 1rem;
	overflow: auto;
	flex: 0.8;
	/* flex: 0.5 0.5 auto; */
}
.title {
	font-size: 24px;
	font-weight: 500;
}
.weekly-title {
	font-size: 24px;
	font-weight: 300;
	letter-spacing: 1px;
	margin: 1rem 0rem;
}
.subtitle {
	font-size: 14px;
	font-weight: 300;
}
.expense-box {
	background: linear-gradient(
		44.35deg,
		#b55656 1.1%,
		#8ca3fc 1.11%,
		rgba(213, 144, 219, 0.87) 85.06%,
		#ab8cdd 98.97%
	);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 2.5rem;
	padding: 4.5rem 0rem;
	margin: 25px 15px 0px 0px;
	text-align: center;
	color: #ffffff;
	/* max-width: 350px; */
}
.expense-box-header {
	font-style: normal;
	font-weight: 300;
	font-size: 24x;
	letter-spacing: 2px;
}
.expense-value-dashboard {
	font-weight: 600;
	font-size: 55px;
}

.weekly {
	background: var(--color-card);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 2.4rem;
	text-align: center;
	flex: 1.5;
	overflow: auto;
}
.spending-container {
	display: flex;
	padding: 0rem 2.2rem;
	/* centralise doughnut and top3 */
	align-items: center;
}
.doughnutchart {
	height: 250px;
}

.top3 {
	flex: 1;
	/* align with top3-content */
	display: flex;
	flex-direction: column;
	align-items: center;
}

.top3-title {
	font-size: 18px;
	font-weight: 700;
}

.top3-content {
	text-align: start;
}

.each-content {
	margin-top: 0.9rem;
	font-size: 16px;
	font-weight: 500;
}
.notVisible {
	display: none;
}

.font-18 {
	font-size: 18px;
	font-weight: 500;
	padding: 20px;
}
.dashboard-section2 {
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

.top-line {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.expenses-btn {
	align-items: center;
	text-align: center;
	background-color: var(--color-card);
	border: 0.5px solid --color-btn-border;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 40px;
	padding: 5px 10px 5px 10px;
	margin-right: 30px;
	font-weight: 500;
	font-size: 15px;
	color: #aba6a6;
}

/* set margin for the right-most button */
.last-btn {
	margin-right: 35px;
}

.expenses-btn:hover {
	background-color: #f2f2f2;
	cursor: pointer;
}

.expenses-table {
	padding: 0rem 1.875rem;
	margin-bottom: 2rem;
}
</style>
