<template>
	<main>
		<LoginVue />
		<BudgetyCoverVue />
	</main>
</template>

<script>
import LoginVue from "../components/account/Login.vue";
import BudgetyCoverVue from "../components/account/BudgetyCover.vue";

export default {
	name: "App",
	components: {
		LoginVue,
		BudgetyCoverVue,
	},
};
</script>

<style scoped>
main {
	display: flex;
}
</style>
