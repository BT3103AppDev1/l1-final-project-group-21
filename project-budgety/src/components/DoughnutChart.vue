<template>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>
  
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
  
ChartJS.register(ArcElement, Tooltip, Legend)
  
export default {
    name: "DoughnutChart",
    components: { Doughnut },
    data() {
		return {
			chartData: {
				labels: [
					"Fashion",
                    "Food",
                    "Groceries",
                    "Transportation",
                    "Healthcare"
				],
				datasets: [
					{
						label: "Data One",
						backgroundColor: [
                            '#D4C5FF',
                            '#CFEDFE',
                            '#FFECC0',
                            '#FFDBB9',
                            '#BEF0AC'
                        ],
						data: [40, 25, 20, 10, 5],
						
					},
				],
			},
			chartOptions: {
				plugins: {
					// remove the legend on top
					legend: {
						display: false,
						// position: 'right'
					}
				},
				elements: {
					
				},
				responsive: true,
				// aspectRatio: 2,
				// maintainAspectRatio: true
				
			}
		};
	},
}
</script>
  