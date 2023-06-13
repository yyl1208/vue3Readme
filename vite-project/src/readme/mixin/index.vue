<template>
  <div class="p20px">
    <div class="mb20px">mixin中的文字 ：{{ msg }}</div>
    <div class="mb20px">mixin中的文字 ：{{ msg }}</div>

    <a-button class="mr10px" @click="fun1">mixin方法1</a-button>
    <a-button class="mr10px" @click="fun2">mixin方法2</a-button>

    <a-button class="mr10px" @click="fun1Test">setup 调用mixin方法1</a-button>
    <div class="mt10px">Mouse position is at: {{ x }}, {{ y }}</div>

  </div>
</template>

<script setup>
import { useMouse } from './setup';

const { x, y } = useMouse();

// setup 尝试调用
const fun1Test = () => {
  fun1();
};

//
</script>

<script>
import mixin from './mixin.js';
export default {
  mixins: [mixin],
};
</script>
