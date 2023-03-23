<script>
import LoginPageVue from "./views/LoginPage.vue";
import RegistrationPageVue from "./views/RegistrationPage.vue";
import ResetPasswordPageVue from "./views/ResetPasswordPage.vue";

export default {
	name: "App",
	components: {
		LoginPageVue,
		RegistrationPageVue,
		ResetPasswordPageVue,
	},
};
</script>

<template>
	<ResetPasswordPageVue />
</template>
