<template>
	<main>
		<RegistrationVue />
		<BudgetyCoverVue />
	</main>
</template>

<script>
import RegistrationVue from "../components/Registration.vue";
import BudgetyCoverVue from "../components/BudgetyCover.vue";

export default {
	name: "App",
	components: {
		RegistrationVue,
		BudgetyCoverVue,
	},
};
</script>

<style scoped>
main {
	display: flex;
}
</style>
