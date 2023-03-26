import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";

const routes = [
	{
		path: "/",
		name: "LoginPage",
		component: LoginPage,
	},
	{
		path: "/registration",
		name: "RegistrationPage",
		component: RegistrationPage,
	},
	{
		path: "/resetpassword",
		name: "ResetPasswordPage",
		component: ResetPasswordPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
