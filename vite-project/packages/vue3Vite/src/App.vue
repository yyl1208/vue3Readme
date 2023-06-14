<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

watch(
  () => route,
  (newVul, oldVul) => {
    console.log('newVul-route----', newVul);
  },
);
</script>

<style>
#nav {
  padding: 30px;
  text-align: center;
  font-size: 20px;
  line-height: 1;
}
</style>
