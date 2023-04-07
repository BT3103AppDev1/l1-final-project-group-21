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
	position: absolute;
	top: 50%;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
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
	margin: 0em 0em 0em 2em;
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
