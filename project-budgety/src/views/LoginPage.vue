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

	mounted() {
		const initUserTheme = this.getTheme() || this.getMediaPreference();
		this.setTheme(initUserTheme);
	},

	methods: {
      getTheme() {
        return localStorage.getItem("user-theme");
      },
  
      setTheme(theme) {
        localStorage.setItem("user-theme", theme);
        this.userTheme = theme;
        document.documentElement.className = theme;
      },
  
      getMediaPreference() {
        const hasDarkPreference = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (hasDarkPreference) {
          return "dark-theme";
        } else {
          return "light-theme";
        }
      },
	}
};
</script>

<style scoped>
main {
	display: flex;
}
</style>
