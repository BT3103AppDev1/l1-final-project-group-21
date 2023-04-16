<template>
	<div id="profile-page">
		<div class="header">
			<div class="profile-header">Profile</div>
		</div>

		<div class="container">
			<div class="night-mode">
				<div class="font-18">Night Mode</div>
				<div class="toggle-btn">
					<ThemeButton />
					<!-- change to toggle-on when night mode is on -->
				</div>
			</div>
			<div class="font-18">Update Username</div>

			<form ref="myform" id="myform">
				<div class="formli">
					<label for="coin1">Enter new username:</label>
					<br />
					<input
						type="text"
						class="input-text"
						id="username1"
						required=""
						placeholder="New Username"
					/>
					<div class="update">
						<button id="purpleButton" type="button" v-on:click="updateUsername">
							Update
						</button>
					</div>
				</div>
			</form>
			<div class="section">
				<button id="purpleButton" type="button" v-on:click="logoutAccount">
					Logout
				</button>

				<button id="redButton" type="button" v-on:click="deleteAccount">
					Delete Account
				</button>
			</div>
		</div>
	</div>
	<Sidebar />
</template>

<script>
import {
	getAuth,
	updateProfile,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebaseApp from "@/firebase.js";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import ThemeButton from "@/components/ThemeButton.vue";

const db = getFirestore(firebaseApp);

export default {
	name: "Profile",

	components: {
		Sidebar,
		ThemeButton,
	},

	mounted() {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				this.$router.push({ name: "Login" });
			}
		});
	},

	data() {
		return {
			userTheme: "light-theme",
		};
	},

	methods: {
		async updateUsername() {
			let newUser = document.getElementById("username1").value;
			if (newUser) {
				const user = getAuth().currentUser;
				updateProfile(user, { displayName: newUser })
					.then(() => {
						alert("Your new username is now: " + user.displayName);
						this.$refs.myform.reset();
					})
					.catch((error) => {
						console.log(error.code);
						alert(error.message);
					});
			} else {
				alert("Please input something.");
			}
		},

		async logoutAccount() {
			const auth = getAuth();
			const user = auth.currentUser;
			await signOut(auth, user);
			alert("Successfully logged out.");
			this.$router.push({ name: "Login" });
		},

		async deleteAccount() {
			let toDelete = confirm(
				"Are you sure you want to delete your account? This action is irreversible!"
			);
			if (toDelete) {
				const user = getAuth().currentUser;
				await deleteDoc(doc(db, "user", user.email));
				await user.delete();
				this.$router.push({ name: "Login" });
			}
		},

		setTheme(theme) {
			localStorage.setItem("user-theme", theme);
			this.userTheme = theme;
			document.documentElement.className = theme;
		},

		toggleTheme() {
			const activeTheme = localStorage.getItem("user-theme");
			if (activeTheme === "light-theme") {
				this.setTheme("dark-theme");
			} else {
				this.setTheme("light_theme");
			}
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

		getTheme() {
			return localStorage.getItem("user-theme");
		},
	},
};
</script>

<style scoped>
#profile-page {
	margin: 0 2rem;
}
.profile-header {
	font-size: 24px;
	font-weight: 500;
	padding-top: 50px;
	text-align: left;
}

#purpleButton {
	flex: 1;
	color: #ffffff;
	background-color: var(--sidebar-bg-color);
	max-width: fit-content;
	padding: 12px 48px;
	border: none;
	text-align: center;
	text-decoration: none;
	font-size: 18px;
	font-weight: bold;
	border-radius: 12px; /* creates the curve */
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

#redButton {
	flex: 1;
	color: #ffffff;
	background-color: darkred;
	max-width: fit-content;
	padding: 12px;
	border: none;
	text-align: center;
	text-decoration: none;
	font-size: 18px;
	font-weight: bold;
	border-radius: 12px; /* creates the curve */
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

.night-mode {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.toggle-btn {
	font-size: 35px;
	margin-right: 2rem;
}

.container {
	/* encapsulate into a box */
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	padding: 1rem;
	margin: 1.875rem 1.875rem 1.5rem 0rem;
}

#myform {
	margin-left: 20px;
}

.input-text {
	border-style: ridge;
	border-color: #aba6a6;
	border-radius: 5px;
	min-width: 11rem;
	max-width: 15%;
	margin: 10px 0;
	margin-bottom: 20px;
	color: var(--color-text);
}

input {
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;
	border-bottom-style: 1px ridge;
	border-bottom-color: #aba6a6;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
	margin-bottom: 20px;
}

input:hover {
	border-top-style: solid;
	border-right-style: solid;
	border-left-style: solid;
	border-color: #aba6a6;
	box-shadow: 2px 2px #ee82ee;
	border-radius: 2px;
	border-width: 2px;
}

.font-18 {
	font-size: 18px;
	font-weight: 500;
	padding: 20px;
	font-weight: 600;
}

.section {
	margin: 30px 20px;
	margin-top: 200px;
	display: flex;
	justify-content: space-between;
}

.logout {
	flex: 1;
}

.delete {
	flex: 1;
}

.switch-label {
	/* for width, use the standard element-size */
	width: var(--element-size);

	/* for other dimensions, calculate values based on it */
	border-radius: var(--element-size);
	border: calc(var(--element-size) * 0.025) solid var(--accent-color);
	padding: calc(var(--element-size) * 0.1);
	font-size: calc(var(--element-size) * 0.3);
	height: calc(var(--element-size) * 0.35);

	align-items: center;
	background: var(--text-primary-color);
	cursor: pointer;
	display: flex;
	position: relative;
	transition: background 0.5s ease;
	justify-content: space-between;
	z-index: 1;
}
.switch-toggle {
	position: absolute;
	background-color: var(--background-color-primary);
	border-radius: 50%;
	top: calc(var(--element-size) * 0.07);
	left: calc(var(--element-size) * 0.07);
	height: calc(var(--element-size) * 0.4);
	width: calc(var(--element-size) * 0.4);
	transform: translateX(0);
	transition: transform 0.3s ease, background-color 0.5s ease;
}
.switch-toggle-checked {
	transform: translateX(calc(var(--element-size) * 0.6)) !important;
}

:root {
	--background-color-primary: #ebebeb;
	--background-color-secondary: #fafafa;
	--accent-color: #cacaca;
	--text-primary-color: #222;
	--element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
	--background-color-primary: #1e1e1e;
	--background-color-secondary: #2d2d30;
	--accent-color: #3f3f3f;
	--text-primary-color: #ddd;
}
</style>
