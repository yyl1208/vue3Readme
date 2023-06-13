<template>
  <div class="p-20px">
    <div>
      <div class="m-b-30px">
        <a-button class="mr-10px" @click="id = 1">按钮1 2S返回结果</a-button>
        <a-button @click="id = 2">按钮2 1S返回结果</a-button>
      </div>

      <div class="w-400px p-20px overflow-auto">
        <div class="m-b-30px fw-500">日志</div>
        <div v-for="(item, index) in consoleList" :key="index">{{ item }}</div>
      </div>
    </div>



    
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { getFruitsById } from './promise';

const id = ref(1);
const detail = ref({});

const consoleList = ref([]);

// 触发请求 并保证最新请求数据
watchEffect(async (onInvalidate) => {
  console.log('触发请求', consoleList.value.push('触发请求!!!!' + id.value));

  onInvalidate(() => {
    cancel && cancel();
  });

  // 模拟id=2的时候请求时间 1s，id=1的时候请求时间 2s
  const [p, cancel] = getFruitsById(id.value, id.value === 2 ? 1000 : 2000);
  const res = await p;
  detail.value = res;
  console.log('请求结果:', JSON.stringify(detail.value) && consoleList.value.push(JSON.stringify(detail.value)));
});
</script>
