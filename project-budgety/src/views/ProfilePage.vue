<!-- Add Profile Code here -->
<template>
	<body>	
		<div class="header">
			<div class="profile-header">Profile</div>
		</div>
			
		<div class="container">
			<form ref="myform" id="myform">
				<div class="font-18" style="font-weight:bold;">Update Username</div>					
				<div class="formli">
					<label for="coin1">Enter new username:</label>
					<br>
					<input
					type="text"
					id="username1"
					required=""
					placeholder="new username"
					/> 
					<div class="update">
						<button id="purpleButton" type="button" v-on:click="updateUsername">
							Update
						</button>
					</div>
				</div>
			</form>
			<div class="section">	
				<div class="logout">
					<button id="purpleButton" type="button" v-on:click="logoutAccount">
						Logout
					</button>
				</div>
				<div class="delete">
					<button id="redButton" type="button" v-on:click="deleteAccount">
						Delete Account
					</button>
				</div>	
			</div>
		</div>
	</body>
	<!-- <router-view/> -->
	<Sidebar/>
</template>

<script>
import { getAuth, updateProfile } from "firebase/auth";
import { useRoute } from 'vue-router';
import { onBeforeUnmount } from 'vue';
import { getFirestore } from "firebase/firestore";
import Sidebar from '@/components/sidebar/Sidebar.vue';

// const db = getFirestore(firebaseApp);

export default {
	name: "Profile",

	components: {
		Sidebar,
	},


	// data() {
	// 	return {
	// 		auth: "",
	// 		router: ""
	// 	}
	// },

	mounted() {
		console.log("Profile Page Mounted");
		// const auth = getAuth();
		// console.log(auth.currentUser.email);
		// if (!auth) { // not logged in
		// 	alert("You are not logged in, redirecting you to login page");
		// 	this.$router.push({ name: "Login" });
		// }
		// onBeforeUnmount(() => {
		// 	// clear up listener
		// 	authListener();
		// })
	},

	methods: {
		async updateUsername() {
			console.log("Updating username");
			let newUser = document.getElementById("username1").value;
			if (newUser) {
				const user = getAuth().currentUser;
				updateProfile(user, { displayName: newUser }).
				then(() => {
					alert("Your new username is now: " + user.displayName);
					console.log(user.displayName);
					this.$refs.myform.reset();
				}).
				catch((error) => {
					console.log(error.code);
					alert(error.message);
				})
			} else {
				alert("Please input something into the text box");
			}
		},
		
		async logoutAccount() {
			getAuth().signOut();
			alert("Successfully logged out.");
			this.$router.push({ name: "Login" });
		},
		
		async deleteAccount() {
			let toDelete = confirm("Are you sure you want to delete your account?");
			if (toDelete) {
				const user = getAuth().currentUser;
				// await deleteDoc(doc(db, user.email)) // havent set up db
				await user.delete()
				this.$router.push({ name: "Login" });
			}
		},
	},
};
</script>

<style scoped>
body {
	/* remove the centering from main.css */
	place-items: unset !important;
	display: flex;
	flex-direction: column;
}

.profile-header {
	font-size: 40px;
	font-weight: 500;
	padding-top: 50px;
	text-align: left;
}

#purpleButton {
	color: #FFFFFF;
	background-color: var(--sidebar-bg-color);
	padding: 12px;
	border: none;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 18px;
	font-weight: bold;
	/* margin: 4px 20px; */
	border-radius: 12px; /* creates the curve */
	width: 150px; /* how long it is */
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

#redButton {
	color: #FFFFFF;
	background-color: darkred;
	padding: 12px;
	border: none;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 18px;
	font-weight: bold;
	/* margin: 4px 20px; */
	border-radius: 12px; /* creates the curve */
	width: 200px; /* how long it is */
	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
}

.container {
	/* encapsulate into a box */
	background: var(--color-card);
  	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	padding: 0px 10px 10px 10px;
	height: 100vh;	/* keeps the container at 100 viewport height */
	margin-right: 30px;
}

#myform {
	margin: 30px;
}

/* input {
	margin: 0px 0px 20px 0px;
	width:220px; 
	border: 2px solid;
	border-radius: 3px;
	outline: 1px 1px 1px 1px var(--sidebar-bg-color);
}

input:hover {
	outline: 1px 1px 1px 1px var(--sidebar-bg-color);
	border-radius: 2px;
} */

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
  margin: 0px 0px 10px 0px;
  padding: 5px 0px;
  text-decoration: underline;
}

.section {
	margin: 30px;
	margin-top: 200px; /* brute force */
	/* position: absolute;
	bottom: 30px; */
}

.logout {
	display: inline;
	margin-right: 30px;
}

.delete {
	display: inline;
	/* margin: 0px; */
	position: absolute;
	right: 0;
	/* bottom: 0; */
}

</style>
