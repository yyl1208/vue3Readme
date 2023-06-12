<template>
  <div class="p10px bg-red">
    {{ text }}
    <a-button @click="triggerEmit">子触发变更</a-button>
  </div>
</template>

<script setup>
defineProps(['text']);

const emits = defineEmits(['update:text']);

const triggerEmit = () => {
  emits('update:text', '变成子文字');
};
</script>
