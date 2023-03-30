<!-- Add Profile Code here -->
<template>
	<body>	
		<div class="header">
			<div class="profile-header">Profile</div>
		</div>
			
		<div class="container">
			<form id="myform">
				<div class="font-18" style="font-weight:bold;">Update Username</div>					
				<div class="formli">
					<label for="coin1">Enter new username:</label>
					<br>
					<input
					type="text"
					id="username1"
					required=""
					placeholder="new username"
					style="width:220px;"
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
</template>

<script>
export default {
	name: "Profile",

	mounted() {
		console.log("Profile Page Mounted")
	},

	methods: {
		async updateUsername() {

		},
		
		async logoutAccount() {

		},
		
		async deleteAccount() {

		},
	},
};
</script>

<style>
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
	background: #ffffff;
  	box-shadow: 0px 3.68519px 3.68519px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	padding: 0px 10px 10px 10px;
	height: 100vh;	/* keeps the container at 100 viewport height */
}

#myform {
	margin: 30px;
}
input {
	margin: 0px 0px 20px 0px;
}
.font-18 {
  font-size: 18px;
  font-weight: 500;
  margin: 0px 0px 10px 0px;
  /* padding: 5px 0px; */
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
