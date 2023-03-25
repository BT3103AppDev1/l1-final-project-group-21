<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <span v-if="collapsed">
        
      </span>
      <span v-else>
        <img src="../../assets/Budgety Logo.png" alt="Budgety Logo">
    </span>
    <div class="sidebar-contents">
        <!-- <SidebarLink to="/"><fa icon="home" /> Login</SidebarLink> -->
        <SidebarLink to="/dashboard"><fa icon="home" /> Dashboard</SidebarLink>
        <SidebarLink to="/analytics"><fa icon="chart-line" /> Analytics</SidebarLink>
        <SidebarLink to="/budget"><fa icon="calculator" /> Budget</SidebarLink>
        <SidebarLink to="/profile"><fa icon="user" /> Profile</SidebarLink>
    </div>
    
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
/* global css section for colour themeing */
:root {
    --sidebar-bg-color: #6C60F3;
    --sidebar-item-hover: rgb(154, 146, 244);
    --sidebar-item-active: #F2F2F2;

}
img {
    margin-top: 20px;
}

.sidebar {
    /* color: #FFFFFF; */
    background-color: var(--sidebar-bg-color);
    border-radius: 0px 25px 0px 0px;


    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
}

.sidebar-contents {
    color: #FFFFFF;
}

/* sidebar h1 {
  height: 2.5em;
  color: #FFFFFF;
} */
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

</style>