import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import AnalyticsPage from "@/views/AnalyticsPage.vue";
import BudgetPage from "@/views/BudgetPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const routes = [
	{
		path: "/",
		name: "Login",
		component: LoginPage,
	},
	{
		path: "/registration",
		name: "Registration",
		component: RegistrationPage,
	},
	{
		path: "/resetpassword",
		name: "ResetPassword",
		component: ResetPasswordPage,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: DashboardPage,
	},
	{
		path: "/analytics",
		name: "Analytics",
		component: AnalyticsPage,
	},
	// {
	// 	path: "/budget",
	// 	name: "Budget",
	// 	component: BudgetPage,
	// 	meta: { requiresAuth: true, },
	// },
	{
		path: "/profile",
		name: "Profile",
		component: ProfilePage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	let user = getAuth().currentUser;

	if (to.meta.requiresAuth && !user) {
		// page requires auth and user not logged in
		// send to login page
		next("");
	} else {
		// else proceed
		next();
	}
});

export default router;
