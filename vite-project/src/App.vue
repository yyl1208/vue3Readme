<script setup>
import { defineAsyncComponent } from 'vue';
import TestSetup from '@/readme/TestSetup.vue';
import TestWatchEffact from '@/readme/watchEffact/template.vue';
import TestRef from '@/readme/ref/index.vue';
import TestModel from '@/readme/ref/index.vue';
import { computed } from 'vue';

// import watchEffect from '@/readme/emit/parent.vue';

const menuSelect = ref('0');

const clickMenu = (item) => {
  menuSelect.value = item;
};

const menuList = [
  {
    name: 'Setup语法糖',
    component: defineAsyncComponent(() => import('@/readme/TestSetup.vue')),
    index: '0',
  },
  {
    name: '传参',
    component: defineAsyncComponent(() => import('@/readme/emit/parent.vue')),
    index: '1',
    // component: () =>import("@views/admin/alarmCenter/index"),
  },
  {
    name: 'toRefs&toRef',
    component: defineAsyncComponent(() => import('@/readme/ref/index.vue')),
    index: '2',
  },
  {
    name: 'watchEffect',
    component: defineAsyncComponent(() => import('@/readme/watchEffact/template.vue')),
    index: '3',
  },
  {
    name: 'v-model:',
    component: defineAsyncComponent(() => import('@/readme/vmodel/index.vue')),
    index: '4',
  },
  {
    name: 'provide&inject',
    component: defineAsyncComponent(() => import('@/readme/provide&inject/index.vue')),
    index: '5',
  },
];

const getComponent = computed(() => {
  console.log('menuSelect', menuSelect);
  return menuList[menuSelect.value].component;
});
</script>

<template>
  <div class="w-100vw h-100vh flex flex-1 flex-col">
    <div class="h-40px flex flex-center bg-blue">Vue3的写法差异</div>

    <div class="flex flex-1">
      <div class="w-300px">
        <a-menu :default-selected-keys="['0']" @menu-item-click="clickMenu">
          <!-- <template #title>Navigation 1</template> -->
          <a-menu-item v-for="(item, i) in menuList" :key="item.index">{{ item.name }}</a-menu-item>
          <!-- <a-menu-item key="1">Setup语法糖</a-menu-item>
          <a-menu-item key="2">传参</a-menu-item>
          <a-menu-item key="3">toRefs&toRef</a-menu-item>-->
        </a-menu>
      </div>
      <div class="flex-1">
        <component :is="getComponent"></component>
      </div>
    </div>
    
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
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
