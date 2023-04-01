<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: false }
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive }
  }
}
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="icon" :class="icon" />
      <span>
        <slot />
      </span>
  </router-link>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  color: #FFFFFF;
  margin: 10px 0;
  /* padding: 5px; */
  border-radius: 50px;
  height: 55px;
  
  /* text-decoration: none; */
}
.link:hover {
  background-color: var(--sidebar-item-hover);
}
.link.active {
  background-color: var(--sidebar-item-active);
  color: var(--sidebar-bg-color);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>