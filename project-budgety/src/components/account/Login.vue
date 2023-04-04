<template>
	<div class="container">
		<div class="login-details">
			<p id="heading">LOGIN</p>
			<div class="input-div">
				<input
					type="email"
					id="email"
					required=""
					placeholder="Email Address"
					v-model="email"
				/>
				<fa class="icons" icon="envelope" />
			</div>

			<div class="input-div">
				<input
					type="password"
					id="password"
					required=""
					placeholder="Password"
					v-model="password"
				/>
				<fa class="icons" icon="lock" />
			</div>

			<div style="display: flex; flex-direction: row" class="nav">
				<router-link to="/resetpassword">
					<p class="navigate-next">Forgot password?</p>
				</router-link>
			</div>

			<button id="login-button" type="button" @click="login">Login</button>

			<div style="display: flex; justify-content: center" class="nav">
				<p id="no-account">Don't have an account? &nbsp;</p>
				<router-link to="/registration" id="nav">
					<p class="navigate-next">Sign up.</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import {
	getAuth,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { authentication, db } from "../../firebase.js";

export default {
	name: "Login",
	data() {
		return {
			email: "",
			password: "",
			auth: "",
		};
	},

	async mounted() {
		const auth = getAuth();
	},

	methods: {
		login() {
			let errMsg = '';
			signInWithEmailAndPassword(getAuth(), email.value, password.value)
				.then((data) => {
					alert("Successfully signed in!");
					this.$router.push({ name: "Dashboard" });
				})
				.catch((error) => {
					switch (error.code) {
						case 'auth/invalid-email':
							errMsg = 'Invalid email'
							break
						case 'auth/user-not-found':
							errMsg = 'No account with that email was found'
							break
						case 'auth/wrong-password':
							errMsg = "Incorrect password"
							break
						default:
							errMsg = 'Email or password was incorrect'
							break
						}
						alert(errMsg);
				});
		}
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
	justify-content: left;
	align-items: center;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

.login-details {
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

input {
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;
	border-bottom-style: 1px ridge;
	border-bottom-color: #aba6a6;
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

/* input.text:focus,
input.text:focus {
	border-top-style: solid;
	border-right-style: solid;
	border-left-style: solid;
	border-color: #aba6a6;
	border-radius: 2px;
	border-width: 2px;
	outline: none;
} */

.input-div {
	/* display: flex;
	flex-direction: row;
	justify-content: center; */
	margin-bottom: 20px;
	position: relative;
}

#login-button {
	color: white;
	background-color: #6c60f3;
	border-radius: 20px;
	border-width: 1px;
	border-color: #aba6a6;
	padding: 10px;
	width: 100px;
	margin: auto;
	display: flex;
	justify-content: center;
	margin-top: 50px;
	margin-bottom: 50px;
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
	top: 10px;
}
</style>
