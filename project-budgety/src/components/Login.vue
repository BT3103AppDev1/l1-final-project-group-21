<template>
	<div class="container">
		<div class="login-details">
			<p id="heading">LOGIN</p>
			<div id="email-div">
				<input type="text" id="email" required="" placeholder="Email Address" />
				<fa
					icon="envelope"
					color="#ABA6A6"
					style="position: absolute; right: 10px; top: 10px"
				/>
			</div>

			<div id="password-div">
				<input type="text" id="password" required="" placeholder="Password" />
				<fa
					icon="lock"
					color="#ABA6A6"
					style="position: absolute; right: 10px; top: 10px"
				/>
			</div>

			<div style="display: flex; flex-direction: row">
				<b class="navigate-next">Forgot password?</b>
				<!-- HANDLE ON CLICK EVENT -->
			</div>

			<button id="login-button" type="button">Login</button>

			<div style="display: flex; justify-content: center">
				<b id="no-account">Don't have an account?</b>
				<b class="navigate-next"> &nbsp; Sign up.</b>
			</div>
		</div>
	</div>
</template>

<script></script>

<style scoped>
html,
body {
	width: 97vh;
	height: 97vh;
	overflow: hidden;
	margin: 0;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	height: 95vh;
	width: 100vw;
	background-color: yellow;
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

#email,
#password {
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;
	border-bottom-style: 1px ridge;
	border-bottom-color: #aba6a6;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
}

#email:hover,
#password:hover {
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

#email-div,
#password-div {
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
</style>
