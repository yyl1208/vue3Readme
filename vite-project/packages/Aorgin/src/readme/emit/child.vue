<template>
  <div class="w-200 h-200 p20px flex flex-col bg-yellow">
    <!-- <span> {{ text }}</span> -->
    <span> {{ props.text }}</span>

    <a-button @click="changeToA">变</a-button>

    <div>
      {{ computedText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits, defineExpose } from 'vue';

const props = defineProps({ text: String });

// const props2 = defineProps({ text: { require:true,type: String, default: '' } });

// const props3 = defineProps(['text', 'obg', 'color']);

const emits = defineEmits(['changeA', 'changeB']);

// 计算属性写法
const computedText = computed(() => {
  return '计算属性：' + props.text + props?.text.length;
});

// watch 写法
watch(
  () => props.text,
  //   props.text 不生效
  (val) => {
    console.log('触发watch', val);
  },
  { deep: true, immediate: true },
);

const changeToA = () => {
  emits('changeA', '子组件的文字');
};

const changeByRef = () => {
  changeToA();
};

// 暴露ref
defineExpose({
  changeByRef,
});
</script>
