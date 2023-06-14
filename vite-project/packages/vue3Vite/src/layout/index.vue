<script setup>
import { defineAsyncComponent } from 'vue';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// import watchEffect from '@/readme/emit/parent.vue';
const router = useRouter();
const route = useRoute();

const menuSelect = ref('0');

const clickMenu = (item) => {
  menuSelect.value = item;
  console.log('router', router, route);
  router.push('/' + item.path);
};

const menuList = [
  {
    name: '首页',
    path: 'home',
  },
  {
    name: '路由',
    path: 'route',
  },
  {
    name: '通信',
    path: 'childContact',
  },
];

const getComponent = computed(() => {
  return menuList[menuSelect.value].component;
});
</script>

<template>
  <div class="w-100vw h-100vh flex flex-1 flex-col overflow-hidden">
    <div class="h-40px flex flex-center bg-blue">child</div>

    <div class="flex flex-1 overflow-auto">
      <div class="w-300px">
        <a-menu :default-selected-keys="['0']" @menu-item-click="clickMenu">
          <a-menu-item v-for="(item, i) in menuList" :key="item">{{ item.name }}</a-menu-item>
          <!-- <a-menu-item key="1">Setup语法糖</a-menu-item>-->
        </a-menu>
      </div>
      <div class="flex-1">
        <router-view />
        <!-- <component :is="getComponent"></component> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
