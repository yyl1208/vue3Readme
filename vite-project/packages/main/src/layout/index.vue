<script setup>
import { defineAsyncComponent } from 'vue';
import TestSetup from '@/readme/TestSetup.vue';
import TestWatchEffact from '@/readme/watchEffact/template.vue';
import TestRef from '@/readme/ref/index.vue';
import TestModel from '@/readme/ref/index.vue';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// import watchEffect from '@/readme/emit/parent.vue';
const router = useRouter();
const route = useRoute();

const menuSelect = ref('0');

const clickMenu = (item) => {
  console.log('item', item);

  menuSelect.value = item;
  console.log('router', router, route);
  router.push('/' + item.path);
};

const menuList = [
  {
    name: 'Setup语法糖',
    path: 'setup',
  },
  {
    name: '传参',
    path: 'props',
  },
  {
    name: 'toRefs&toRef',
    path: 'ref',
    // component: defineAsyncComponent(() => import('@/readme/ref/index.vue')),
  },
  {
    name: 'watchEffect',
    path: 'watchEffect',
    // component: defineAsyncComponent(() => import('@/readme/watchEffact/template.vue')),
  },
  {
    name: 'v-model:',
    path: 'vmodel',
    // component: defineAsyncComponent(() => import('@/readme/vmodel/index.vue')),
    // index: '4',
  },
  {
    name: 'provide&inject',
    path: 'provide',
    component: defineAsyncComponent(() => import('@/readme/provide&inject/index.vue')),
    index: '5',
  },
  {
    name: 'mixin和公共函数',
    path: 'mixin',
    // component: defineAsyncComponent(() => import('@/readme/mixin/index.vue')),
    // index: '6',
  },
];

const getComponent = computed(() => {
  console.log('menuSelect', menuSelect);
  return menuList[menuSelect.value].component;
});
</script>

<template>
  <div class="w-100vw h-100vh flex flex-1 flex-col overflow-hidden">
    <div class="h-40px flex flex-center bg-blue">Vue3的写法差异</div>

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
