<template>
   <div>
    <template v-if="route.path.startsWith('/user')">
        <router-view />
    </template>
    <template v-else>
        <BasicLayoutVue />
    </template>
   </div>
</template>

<script setup>

import BasicLayoutVue from "./BasicLayouts/BasicLayout.vue";
import user from "./store/user";
import { useRoute } from "vue-router";
const route = useRoute();

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
