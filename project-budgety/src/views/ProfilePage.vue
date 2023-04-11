<template>
	<div id="profile-page">
		<div class="header">
			<div class="profile-header">Profile</div>
		</div>

		<div class="container">
			<div class="night-mode">
				<div class="font-18">Night Mode</div>
				<div class="toggle-btn">
					<fa icon="toggle-off"/>
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
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { useRoute } from "vue-router";
import { onBeforeUnmount } from "vue";
import { getFirestore } from "firebase/firestore";
import Sidebar from "@/components/sidebar/Sidebar.vue";

// const db = getFirestore(firebaseApp);

export default {
	name: "Profile",

	components: {
		Sidebar,
	},

	mounted() {
		console.log("Profile Page Mounted");
	},

	methods: {
		async updateUsername() {
			console.log("Updating username");
			let newUser = document.getElementById("username1").value;
			if (newUser) {
				const user = getAuth().currentUser;
				updateProfile(user, { displayName: newUser })
					.then(() => {
						alert("Your new username is now: " + user.displayName);
						console.log(user.displayName);
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
			await signOut(auth, user)
			alert("Successfully logged out.");
			this.$router.push({ name: "Login" });
		},

		async deleteAccount() {
			let toDelete = confirm("Are you sure you want to delete your account? This action is irreversible!");
			if (toDelete) {
				const user = getAuth().currentUser;
				// await deleteDoc(doc(db, user.email)) // havent set up db
				await user.delete();
				this.$router.push({ name: "Login" });
			}
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
	margin-right: 2rem
}

.container {
	/* encapsulate into a box */
	background: var(--color-card);
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	padding: 1rem;
	height: 100vh; /* keeps the container at 100 viewport height */
	margin: 1.875rem 1.875rem 0rem 0rem;
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
	margin-top: 200px; /* brute force */
	display: flex;
	justify-content: space-between;

}

.logout {
	flex: 1;
}

.delete {
	flex: 1;
}
</style>
