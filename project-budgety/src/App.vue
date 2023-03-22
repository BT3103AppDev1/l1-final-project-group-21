<script>
import LoginVue from "./components/Login.vue";
import BudgetyCoverVue from "./components/BudgetyCover.vue";

export default {
	name: "App",
	components: {
		LoginVue,
		BudgetyCoverVue,
	},
};
</script>

<template>
	<main>
		<LoginVue />
		<!-- add budgety cover component -->
		<BudgetyCoverVue />
	</main>
</template>

<style scoped>
main {
	display: flex;
}
</style>
