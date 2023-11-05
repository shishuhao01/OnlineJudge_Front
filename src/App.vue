<template>
  <div>
    <template v-if="route.path.includes('/login')">
      <router-view />
    </template>
    <template v-else-if="route.path.includes('/register')">
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
</style>
