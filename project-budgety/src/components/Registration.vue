<template>
	<div class="container">
		<div class="registration-details">
			<p id="heading">REGISTER</p>
			<div class="input-div">
				<input type="text" id="email" required="" placeholder="Email Address" />
				<fa class="icons" icon="envelope" />
			</div>

			<div class="input-div">
				<input type="text" id="username" required="" placeholder="Username" />
				<fa class="icons" icon="user" />
			</div>

			<div class="input-div">
				<input type="text" id="password" required="" placeholder="Password" />
				<fa class="icons" icon="lock" />
			</div>

			<div class="input-div">
				<input
					type="text"
					id="repeatpassword"
					required=""
					placeholder="Repeat Password"
				/>
				<fa class="icons" icon="lock" />
			</div>

			<button id="register-button" type="button">Register</button>

			<div style="display: flex; justify-content: center">
				<p id="no-account">Already have an account?</p>
				<p class="navigate-next">&nbsp; Login.</p>
			</div>
		</div>
	</div>
</template>

<script></script>

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

#register-button {
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
