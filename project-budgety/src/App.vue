<script>
import LoginVue from "./components/Login.vue";
import BudgetyCoverVue from "./components/BudgetyCover.vue";
import RegistrationVue from "./components/Registration.vue";

export default {
	name: "App",
	components: {
		LoginVue,
		BudgetyCoverVue,
		RegistrationVue,
	},
};
</script>

<template>
	<main>
		<!-- <LoginVue /> -->
		<RegistrationVue />
		<BudgetyCoverVue />
	</main>
</template>

<style scoped>
main {
	display: flex;
}
</style>
