<template>
	<div id="nav">
		<router-view />
	</div>
</template>

<script>
// import Sidebar from '@/components/sidebar/Sidebar.vue'

export default {
	name: "App",
	// components: {
	//   Sidebar
	// }
};
</script>

<style scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 30px;
}
#nav {
	/* set position where each page content starts from 
  for login - no need padding top but other pages need it so currently in individual pages*/
	/* padding-top: 50px; */
	/* margin-left: 230px; */
}

/* #nav a {
  font-weight: bold;
  color: #FFFFFF;
}
#nav a.router-link-exact-active {
  color: #6C60F3;
} */
</style>
