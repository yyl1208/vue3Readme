<template>
  <div class="p20px bg-bluegray w-full">
    {{ '孙子' }}
    <div>msg1: {{ msg1 }}</div>

    <div>msg2: {{ msg2 }}</div>

    <a-button class="m10px" @click="changeMsg2">父注入的方法</a-button>

    
  </div>
</template>

<script setup>
import { inject } from 'vue';

// 注入msg1
const msg1 = inject('msg1');

// 注入msg2
const msg2 = inject('msg2');

// 获取 msg2Fun 注入
const { changeMsg2 } = inject('msg2Fun');
</script>
