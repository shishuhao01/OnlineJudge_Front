<template>
  <div>
    <template v-if="route.path.startsWith('/user/login')">
      <router-view />
    </template>
    <template v-if="route.path.startsWith('/user/register')">
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
