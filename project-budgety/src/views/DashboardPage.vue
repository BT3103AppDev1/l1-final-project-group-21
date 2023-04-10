<template>
    <div id="dashboard-page">
        <div class="dashboard-section1">
            <div class="left">
                <div class="welcome">
                    <div class="title">Welcome back, Doraemon!</div>
                    <div class="subtitle">Here's an overview of your weekly expenses:</div>
                </div>
                <div class="expense-box">
                    <div class="expense-box-header">EXPENSES</div>
                    <div class="expense-value-dashboard">$132.56</div>
                </div>
            </div>
    
            <div class="weekly">
                <div class="weekly-title">WEEKLY SPENDING</div>
                <div class="spending-container">
                    <div class="doughnutchart">
                        <DoughnutChart /> 
                    </div>
                    <div class="top3">Top 3 Categories</div>
                </div>
            </div>
        </div>
    
        <div class="dashboard-section2">
            <div class="top-line">
                <div class="font-18">Recent Expenses</div>
                  <div class="add-btn">
                    <fa icon="add" />
                </div>
            </div>
            <div class="expenses-table">
              <RecentExpenses />
            </div>
        </div>
    </div>
    <Sidebar/>
</template>
    
<script>
import DoughnutChart from '../components/DoughnutChart.vue';
import RecentExpenses from '../components/RecentExpenses.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';

export default {
        name:'Dashboard',
        // local registration using components
        components: { 
        DoughnutChart, 
        RecentExpenses,
        Sidebar,
        },
        mounted() {
        console.log("Component Mounted")
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
    flex-direction: row;
    padding-top: 3.125rem;
    margin: 1.563rem 0rem;
}
.left {
    display: flex;
    flex-direction: column;
    margin-right: 1.25rem;
    overflow: auto;
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
    margin-top: 1rem;
}
.subtitle {
    font-size: 14px;
    font-weight: 300;
}
.expense-box {
    background: linear-gradient(44.35deg, #B55656 1.1%, #8CA3FC 1.11%,
    rgba(213, 144, 219, 0.87) 85.06%, #AB8CDD 98.97%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2.5rem;
    padding: 4.5rem 2rem;
    margin: 25px 25px 0px 0px;
    text-align: center;
    color: #FFFFFF;
    /* flex: 1; */
}
.expense-box-header {
    font-style: normal;
    font-weight: 300;
    font-size: 24x;
    letter-spacing: 2px;
}
.expense-value-dashboard {
    font-weight: 600;
    font-size: 60px;
}

.weekly {
    background: var(--color-card);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2.4rem;
    text-align: center;
    /* flex: 2; */
    overflow: auto;
}
.spending-container {
    display: flex;
    overflow: auto;
}
.doughnutchart {
    flex: 1;
}

.top3 {
    flex: 1;
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

.add-btn { /* possibly for all buttons */
    align-items: center;
    text-align: center;
    background-color: var(--color-card);
    border: 0.5px solid --color-btn-border;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding: 5px 10px 5px 10px;
    margin-right: 35px;
    font-weight: 500;
    font-size: 15px;
    color: #ABA6A6;
} 

.add-btn:hover {
    background-color: #F2F2F2;
    cursor: pointer;
}

.expenses-table {
    padding: 0rem 1.875rem;
}
    
</style>
    