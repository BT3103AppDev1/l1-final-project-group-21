<script>
import LoginVue from "./components/Login.vue";
import BudgetyCoverVue from "./components/BudgetyCover.vue";
import RegistrationVue from "./components/Registration.vue";
import ResetPasswordVue from "./components/ResetPassword.vue";

export default {
	name: "App",
	components: {
		LoginVue,
		BudgetyCoverVue,
		RegistrationVue,
		ResetPasswordVue,
	},
};
</script>

<template>
	<main>
		<!-- <LoginVue /> -->
		<!-- <RegistrationVue /> -->
		<ResetPasswordVue />
		<BudgetyCoverVue />
	</main>
</template>

<style scoped>
main {
	display: flex;
}
</style>
