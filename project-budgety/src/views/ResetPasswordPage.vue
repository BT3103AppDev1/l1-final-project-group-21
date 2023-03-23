<template>
	<main>
		<ResetPasswordVue />
		<BudgetyCoverVue />
	</main>
</template>

<script>
import ResetPasswordVue from "../components/ResetPassword.vue";
import BudgetyCoverVue from "../components/BudgetyCover.vue";

export default {
	name: "App",
	components: {
		ResetPasswordVue,
		BudgetyCoverVue,
	},
};
</script>

<style scoped>
main {
	display: flex;
}
</style>
