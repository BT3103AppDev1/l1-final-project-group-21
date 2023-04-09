<template>

	<div class="container1">
		<div class="budget">
			<h2 style="font-weight: bold">Budget</h2>
			<h4>Here's an overview of your monthly budget:</h4>
		</div>
		
		<div class="update-btn">
			<fa icon="pencil" /> Update Budget
		</div> 

		<div class="new-btn">
			<fa icon="add" /> Set New Budget
		</div>
		 
	</div>

	<div class="container2">
		<div class="overall">
			<div class="overall_words">
				<h4 style="font-family: Verdana; line-height: 0">MAR 2023</h4>
				<h1 style="font-family: Verdana; font-weight: bold; font-size:2em">27/31</h1>
				<br>
				<h4 style="font-family: Verdana; line-height: 0">SPENT THIS MONTH:</h4>
				<h1 style="font-family: Verdana; font-weight: bold; font-size:3em; line-height: 1.4">$314.00</h1>
			</div>
			
			<div class="donut"><div class="hole">
				<div class="percentage">
					<h2 style="font-weight: bold; font-size:2em">19.49%</h2>
				</div>
			</div></div>
		</div>

		<div class="money">
			<div class="money_words">
				<h3 style="font-family: Verdana; line-height: 0">BUDGET SET:</h3>
				<h1 style="font-family: Verdana; font-weight: bold; font-size:3.5em; color:#6C60F3">$390.00</h1>
				<br>
				<h3 style="font-family: Verdana; line-height: 0">BUDGET LEFT:</h3>
				<h1 style="font-family: Verdana; font-weight: bold; font-size:3.5em; color:#6C60F3">$76.00</h1>
			</div>
		</div>
	</div>

	<div class="container3">
		<div class="food">
			<div class="cat_top"> 
				<img style="margin:0.1em" class="category-icon" src="../assets/icons/Food.png" /> 
				<h1 style="margin:0.1em; font-weight: bold; color: #4F94BC; left:0.3em">Food</h1> 
				<div class="x-btn"><fa icon="xmark" /></div>
			</div>

			<div class="budget_set">
				<h3 style="font-weight: bold">Budget Set:</h3>
				<h3 style="font-weight: bold; left:0.5em">$200.00</h3>
			</div>

			<div class="percent_spent">
				<h4 style="font-weight: bold; line-height:0em; color:#36C629">78% SPENT</h4>
			</div>

			<div class="money_left">
				<h1 style="font-weight: bold; color: #4F94BC; font-size:3em">$42.00</h1> 
			</div>

			<div>
				<h4 style="font-weight: bold; line-height:0em; color: #4F94BC">left this month</h4>
			</div>

			<br>
			<div class="progress_bar"><div class="food_progress"></div></div>
		</div>

		<div class="fashion">
			<div class="cat_top">
				<img class="category-icon" src="../assets/icons/Fashion.png" />
				<h1 style="margin:0.1em; font-weight: bold; color: #856DC8; left:0.3em">Fashion</h1>
				<div class="x-btn"><fa icon="xmark" /></div>
			</div>

			<div class="budget_set">
				<h3 style="font-weight: bold">Budget Set:</h3>
				<h3 style="font-weight: bold; left:0.5em">$80.00</h3>
			</div>

			<div class="percent_spent">
				<h4 style="font-weight: bold; line-height:0em; color:#36C629">55% SPENT</h4>
			</div>

			<div class="money_left">
				<h1 style="font-weight: bold; color: #856DC8; font-size:3em">$36.00</h1> 
			</div>

			<div>
				<h4 style="font-weight: bold; line-height:0em; color: #856DC8">left this month</h4>
			</div>

			<br>
			<div class="progress_bar"><div class="fashion_progress"></div></div>
		</div>

		<div class="entertainment">
			<div class="cat_top">
				<img class="category-icon" src="../assets/icons/Entertainment.png" />
				<h1 style="margin:0.1em; font-weight: bold; color: #EB8AD0; left:0.3em">Entertainment</h1>
				<div class="x-btn"><fa icon="xmark" /></div>
			</div>

			<div class="budget_set">
				<h3 style="font-weight: bold">Budget Set:</h3>
				<h3 style="font-weight: bold; left:0.5em">$80.00</h3>
			</div>

			<div class="percent_spent">
				<h4 style="font-weight: bold; line-height:0em; color:#BE0D0D">120% SPENT</h4>
			</div>

			<div class="money_left">
				<h1 style="font-weight: bold; color: #EB8AD0; font-size:3em">-$12.00</h1> 
			</div>

			<div>
				<h4 style="font-weight: bold; line-height:0em; color: #EB8AD0">left this month</h4>
			</div>

			<br>
			<div class="progress_bar"><div class="entertainment_progress"></div></div>
		</div>

		<div class="transportation">
			<div class="cat_top">
				<img class="category-icon" src="../assets/icons/Transportation.png" />
				<h1 style="margin:0.1em; font-weight: bold; color: #CC8A4A; left:0.3em">Transportation</h1>
				<div class="x-btn"><fa icon="xmark" /></div>
			</div>

			<div class="budget_set">
				<h3 style="font-weight: bold">Budget Set:</h3>
				<h3 style="font-weight: bold; left:0.5em">$80.00</h3>
			</div>

			<div class="percent_spent">
				<h4 style="font-weight: bold; line-height:0em; color:#36C629">55% SPENT</h4>
			</div>

			<div class="money_left">
				<h1 style="font-weight: bold; color: #CC8A4A; font-size:3em">$36.00</h1> 
			</div>

			<div>
				<h4 style="font-weight: bold; line-height:0em; color: #CC8A4A">left this month</h4>
			</div>

			<br>
			<div class="progress_bar"><div class="transportation_progress"></div></div>
		</div>

		<div class="healthcare">
			<div class="cat_top">
				<img class="category-icon" src="../assets/icons/Healthcare.png" />
				<h1 style="margin:0.1em; font-weight: bold; color: #539F37; left:0.3em">Healthcare</h1>
				<div class="x-btn"><fa icon="xmark" /></div>
			</div>

			<div class="budget_set">
				<h3 style="font-weight: bold">Budget Set:</h3>
				<h3 style="font-weight: bold; left:0.5em">$80.00</h3>
			</div>

			<div class="percent_spent">
				<h4 style="font-weight: bold; line-height:0em; color:#36C629">55% SPENT</h4>
			</div>

			<div class="money_left">
				<h1 style="font-weight: bold; color: #539F37; font-size:3em">-$12.00</h1> 
			</div>

			<div>
				<h4 style="font-weight: bold; line-height:0em; color: #539F37">left this month</h4>
			</div>

			<br>
			<div class="progress_bar"><div class="healthcare_progress"></div></div>
		</div>

	</div>


	<Sidebar/>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';

export default {
	name: "Budget",
	
	components: {
		Sidebar,
	}

};
</script>

<style>

.x-btn {
	vertical-align: center;
	margin: 0.5em;
	text-align: center;
	padding: 0em;
}

.x-btn:hover {
	background-color: #F2F2F2;
	cursor: grab;
}

.healthcare_progress {
	color: black;
    height: 2.4em;
    width: 55%;
    border: solid 1px #BEF0AC;
    background: #BEF0AC;
    border-radius: 10px;
}

.transportation_progress {
	color: black;
    height: 2.4em;
    width: 55%;
    border: solid 1px #FFDBB9;
    background: #FFDBB9;
    border-radius: 10px;
}

.entertainment_progress {
	color: black;
    height: 2.4em;
    width: 0%;
    border: solid 1px #FFD7F4;
    background: #FFD7F4;
    border-radius: 10px;
}

.fashion_progress {
	color: black;
    height: 2.4em;
    width: 45%;
    border: solid 1px #D4C5FF;
    background: #D4C5FF;
    border-radius: 10px;
}

.food_progress {
	color: black;
    height: 2.4em;
    width: 22%;
    border: solid 1px #CFEDFE;
    background: #CFEDFE;
    border-radius: 10px;
}

.progress_bar {
	color: black;
    height: 2.5em;
    width: 100%;
    border: solid 1px lightgray;
    background: white;
    border-radius: 10px;
	justify-content: left;
	box-shadow: rgba(0, 0, 0, 0.352) 0px 5px 3px;
}

.percent_spent {
	font-weight: bold;
}

.budget_set {
	color: #6C60F3;
	line-height: 3em;
	display: flex;
}

.cat_top {
  	display: grid;
    grid-template-columns: 0% 55% 0%;
    grid-gap: 4em;
}

.category-icon {
  width: 4em;
}

.food, .fashion, .entertainment, .transportation, .healthcare {
	color: black;
    height: 20em;
    width: 90%;
    padding: 2em;
    border: solid 1px black;
    background: white;
    border-radius: 10px;
    text-align: left;
}

.container3 {
	margin: 0em 0em 2em 2em;
	display: grid;
    grid-template-columns: 32.5% 32.5% 32.5%;
    grid-row-gap: 2em;
}

.money {
	color: black;
    height: 20em;
    width: 100%;
    padding: 2em;
    border: solid 1px black;
    background: white;
    border-radius: 10px;
    text-align: center;
}

.money_words {
	margin: 0.5	em 0em 0em 3.2em;
	top: 50%;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
	text-align: center ;
}

.percentage {
	margin: 0em 0em 0em 1em;
	position: absolute;
	top: 50%;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
}

.overall_words {
	padding: 3.8em 0em 0em 7em;
	text-align: left;
}

.container2 {
	margin: 0em 0em 2em 2em;
	display: grid;
    grid-template-columns: 60% 31%;
    grid-gap: 3em;
}

.donut {
	margin: 1em;
    width: 14em;
    height: 14em;
    border-radius: 50%;
    background: conic-gradient(
        #FFDBB9,	
        #A383FF
    );
	display: flex;
    align-items: center;
    justify-content: center;
}

.hole {
    width: 9em; 
    height: 9em;
    border-radius: 50%;
    background: #ffffff;
}

.overall {
	color: black;
    height: 20em;
    width: 100%;
    padding: 2em;
    border: solid 1px black;
    background: white;
    border-radius: 10px;
    text-align: center;
	display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 20px;
}

.container1 {
	display: grid;
    grid-template-columns: 60% 15% 10%;
    grid-gap: 20px;
	padding: 2em 0em 0em 2em;
}

.update-btn, .new-btn {
	align-items: center;
	background-color: var(--color-card);
	border: 0.5px solid --color-btn-border;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	width: 15em; 
	height: 3.5em;
	padding: 5px 10px 5px 10px;
	margin-right: 35px;
	font-weight: 500;
	font-size: 12px;
	color: #ABA6A6;
	border-radius: 10px;
	float: left;
	padding: 10px;
	margin: 2em;
	text-align: center;
}

.update-btn:hover {
	background-color: #F2F2F2;
	cursor: pointer;
}

.new-btn:hover {
	background-color: #F2F2F2;
	cursor: pointer;
}

</style>
