<template>
  <div></div>

  <span>展示文字</span>

  <div>
    <a-button @click="changeShowFun">点击展示</a-button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps(['changeType']);
const emits = defineEmits(['']);

// ref 绑定
const visible = ref(false);

const obj = ref({});

const changeShowFun = () => {
  // 修改 ref 加上 .value
  visible.value = !visible.value;
};
</script>
