<template>
	<div class="sidebar">
		<div type="home" class="img">
			<img src="../../assets/budgety_logo_bgremoved.png" alt="Budgety Logo" />
		</div>

		<div class="sidebar-contents">
			<!-- <SidebarLink to="/"><fa icon="home" /> Login</SidebarLink> -->
			<SidebarLink to="/dashboard"><fa icon="home" /> Dashboard</SidebarLink>
			<SidebarLink to="/analytics"
				><fa icon="chart-line" /> Analytics</SidebarLink
			>
			<!-- <SidebarLink to="/budget"><fa icon="calculator" /> Budget</SidebarLink> -->
			<SidebarLink to="/profile"><fa icon="user" /> Profile</SidebarLink>
		</div>
	</div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import SidebarLink from "./SidebarLink.vue";

export default {
	components: { SidebarLink },
};
</script>

<style>
/* global css section for colour themeing */
:root {
	--sidebar-bg-color: #6c60f3;
	--sidebar-item-hover: rgb(127, 113, 255);
	--sidebar-item-active: #f2f2f2;
}
.img {
	display: grid;
	place-items: center;
	margin: 20px 0px;
}

.sidebar {
	color: #ffffff;
	background-color: var(--sidebar-bg-color);
	border-radius: 0px 25px 25px 0px;
	width: 200px;

	/* float: left; */
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	bottom: 0;
	padding: 0.5em;
	display: flex;
	flex-direction: column;
}

.link {
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
	font-weight: 400;
	margin: 10px 0;
	border-radius: 5px;
	height: 55px;
	text-decoration: none;
}
</style>
