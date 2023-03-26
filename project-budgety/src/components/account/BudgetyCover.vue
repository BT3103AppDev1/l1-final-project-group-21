<template>
	<div id="grad">
		<img src="../../assets/budgety_logo.png" alt="" />
	</div>
</template>

<script></script>

<style scoped>
#grad {
	background-image: linear-gradient(
		to top right,
		#8aaafd,
		#ab8cdd,
		#d590db,
		#af9aec
	);
	height: 100vh;
	width: 100%;
	display: flex;
	align-content: center;
}

img {
	margin: auto;
	height: 60%;
	width: 60%;
	object-fit: contain;
}
</style>
