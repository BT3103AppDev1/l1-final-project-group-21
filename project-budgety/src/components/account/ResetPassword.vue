<template>
	<div class="container">
		<div class="reset-details">
			<p id="heading">RESET PASSWORD</p>
			<div class="input-div">
				<input
					type="email"
					class="input-text"
					id="email"
					required=""
					placeholder="Email Address"
					v-model="email"
				/>
				<fa class="icons" icon="envelope" />
			</div>

			<button id="reset-button" type="button" @click="sendresetemail()">
				Reset
			</button>

			<div style="display: flex; justify-content: center">
				<router-link to="/">
					<p class="navigate-next">Back to Login.</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
	name: "ResetPassword",
	data() {
		return {
			email: "",
		};
	},
	methods: {
		sendresetemail() {
			const auth = getAuth();
			if (this.email == "") {
				alert("Please enter your email.");
			} else {
				sendPasswordResetEmail(auth, email.value)
					.then(() => {
						alert("Email to reset your password has been sent!");
						this.$router.push({ name: "Login" });
					})
					.catch((error) => {
						console.log(error.code);
						alert(error.message);
					});
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

.reset-details {
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
	text-align: center;
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

#reset-button {
	color: white;
	padding: 10px;
	width: 100px;
	margin: auto;
	display: flex;
	justify-content: center;
	margin-top: 50px;
	margin-bottom: 50px;
	background: radial-gradient(144.64% 144.64% at 94.27% -44.64%,
	 rgba(255, 255, 255, 0.3) 0%,
	 rgba(255, 255, 255, 0) 100%), 
	 #6C60F3;
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
