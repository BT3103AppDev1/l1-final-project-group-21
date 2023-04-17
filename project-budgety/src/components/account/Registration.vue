<template>
	<div class="container">
		<div class="registration-details">
			<p id="heading">REGISTER</p>
			<div class="input-div">
				<input
					type="text"
					class="input-text"
					id="email"
					required=""
					placeholder="Email Address"
					v-model="email"
				/>
				<fa class="icons" icon="envelope" />
			</div>

			<div class="input-div">
				<input
					type="text"
					class="input-text"
					id="username"
					required=""
					placeholder="Username"
					v-model="username"
				/>
				<fa class="icons" icon="user" />
			</div>

			<div class="input-div">
				<input
					type="password"
					class="input-text"
					id="password"
					required=""
					placeholder="Password"
					v-model="password"
				/>
				<fa class="icons" icon="lock" />
			</div>

			<div class="input-div">
				<input
					type="password"
					class="input-text"
					id="repeatpassword"
					required=""
					placeholder="Repeat Password"
					v-model="repeatpassword"
				/>
				<fa class="icons" icon="lock" />
			</div>

			<button id="register-button" type="button" @click="register()">
				Register
			</button>

			<div style="display: flex; justify-content: center">
				<p id="no-account">Already have an account? &nbsp;</p>

				<router-link to="/">
					<p class="navigate-next">Login.</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
	name: "Registration",
	data() {
		return {
			email: "",
			username: "",
			password: "",
			repeatpassword: "",
		};
	},

	async mounted() {
		const auth = getAuth();
	},

	methods: {
		async register() {
			if (
				this.username == "" ||
				this.email == "" ||
				this.password == "" ||
				this.repeatpassword == ""
			) {
				alert("Please fill out all required fields.");
			} else if (this.password != this.repeatpassword) {
				alert("Please ensure that both passwords match.");
			} else if (this.password == this.repeatpassword) {
				try {
					createUserWithEmailAndPassword(getAuth(), email.value, password.value)
						.then(async (data) => {
							// add user's username under Firebase Authentication displayName
							await updateProfile(auth.currentUser, {
								displayName: username.value,
							});

							alert("Account successfully registered!");

							// create collection for new user in Firestore DB
							const docRef1 = await setDoc(
								doc(db, "users", String(email.value)),
								{}
							);

							// navigate user to the Dashboard (main page)
							this.$router.push({
								name: "Dashboard",
								params: { username: username.value },
							});
						})
						.catch((error) => {
							alert(error.code);
						});
				} catch (error) {
					console.error(error);
					alert(error);
				}
			}
		},
	},
};
</script>

<style scoped>
html,
body {
	overflow: hidden;
	margin: 0;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

.registration-details {
	width: 40%;
}

#heading {
	font-family: "Inter";
	font-size: 40px;
	font-weight: lighter;
	margin-bottom: 80px;
	color: #6c60f3;
	display: flex;
	justify-content: center;
}

.input-text {
	border-bottom-style: ridge;
	border-bottom-color: #aba6a6;
	color: var(--color-text);
}

input {
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
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

.input-div {
	margin-bottom: 20px;
	position: relative;
}

#register-button {
	color: white;
	padding: 10px;
	width: 100px;
	margin: auto;
	display: flex;
	justify-content: center;
	margin-top: 50px;
	margin-bottom: 50px;
	background: radial-gradient(
			144.64% 144.64% at 94.27% -44.64%,
			rgba(255, 255, 255, 0.3) 0%,
			rgba(255, 255, 255, 0) 100%
		),
		#6c60f3;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 40px;
}

#no-account {
	font-family: "Inter";
	font-size: 80%;
	color: #aba6a6;
}

.navigate-next {
	font-family: "Inter";
	font-size: 80%;
	color: #6c60f3;
}

.icons {
	color: #aba6a6;
	position: absolute;
	right: 10px;
	top: 15px;
}
</style>
