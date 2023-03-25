<template>
  <div id="nav">
    <Sidebar/>
    <!-- <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="/analytics">Analytics</router-link> |
    <router-link to="/budget">Budget</router-link> |
    <router-link to="/profile">Profile</router-link> | -->
    <router-view/>
  </div>

  
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
// import { sidebarWidth } from '@/components/sidebar/state.js'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#nav {
  /* set position where each page content starts from */
  padding-top: 50px;
  padding-left: 200px ;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #6C60F3;
  /* #42b983; */
}

</style>